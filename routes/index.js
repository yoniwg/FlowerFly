const express = require('express');
const router = express.Router();
const db = require('../model/database');
const fs = require('fs');

const parameters = { flowersDb: db.getEntities("Flower") };

const navLinks = JSON.parse(fs.readFileSync('public/json/navMenu.json')).map(item => item.link);



navLinks.forEach(link => {
    const bodyPath = '/body' + link;
    const renderPath = 'body' + (link === '/' ? '/index' : link);

    router.get(link, (req, res, next) => res.render('index', parameters));
    router.get(bodyPath, (req, res, next) => res.render(renderPath, parameters));
});



module.exports = router;
