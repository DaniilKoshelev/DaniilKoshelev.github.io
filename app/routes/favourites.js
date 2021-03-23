const express = require('express');
const favourites = require('../database/favourites');

const router = express.Router();

router.get('/', async (req, res) => {
    let data = await favourites.list();

    res.send('sid3: ' + req.session.id + ' data: ' + data);
});

module.exports = router;
