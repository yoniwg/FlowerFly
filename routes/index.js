const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req,res,next) => res.send('index.html'));

module.exports = router;
