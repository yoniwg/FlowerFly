const express = require('express');
const router = express.Router();
const db = require('../model/database');
const fs = require('fs');


const navLinks = JSON.parse(fs.readFileSync('public/json/navMenu.json')).map(item => item.link);


navLinks.forEach(link => {

    // get the view for ./{page-name}, for example ./users
    router.get(link, (req, res, next) => res.render('index'));

    // get the main body for ./body/{page-name}, for exampele ./body/users
    const bodyPath = '/body' + link;
    const middlewareName = 'body' + (link === '/' ? '/home' : link);
    let middleware;
    try{
        middleware = require("./" + middlewareName);
    }catch (e){ //TODO remove after creating all middlewares
        throw e;//middleware = ()=>{};
    }
    router.get(bodyPath, middleware);
});



module.exports = router;
