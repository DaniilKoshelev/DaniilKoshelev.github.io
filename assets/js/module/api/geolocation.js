const defaultLongitude = "30.421811199999997";
const defaultLatitude = "59.89662719999999";

let currentLocation = {
  longitude: "",
  latitude: ""
};

const geolocation = {
    update() {
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(function(position) {
                currentLocation.longitude = position.coords.longitude;
                currentLocation.latitude = position.coords.latitude;

                res();
            },
            function () {
                currentLocation.longitude = defaultLongitude;
                currentLocation.latitude = defaultLatitude;

                res()
            });
        });
    },

    getLongitude() {
        return currentLocation.longitude;
    },

    getLatitude() {
        return currentLocation.latitude;
    }
};

export default geolocation;