import * as Location from "expo-location";

class LocationSharingService {
  subscription = null;
  isSharing = false;

  async startSharing(driverId, onLocationUpdate, onError) {
    if (!driverId) {
      console.error("Driver ID is missing. Cannot start sharing.");
      return;
    }

    if (this.isSharing) return;

    try {
      console.log("Requesting location permissions...");
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

      console.log(`Starting location sharing for driver ${driverId}`);

      this.subscription = await Location.watchPositionAsync(
        { distanceInterval: 5, accuracy: Location.Accuracy.Highest },
        async (loc) => {
          this.lastLocation = loc.coords;
          console.log("New location:", loc.coords);
          onLocationUpdate && onLocationUpdate(loc.coords);

          // Send location update to backend API for Pusher broadcast
          try {
            const res = await fetch(
              "https://backend-production-f1ac.up.railway.app/api/driver/update-location",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  driverId,
                  latitude: loc.coords.latitude,
                  longitude: loc.coords.longitude,
                }),
              }
            );
            if (!res.ok) {
              console.error("Failed to update location on backend", await res.text());
            } else {
              console.log("Location update sent to backend");
            }
          } catch (e) {
            console.error("Failed to send location to backend", e);
          }
        }
      );

      this.isSharing = true;
    } catch (e) {
      onError && onError("Error requesting location permissions or starting watcher");
      console.error(e);
    }
  }

  stopSharing() {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
      console.log("Location sharing stopped.");
    }
    this.isSharing = false;
    this.lastLocation = null;
  }
}

export default new LocationSharingService();
