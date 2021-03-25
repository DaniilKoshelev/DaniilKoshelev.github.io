import weatherFavourite from "./weather-favourite.js";
import weatherHere from "./weather-here.js";

function addCityEventHandler(event) {
    event.preventDefault();

    let addCityInput = document.getElementById("add-city-input");
    let city = addCityInput.value;

    addCityInput.value = "";

    if (city) {
        weatherFavourite.addCity(city);
    } else {
        alert('Empty input');
    }
}

function updateGeolocationHandler() {
    navigator.permissions.query({name:'geolocation'}).then(function(result) {
        if (result.state === 'granted'){
            weatherHere.load();
        } else {
            alert("Geolocation is disabled");
        }
    });
}

export { addCityEventHandler, updateGeolocationHandler };