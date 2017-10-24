var express = require('express');
var router = express.Router();
var db = require('../model/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session && req.session.passport) {
      var currentUser = req.session.passport.user;
  }
  res.render('index', { currentUser: currentUser, flowersDb: db.getEntities("Flower") });
});

module.exports = router;
