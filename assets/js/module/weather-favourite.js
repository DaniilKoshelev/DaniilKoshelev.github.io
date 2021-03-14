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
        let html = document.getElementById("weather-favourite-template").content.cloneNode(true);

        weatherItem.innerHTML = "";
        weatherItem.append(html);
        weatherItem.setAttribute("id", `city-${name}`);

        weatherFavourite.setWeatherItemAttributes(weatherItem, weatherData)

        let removeCityButton = weatherItem.getElementsByClassName("remove-city-button")[0];

        removeCityButton.addEventListener('click', () => {
            document.getElementById(`city-${name}`).remove();

            localStorage.removeItem(name);
        });
    },

    setWeatherItemAttributes(weatherItem, weatherDTO) {
        for (let attribute in weatherDTO) {
            weatherFavourite.setWeatherItemAttribute(weatherItem, attribute, weatherDTO[attribute]);
        }
    },

    setWeatherItemAttribute(weatherItem, name, value) {
        weatherItem.getElementsByClassName(`weather-item__${name}`)[0].innerHTML = value;
    }
};

export default weatherFavourite;