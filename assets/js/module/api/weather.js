const key = "18a225d6e0b17b21515b24abe34af5d4";

const weatherAPI = {
    getByLocation(longitude, latitude) {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`, {
            cache: 'no-cache',
            referrerPolicy: 'no-referrer',
        });
    },

    getByCity(city) {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`, {
            cache: 'no-cache',
            referrerPolicy: 'no-referrer',
        })
    }
};

export default weatherAPI;