const express = require('express');
const router = express.Router();
const fs = require('fs');


const navLinks = JSON.parse(fs.readFileSync('public/json/navMenu.json')).map(item => item.link);


router.get('/', (req,res,next) => res.redirect('/about'));

navLinks.forEach(link => {

    // get the view for ./{page-name}, for example ./users
    router.get(link, (req, res, next) => res.render('index'));

    // get the main body for ./body/{page-name}, for exampele ./body/users
    const bodyPath = '/body' + link;
    const homePageLink = 'about';
    const middlewareName = 'body' + (link === '/' ? '/' + homePageLink : link);
    let middleware;
    middleware = require("./" + middlewareName);
    router.get(bodyPath, middleware);
});



module.exports = router;
