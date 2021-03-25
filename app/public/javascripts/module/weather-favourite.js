import weatherAPI from "./api/weather.js";
import favouritesAPI from "./api/favourites.js";

const MESSAGE_SUCCESS = "success";
const NETWORK_ERROR = "Network error";

const weatherFavourite = {
    load() {
        let weatherFavouriteList = document.getElementById("weather-favourite__list");

        favouritesAPI.getAll()
            .then(res => res.json())
            .then(res => {
                let cities = res.data;

                for (let city of cities) {
                    let weatherItem = document.createElement("li");
                    weatherItem.setAttribute('class', "weather-item");
                    weatherItem.setAttribute('id', `city-${city}`);

                    weatherItem.innerHTML = `<p>The city ${city} is being uploaded</p><img src="../images/refresh.svg" alt="refresh" class="refresh-icon">`
                    weatherFavouriteList.append(weatherItem);

                    this.loadCity(city).then(weatherDTO => {
                        this.addHtml(weatherItem, weatherDTO);
                    });
                }
            })
    },

    loadCity(city) {
        return weatherAPI.getByCity(city).then(res => res.json()).then(res => {
            return res.data;
        });
    },

    addCity(city) {
        let weatherFavouriteList = document.getElementById("weather-favourite__list");
        let weatherItem = document.createElement("li");

        weatherItem.setAttribute('class', "weather-item");
        weatherItem.innerHTML = `<p>The city ${city} is being uploaded</p><img src="../images/refresh.svg" alt="refresh" class="refresh-icon">`
        weatherFavouriteList.append(weatherItem);

        favouritesAPI.addCity(city)
            .then(res => res.json())
            .then(res => {
                if (res.message !== MESSAGE_SUCCESS) {
                    throw new Error(res.message);
                }
                this.loadCity(city)
                    .then(cityDTO => {
                        let name = cityDTO.city;

                        weatherItem.setAttribute('id', `city-${name}`);
                        this.addHtml(weatherItem, cityDTO);
                    })
            })
            .catch(e => {
                if (e instanceof TypeError) {
                    alert(NETWORK_ERROR);
                } else {
                    alert(e);
                }

                weatherFavouriteList.removeChild(weatherItem);
            });
    },

    addHtml(weatherItem, weatherDTO) {
        let html = document.getElementById("weather-favourite-template").content.cloneNode(true);

        weatherItem.innerHTML = "";
        weatherItem.append(html);
        weatherItem.setAttribute("id", `city-${weatherDTO.city}`);

        weatherFavourite.setWeatherItemAttributes(weatherItem, weatherDTO)

        let removeCityButton = weatherItem.getElementsByClassName("remove-city-button")[0];

        removeCityButton.addEventListener('click', () => {


            favouritesAPI.removeCity(weatherDTO.city)
                .then(
                    () => document.getElementById(`city-${weatherDTO.city}`).remove()
                )
                .catch(e => {
                    if (e instanceof TypeError) {
                        alert(NETWORK_ERROR);
                    } else {
                        alert(e);
                    }
                });
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