import geolocation from "./api/geolocation.js";
import weatherAPI from "./api/weather.js";

const geolocationError = "Geolocation Error";
const NETWORK_ERROR = "Network error";

const weatherHere = {
    load() {
        geolocation.update().then(() => {
            let {longitude, latitude} = geolocation.getCurrentLocation();

            weatherAPI.getByLocation(longitude, latitude)
                .then(res => res.json())
                .then(res => {
                    this.addHtml(res.data);
                })
                .catch(e => {
                    if (e instanceof TypeError) {
                        alert(NETWORK_ERROR);
                    } else {
                        alert(e);
                    }
                });
        }).catch(() => {
            alert(geolocationError);
        });
    },

    addHtml(weatherDTO) {
        let weatherHereBody = document.getElementById("weather-here-body");
        let html = document.getElementById("weather-here-template").content.cloneNode(true);

        weatherHereBody.innerHTML = "";
        weatherHereBody.append(html);

        weatherHere.setWeatherAttributes(weatherDTO)
    },

    setWeatherAttributes(weatherDTO) {
        for (let attribute in weatherDTO) {
            weatherHere.setWeatherAttribute(attribute, weatherDTO[attribute]);
        }
    },

    setWeatherAttribute(name, value) {
        document.getElementById(`weather-here-${name}`).innerHTML = value;
    }
};

export default weatherHere;