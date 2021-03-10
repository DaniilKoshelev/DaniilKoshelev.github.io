import geolocation from "./api/geolocation.js";
import weatherAPI from "./api/weather.js";
import weather from "./weather.js";

const weatherHere = {
    load() {
        geolocation.update().then(() => {
            let longitude = geolocation.getLongitude();
            let latitude = geolocation.getLatitude();

            weatherAPI.getByLocation(longitude, latitude).then(res => res.json()).then(data => {
                let weatherData = weather.getWeatherDataFromResponseData(data);

                this.addHtml(weatherData);
            }).catch(() => {
                alert('API error');
            });
        });
    },

    addHtml(weatherData) {
        let weatherHereBody = document.getElementById("weather-here__body");
        const {name, temperature, pressure, wind, clouds, humidity, coords, icon} = weatherData;

        weatherHereBody.innerHTML = `
            <div class="weather-here__main">
                <h2 class="weather-here__city">
                    ${name}
                </h2>
                <div class="row">
                    <span class="weather-here__icon">
                         <img src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="cloud">
                    </span>
                    <span class="weather-here__temperature">
                        ${temperature}°C
                    </span>
                </div>
            </div>
            <ul class="weather__info">
                <li class="weather__info-item">
                    <span>Wind</span>
                    <span>${wind} m/s</span>
                </li>
                <li class="weather__info-item">
                    <span>Clouds</span>
                    <span>${clouds}%</span> 
                </li>
                <li class="weather__info-item">
                    <span>Pressure</span>
                    <span>${pressure} hpa</span>
                </li>
                <li class="weather__info-item">
                    <span>Humidity</span>
                    <span>${humidity}%</span>
                </li>
                <li class="weather__info-item">
                    <span>Coordinates</span>
                    <span>${coords}</span>
                </li>
            </ul>
        `
    },
};

export default weatherHere;