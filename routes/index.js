const express = require('express');
const router = express.Router();
const db = require('../model/database');

/* GET home page. */
router.get('/', function(req, res, next) {
    const currentUser = req.session && req.session.passport ? req.session.passport.user : undefined;
    res.render('index', { currentUser: currentUser, flowersDb: db.getEntities("Flower") });
});

module.exports = router;
