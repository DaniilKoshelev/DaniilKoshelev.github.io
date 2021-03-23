const express = require('express');
const weatherApi = require('../api/weather');
const jsonResponse = require('../response/json');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(jsonResponse({data: req.session.favourites || []}));
});

router.post('/', async (req, res) => {
    let city = req.query.city;
    let data = await weatherApi.getByCity(city);

    let response = {};

    if (data.cod !== 200) {
        response.message = data.message;

        res.status(400);
    } else {
        let fav = req.session.favourites || [];

        if (fav.includes(data.name)) {
            res.status(400);

            response.message = "city already exists";
        } else {
            fav.push(data.name);
            req.session.favourites = fav;

            response.message = "city already exists";
        }
    }

    res.json(jsonResponse(response));
});

router.delete('/', async (req, res) => {
    let city = req.query.city;
    let response = {};
    let fav = req.session.favourites || [];
    let oldSize = fav.length;

    let filteredFav = fav.filter(favCity => favCity !== city);

    let newSize = filteredFav.length;

    if (newSize !== oldSize) {
        req.session.favourites = filteredFav;
    } else {
        res.status(404);

        response.message = "city not found"
    }

    res.json(jsonResponse(response));
});

module.exports = router;
