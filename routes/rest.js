const express = require('express');
const router = express.Router();
const db = require('../model/database');


/*
db.entities.forEach(entity => {
    router.get('/entity', (req, res, next) => res.render('index', parameters));
    router.get(bodyPath, (req, res, next) => res.render(renderPath, parameters));
});
*/


module.exports = router;
