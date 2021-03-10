import weatherAPI from "./api/weather.js";
import weather from "./weather.js";

const weatherFavourite = {
    load() {
        let weatherFavouriteList = document.getElementById("weather-favourite__list");

        for (let i = 0; i < localStorage.length; i++) {
            let city = localStorage.key(i);
            let weatherItem = document.createElement("li");

            weatherItem.setAttribute('class', "weather-item");
            weatherItem.setAttribute('id', `city-${city}`);
            weatherItem.innerHTML = `<p>The city ${city} is being uploaded</p><img src="assets/img/refresh.svg" alt="refresh" class="refresh-icon">`

            weatherFavouriteList.append(weatherItem);

            this.loadCity(city).then(weatherData => {
                this.addHtml(weatherItem, weatherData);
            });
        }
    },

    loadCity(city) {
        return weatherAPI.getByCity(city).then(res => res.json()).then(data => {
            return weather.getWeatherDataFromResponseData(data);
        });
    },

    addCity(city) {
        this.loadCity(city).then(weatherData => {
            let name = weatherData.name;

            if (!localStorage.getItem(name)) {
                let weatherFavouriteList = document.getElementById("weather-favourite__list");
                localStorage.setItem(name, name);

                let weatherItem = document.createElement("li");

                weatherItem.setAttribute('class', "weather-item");
                weatherItem.setAttribute('id', `city-${name}`);

                weatherFavouriteList.append(weatherItem);

                this.addHtml(weatherItem, weatherData);
            } else {
                alert("The city already exists")
            }
        }).catch(() => alert("Network error"))
    },

    addHtml(weatherItem, weatherData) {
        const {name, temperature, pressure, wind, clouds, humidity, coords, icon} = weatherData;

        weatherItem.innerHTML = `
            <div class="weather-item__main">
                <div class="row">
                    <h2>
                        ${name}
                    </h2>
                    <span class="weather-item__temperature">
                        ${temperature}°C
                    </span>
                    <img src="http://openweathermap.org/img/wn/${icon}@4x.png" alt="cloud"  class="weather-item__icon">
                    <button class="button-rounded" id="remove-city-${name}-button">
                        X
                    </button>
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
        `;

        let removeCityButton = document.getElementById(`remove-city-${name}-button`);

        removeCityButton.addEventListener('click', () => {
            document.getElementById(`city-${name}`).remove();

            localStorage.removeItem(name);
        });
    }
};

export default weatherFavourite;