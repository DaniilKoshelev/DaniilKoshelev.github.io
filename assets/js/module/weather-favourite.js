import weatherAPI from "./api/weather.js";
import weather from "./weather-dto.js";

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
            if (data.cod !== 200) {
                throw new Error(data.message);
            }

            return weather.getWeatherDTOFromResponseData(data);
        }).catch(error => {
            if (error instanceof TypeError) {
                throw new Error("Network error");
            }

            throw error;
        });
    },

    addCity(city) {
        let weatherFavouriteList = document.getElementById("weather-favourite__list");
        let weatherItem = document.createElement("li");

        weatherItem.setAttribute('class', "weather-item");
        weatherItem.innerHTML = `<p>The city ${city} is being uploaded</p><img src="assets/img/refresh.svg" alt="refresh" class="refresh-icon">`
        weatherFavouriteList.append(weatherItem);

        this.loadCity(city).then(weatherData => {
            let name = weatherData.name;

            if (!localStorage.getItem(name)) {
                localStorage.setItem(name, name);

                weatherItem.setAttribute('id', `city-${name}`);

                this.addHtml(weatherItem, weatherData);
            } else {
                throw new Error("The city already exists");
            }
        }).catch(error => {
            alert(error.message);

            weatherFavouriteList.removeChild(weatherItem);
        })
    },

    addHtml(weatherItem, weatherData) {
        const {city, temperature, pressure, wind, clouds, humidity, coords, icon} = weatherData;

        let html = document.getElementById("weather-favourite-template").content.cloneNode(true);

        weatherItem.innerHTML = "";
        weatherItem.append(html);
        weatherItem.setAttribute("id", `city-${name}`);

        weatherItem.getElementsByClassName("weather-item__icon")[0].innerHTML = icon;
        weatherItem.getElementsByClassName("weather-item__city")[0].innerHTML = city;
        weatherItem.getElementsByClassName("weather-item__temperature")[0].innerHTML = temperature;
        weatherItem.getElementsByClassName("weather-item__wind")[0].innerHTML = wind;
        weatherItem.getElementsByClassName("weather-item__clouds")[0].innerHTML = clouds;
        weatherItem.getElementsByClassName("weather-item__pressure")[0].innerHTML = pressure;
        weatherItem.getElementsByClassName("weather-item__humidity")[0].innerHTML = humidity;
        weatherItem.getElementsByClassName("weather-item__coords")[0].innerHTML = coords;

        let removeCityButton = weatherItem.getElementsByClassName("remove-city-button")[0];

        removeCityButton.addEventListener('click', () => {
            document.getElementById(`city-${name}`).remove();

            localStorage.removeItem(name);
        });
    },
};

export default weatherFavourite;