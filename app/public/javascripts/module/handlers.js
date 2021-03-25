import weatherFavourite from "./weather-favourite.js";
import weatherHere from "./weather-here.js";

function addCityEventHandler(event) {
    event.preventDefault();

    let addCityInput = document.getElementById("add-city-input");
    let city = addCityInput.value;

    addCityInput.value = "";

    weatherFavourite.addCity(city);
}

function updateGeolocationHandler() {
    weatherHere.load();
}

export { addCityEventHandler, updateGeolocationHandler };