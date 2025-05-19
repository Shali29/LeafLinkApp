import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import MapView, { Marker, UrlTile } from "react-native-maps";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import LocationSharingService from "./LocationSharingService";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DriverLiveLocation({ navigation }) {
  const [driverId, setDriverId] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [sharing, setSharing] = useState(false);
  const [driverOpen, setDriverOpen] = useState(false);
  const [driverItems, setDriverItems] = useState([]);
  const [loadingDrivers, setLoadingDrivers] = useState(true);

  // Fetch driverId from AsyncStorage (or Context)
  useEffect(() => {
    const fetchDriverId = async () => {
      try {
        const driverId = await AsyncStorage.getItem("driverId");
        if (driverId) {
          setDriverId(driverId);
        }
      } catch (e) {
        console.error("Error retrieving driverId", e);
      }
    };

    fetchDriverId();
  }, []);

  useEffect(() => {
    // Fetch drivers when the component mounts (if necessary)
    const fetchDrivers = async () => {
      try {
        const res = await axios.get("https://backend-production-f1ac.up.railway.app/api/driver/AllDrivers");
        const items = res.data.map((d) => ({
          label: `${d.D_FullName} (${d.D_RegisterID}) - ${d.Route}`,
          value: d.D_RegisterID,
        }));
        setDriverItems(items);
        if (items.length > 0 && !driverId) setDriverId(items[0].value);  // set default driver if not found
      } catch (err) {
        setErrorMsg("Failed to load drivers.");
      } finally {
        setLoadingDrivers(false);
      }
    };

    fetchDrivers();
  }, [driverId]);

  // Start location sharing
  const startSharing = () => {
    if (!driverId) {
      setErrorMsg("Driver ID is missing. Cannot start sharing.");
      return;
    }

    console.log("Starting location sharing...");
    LocationSharingService.startSharing(
      driverId,
      (loc) => {
        console.log("Driver location updated:", loc);
        setLocation(loc);
        setErrorMsg(null);
      },
      (error) => {
        console.error("Driver location sharing error:", error);
        setErrorMsg(error);
        Alert.alert("Error", error);
      }
    );
    setSharing(true);
  };

  // Stop location sharing
  const stopSharing = () => {
    console.log("Stopping location sharing...");
    LocationSharingService.stopSharing(driverId);
    setSharing(false);
    setLocation(null);
  };

  // Toggle sharing state
  const toggleSharing = () => {
    if (sharing) stopSharing();
    else startSharing();
  };

  const goBack = () => {
    console.log("Navigating back, but keeping location sharing active.");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Driver Live Location</Text>
      </View>

      {/* Driver dropdown */}
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
          />
        )}
      </View>

      {/* Map container */}
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

      {/* Share button */}
      <View style={styles.shareContainer}>
        <TouchableOpacity
          style={[styles.shareButton, sharing ? styles.shareButtonActive : {}]}
          onPress={toggleSharing}
        >
          <FontAwesome
            name="location-arrow"
            size={16}
            color={sharing ? "white" : "#EA8F78"}
            style={{ marginRight: 8 }}
          />
          <Text style={[styles.shareText, sharing ? { color: "white" } : {}]}>
            {sharing ? "Stop Sharing" : "Share Live Location"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fae0d9" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#EA8F78",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  mapContainer: { flex: 1, overflow: "hidden" },
  map: { width: "100%", height: "100%" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  markerContainer: { height: 40, width: 40, justifyContent: "center", alignItems: "center" },
  marker: {
    height: 22,
    width: 22,
    backgroundColor: "red",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
  },
  shareContainer: {
    padding: 20,
    alignItems: "center",
  },
  shareButton: {
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "#EA8F78",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  shareButtonActive: {
    backgroundColor: "#EA8F78",
  },
  shareText: {
    fontWeight: "600",
    color: "#EA8F78",
    fontSize: 16,
  },
});
