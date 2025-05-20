import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import Pusher from "pusher-js/react-native";

const pusher = new Pusher("04b459376799d9c622c3", {
  cluster: "ap2",
  authEndpoint: "https://backend-production-f1ac.up.railway.app/pusher/auth",
  logToConsole: true,
});

export default function TrackLorry({ navigation }) {
  const [driverOpen, setDriverOpen] = useState(false);
  const [driverItems, setDriverItems] = useState([]);
  const [driverId, setDriverId] = useState(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loadingDrivers, setLoadingDrivers] = useState(true);

  // Fetch drivers on mount
  useEffect(() => {
    async function fetchDrivers() {
      try {
        setLoadingDrivers(true);
        console.log("Fetching drivers...");
        const res = await axios.get(
          "https://backend-production-f1ac.up.railway.app/api/driver/AllDrivers"
        );
        console.log("Drivers fetched:", res.data.length);
        const items = res.data.map((d) => ({
          label: `${d.D_FullName} (${d.D_RegisterID}) - ${d.Route}`,
          value: d.D_RegisterID,
        }));
        setDriverItems(items);
        if (items.length > 0) {
          setDriverId(items[0].value);
          console.log("Default selected driver ID:", items[0].value);
        }
      } catch (err) {
        console.error("Error fetching drivers:", err);
        setErrorMsg("Failed to load drivers.");
      } finally {
        setLoadingDrivers(false);
      }
    }
    fetchDrivers();
  }, []);

  // Fetch last location and subscribe to live updates when driverId changes
  useEffect(() => {
    if (!driverId) {
      console.log("No driver selected yet.");
      setLocation(null);
      return;
    }

    setErrorMsg(null);

    // Fetch last known location from backend on driver change
    const fetchDriverLocation = async () => {
      try {
        console.log(`Fetching last location for driver ${driverId}...`);
        const res = await axios.get(
          `https://backend-production-f1ac.up.railway.app/api/driver/DriverById/${driverId}`
        );
        const driverData = res.data;
        if (
          driverData &&
          driverData.Latitude != null &&
          driverData.Longitude != null
        ) {
          setLocation({
            latitude: Number(driverData.Latitude),
            longitude: Number(driverData.Longitude),
          });
          console.log(`Loaded last known location for driver ${driverId}`, {
            latitude: driverData.Latitude,
            longitude: driverData.Longitude,
          });
        } else {
          setLocation(null);
          console.log("No saved location for this driver.");
        }
      } catch (error) {
        console.error("Error fetching driver location:", error);
        setErrorMsg("Error fetching driver location");
        setLocation(null);
      }
    };

    fetchDriverLocation();

    // Now subscribe to live location updates
    console.log(`Subscribing to private-driver-${driverId}`);
    const channel = pusher.subscribe(`private-driver-${driverId}`);

    pusher.connection.bind("state_change", (states) => {
      console.log(`Pusher connection state changed: ${states.previous} -> ${states.current}`);
    });

    pusher.connection.bind("error", (err) => {
      console.error("Pusher connection error:", err);
      setErrorMsg("Pusher connection error: " + err.message);
    });

    channel.bind("client-location-update", (data) => {
      console.log("Received location update event:", data);
      if (
        data &&
        typeof data.latitude === "number" &&
        typeof data.longitude === "number"
      ) {
        setLocation({
          latitude: data.latitude,
          longitude: data.longitude,
        });
        setErrorMsg(null);
      } else {
        setErrorMsg("Invalid location data received");
      }
    });

    channel.bind("pusher:subscription_succeeded", () => {
      console.log(`Subscribed successfully to private-driver-${driverId}`);
      setErrorMsg(null);
    });

    channel.bind("pusher:subscription_error", (status) => {
      console.error("Subscription error:", status);
      setErrorMsg("Subscription error: " + JSON.stringify(status));
    });

    return () => {
      console.log(`Unsubscribing from private-driver-${driverId}`);
      channel.unbind_all();
      pusher.unsubscribe(`private-driver-${driverId}`);
      setLocation(null);
    };
  }, [driverId]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Supplier View Live Location</Text>
      </View>

      <View style={{ zIndex: 1000, paddingHorizontal: 15, marginVertical: 10 }}>
        <Text style={styles.sectionTitle}>Select Driver</Text>
        {loadingDrivers ? (
          <ActivityIndicator size="small" color="#66bb6a" />
        ) : (
          <DropDownPicker
            open={driverOpen}
            value={driverId}
            items={driverItems}
            setOpen={setDriverOpen}
            setValue={setDriverId}
            setItems={setDriverItems}
            placeholder="Select a driver"
            style={{ backgroundColor: "#fff" }}
            dropDownContainerStyle={{ backgroundColor: "#fafafa" }}
            zIndex={1000}
            zIndexInverse={3000}
          />
        )}
      </View>

      <View style={styles.mapContainer}>
        {errorMsg ? (
          <View style={styles.loadingContainer}>
            <Text style={{ color: "red" }}>{errorMsg}</Text>
          </View>
        ) : location ? (
          <MapView
            style={styles.map}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <UrlTile
              urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              maximumZ={19}
              flipY={false}
            />
            <Marker coordinate={location}>
              <View style={styles.markerContainer}>
                <View style={styles.marker} />
              </View>
            </Marker>
          </MapView>
        ) : (
          <View style={styles.loadingContainer}>
            <Text>Waiting for driver's live location...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F9F6" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#9EDEBA",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  mapContainer: { flex: 1, overflow: "hidden" },
  map: { width: "100%", height: "100%" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  markerContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  marker: {
    height: 22,
    width: 22,
    backgroundColor: "red",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
  },
});
