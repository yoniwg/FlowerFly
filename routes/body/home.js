const db = require("../../model/database");

function middleware(req, res, next){
    db.getEntities('Flower').then((flowers)=> {
        res.render('body/home',{flowers:flowers});
    });
}

module.exports = middleware;