import weatherHere from "./module/weather-here.js";
import weatherFavourite from "./module/weather-favourite.js";
import geolocation from "./module/api/geolocation.js";

let addCityInput = document.getElementById("add-city-input");
let updateGeolocationButton = document.getElementById("update-geolocation-button");
let weatherFavouriteForm = document.getElementById("weather-favourite-form");

function addCityEventHandler(event) {
    event.preventDefault();

    let city = addCityInput.value;
    addCityInput.value = "";

    weatherFavourite.addCity(city);
}

updateGeolocationButton.addEventListener("click", () => {
   geolocation.update().catch(() => {
       alert("Geolocation Error");
   });
});

weatherFavouriteForm.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addCityEventHandler(event);
    }
});

weatherFavouriteForm.addEventListener("submit", addCityEventHandler);

weatherHere.load();
weatherFavourite.load();