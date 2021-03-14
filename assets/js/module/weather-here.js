import geolocation from "./api/geolocation.js";
import weatherAPI from "./api/weather.js";
import weather from "./weather.js";

const weatherHere = {
    load() {
        geolocation.update().then(() => {
            let geoLocation = geolocation.getCurrentLocation();

            let longitude = geoLocation.longitude,
                latitude = geoLocation.latitude;

            weatherAPI.getByLocation(longitude, latitude).then(res => res.json()).then(data => {
                let weatherData = weather.getWeatherDataFromResponseData(data);

                this.addHtml(weatherData);
            }).catch(() => {
                alert('API error');
            });
        });
    },

    addHtml(weatherData) {
        const {name, temperature, pressure, wind, clouds, humidity, coords, icon} = weatherData;

        let weatherHereBody = document.getElementById("weather-here-body");
        let html = document.getElementById("weather-here-template").content.cloneNode(true);

        weatherHereBody.innerHTML = "";
        weatherHereBody.append(html);

        document.getElementById("weather-here-icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="${icon}">`;
        document.getElementById("weather-here-city").innerHTML = `${name}`;
        document.getElementById("weather-here-temperature").innerHTML = `${temperature}°C`;
        document.getElementById("weather-here-wind").innerHTML = `${wind} m/s`;
        document.getElementById("weather-here-clouds").innerHTML = `${clouds}%`;
        document.getElementById("weather-here-pressure").innerHTML = `${pressure} hpa`;
        document.getElementById("weather-here-humidity").innerHTML = `${humidity}%`;
        document.getElementById("weather-here-coords").innerHTML = `${coords}`;
    },
};

export default weatherHere;