var express = require('express');
var router = express.Router();
var db = require('../model/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(db.getEntities("Employee"));
});

module.exports = router;
