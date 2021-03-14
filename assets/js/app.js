import weatherHere from "./module/weather-here.js";
import weatherFavourite from "./module/weather-favourite.js";
import {updateGeolocationHandler, addCityEventHandler} from "./module/handlers.js";

let updateGeolocationButton = document.getElementById("update-geolocation-button");
let weatherFavouriteForm = document.getElementById("weather-favourite-form");

updateGeolocationButton.addEventListener("click", updateGeolocationHandler);
weatherFavouriteForm.addEventListener("submit", addCityEventHandler);

weatherFavouriteForm.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addCityEventHandler(event);
    }
});

weatherHere.load();
weatherFavourite.load();