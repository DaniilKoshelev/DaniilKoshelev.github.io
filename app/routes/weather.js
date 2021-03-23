const express = require('express');
const weatherApi = require('../api/weather');
const weatherDTO = require('../dto/weather');
const router = express.Router();

//TODO: validate req params

router.get('/city', async (req, res) => {
    let data = await weatherApi.getByCity(req.query.city);

    res.send(weatherDTO.getWeatherDTOFromResponseData(data));
});

router.get('/coordinates', async(req, res) => {
    let data = await weatherApi.getByLocation(req.query.longitude, req.query.latitude);

    res.send(weatherDTO.getWeatherDTOFromResponseData(data));
});

module.exports = router;
