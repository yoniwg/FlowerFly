const express = require('express');
const router = express.Router();
const db = require('../model/database');
const fs = require('fs');


const navLinks = JSON.parse(fs.readFileSync('public/json/navMenu.json')).map(item => item.link);


navLinks.forEach(link => {
    const bodyPath = '/body' + link;
    const middlewareName = link === '/' ? 'home' : link.substr(1);
    let middleware;
    try{
        middleware = require("./" + middlewareName);
    }catch (e){ //TODO remove after creating all middlewares
        middleware = ()=>{};
    }

    router.get(link, (req, res, next) => res.render('index'));
    router.get(bodyPath, middleware);
});



module.exports = router;
