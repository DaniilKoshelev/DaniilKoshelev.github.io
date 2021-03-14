const defaultLongitude = "30.421811199999997";
const defaultLatitude = "59.89662719999999";

let currentLocation = {
  longitude: defaultLongitude,
  latitude: defaultLatitude
};

const geolocation = {
    update() {
        return new Promise(res => {
            navigator.geolocation.getCurrentPosition(function(position) {
                geolocation.setCurrentLocation(position.coords.longitude, position.coords.latitude);

                res();
            });
        });
    },

    getCurrentLocation() {
        return currentLocation;
    },

    setCurrentLocation(long, lat) {
        currentLocation.longitude = long;
        currentLocation.latitude = lat;
    },
};

export default geolocation;