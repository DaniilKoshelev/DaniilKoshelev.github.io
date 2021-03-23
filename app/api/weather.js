const request = require('request');

const key = '18a225d6e0b17b21515b24abe34af5d4';
const baseApiPath = 'https://api.openweathermap.org/data/2.5/weather';

const weatherApi = {
    getByLocation(longitude, latitude) {
        return new Promise((res, rej) => request({
                uri: baseApiPath,
                qs: {
                    lat: latitude,
                    lon: longitude,
                    units: 'metric',
                    appid: key
                },
                json: true,
            },
            function (error, response, body) {
                res(body);
            }
        ));
    },

    getByCity(city) {
        return new Promise((res, rej) =>
            request.get({
                uri: baseApiPath,
                qs: {
                    q: city,
                    units: 'metric',
                    appid: key
                },
                json: true
            },
            function (error, response, body) {
                res(body);
            }
        ));
    }
};

module.exports = weatherApi;