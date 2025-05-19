import * as Location from "expo-location";
import Pusher from "pusher-js/react-native";

const pusher = new Pusher("04b459376799d9c622c3", {
  cluster: "ap2",
  authEndpoint: "https://backend-production-f1ac.up.railway.app/pusher/auth",
});

class LocationSharingService {
  subscription = null;
  channel = null;
  isSharing = false;
  lastLocation = null;

  async startSharing(driverId, onLocationUpdate, onError) {
    if (!driverId) {
      console.error("Driver ID is missing. Cannot start sharing.");
      return;
    }

    if (this.isSharing) return;

    try {
      const { status: existingStatus } = await Location.getForegroundPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Location.requestForegroundPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        onError && onError("Permission to access location was denied");
        return;
      }

      // Ensure the driverId is correct before subscribing
      console.log(`Starting location sharing for driver ${driverId}`);

      this.channel = pusher.subscribe(`private-driver-${driverId}`);

      this.subscription = await Location.watchPositionAsync(
        { distanceInterval: 5, accuracy: Location.Accuracy.Highest },
        (loc) => {
          this.lastLocation = loc.coords;
          onLocationUpdate && onLocationUpdate(loc.coords);
          this.channel.trigger("client-location-update", {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
        }
      );

      this.isSharing = true;
    } catch (e) {
      onError && onError("Error requesting location permissions or starting watcher");
      console.error(e);
    }
  }

  stopSharing(driverId) {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }
    if (this.channel) {
      pusher.unsubscribe(`private-driver-${driverId}`);
      this.channel = null;
    }
    this.isSharing = false;
    this.lastLocation = null;
  }
}

export default new LocationSharingService();
