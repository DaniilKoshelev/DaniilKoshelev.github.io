const weatherAPI = {
    getByLocation(longitude, latitude) {
        return fetch(`/weather/coordinates?latitude=${latitude}&longitude=${longitude}`);
    },

    getByCity(city) {
        return fetch(`/weather/city?city=${city}`);
    }
};

export default weatherAPI;