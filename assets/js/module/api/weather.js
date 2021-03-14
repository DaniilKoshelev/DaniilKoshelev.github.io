const key = "18a225d6e0b17b21515b24abe34af5d4";
const baseApiPath = "https://api.openweathermap.org/data/2.5/weather";

const weatherAPI = {
    getByLocation(longitude, latitude) {
        return fetch(`${baseApiPath}?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`);
    },

    getByCity(city) {
        return fetch(`${baseApiPath}?q=${city}&appid=${key}&units=metric`);
    }
};

export default weatherAPI;