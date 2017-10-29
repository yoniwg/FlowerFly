const db = require('../model/database');

const flowers = { flowersDb: db.getEntities("Flower") };

function middleware(req, res, next){
    res.render('body/home', flowers);
}

module.exports = middleware;