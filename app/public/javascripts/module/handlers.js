import weatherFavourite from "./weather-favourite.js";
import geolocation from "./api/geolocation.js";

const geolocationError = "Geolocation Error";

function addCityEventHandler(event) {
    event.preventDefault();

    let addCityInput = document.getElementById("add-city-input");
    let city = addCityInput.value;

    addCityInput.value = "";

    weatherFavourite.addCity(city);
}

function updateGeolocationHandler() {
    geolocation.update().catch(() => {
        alert(geolocationError);
    });
}

export { addCityEventHandler, updateGeolocationHandler };