import weatherHere from "./module/weather-here.js";
import weatherFavourite from "./module/weather-favourite.js";
import geolocation from "./module/api/geolocation.js";

let addCityButton = document.getElementById("add-city-button");
let addCityInput = document.getElementById("add-city-input");
let updateGeolocationButton = document.getElementById("update-geolocation-button");

addCityButton.addEventListener('click', () => {
    let city = addCityInput.value;
    addCityInput.value = "";

    weatherFavourite.addCity(city);
});

updateGeolocationButton.addEventListener('click', () => {
   geolocation.update().catch(() => {
       alert('Geolocation Error');
   });
});

weatherHere.load();
weatherFavourite.load();