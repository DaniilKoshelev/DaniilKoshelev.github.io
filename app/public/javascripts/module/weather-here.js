import geolocation from "./api/geolocation.js";
import weatherAPI from "./api/weather.js";
import weather from "./weather-dto.js";

const apiError = "API error";

const weatherHere = {
    load() {
        geolocation.update().then(() => {
            let {longitude, latitude} = geolocation.getCurrentLocation();

            weatherAPI.getByLocation(longitude, latitude)
                .then(res => res.json())
                .then(data => {
                    this.addHtml(weather.getWeatherDTOFromResponseData(data));
                })
                .catch(() => {
                    alert(apiError);
                });
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