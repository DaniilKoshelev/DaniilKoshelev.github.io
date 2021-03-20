const imageBasePath = "http://openweathermap.org/img/wn";

const weatherDTO = {
    getWeatherDTOFromResponseData(responseData) {
        return {
            city: responseData.name,
            temperature: `${Math.round(responseData.main.temp)} °C`,
            pressure: `${responseData.main.pressure} hpa`,
            humidity: `${responseData.main.humidity}%`,
            wind: `${responseData.wind.speed} m/s`,
            clouds: `${responseData.clouds.all}%`,
            coords: `[${responseData.coord.lon}, ${responseData.coord.lat}]`,
            icon: `<img src="${imageBasePath}/${responseData.weather[0].icon}@4x.png" alt="${responseData.weather[0].icon}">`
        }
    }
};

export default weatherDTO;