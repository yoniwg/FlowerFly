const express = require('express');
const router = express.Router();
const db = require('../model/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  let currentUser;
  if (req.session && req.session.passport) {
        currentUser = req.session.passport.user;
  }
  res.render('index', { currentUser: currentUser, flowersDb: db.getEntities("Flower") });
});

module.exports = router;
