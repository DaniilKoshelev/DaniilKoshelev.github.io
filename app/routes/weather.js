const express = require('express');
const weatherApi = require('../api/weather');
const weatherDTO = require('../dto/weather');
const jsonResponse = require('../response/json');
const router = express.Router();

router.get('/city', async (req, res) => {
    let data = await weatherApi.getByCity(req.query.city);

    let response = {};

    if (data.cod !== 200) {
        res.status(data.cod);

        response.message = data.message;
    } else {
        response.data = weatherDTO.getWeatherDTOFromResponseData(data);
    }

    res.send(jsonResponse(response));
});

router.get('/coordinates', async(req, res) => {
    let data = await weatherApi.getByLocation(req.query.longitude, req.query.latitude);

    let response = {};

    if (data.cod !== 200) {
        res.status(data.cod);

        response.message = data.message;
    } else {
        response.data = weatherDTO.getWeatherDTOFromResponseData(data);
    }

    res.send(jsonResponse(response));
});

module.exports = router;
