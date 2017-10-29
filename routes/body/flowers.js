const db = require('../../model/database');

const flowersProps = Object.keys(new db.entityCtorMap.Flower());

function mw(req, res, next) {
    let flowers = db.getEntities("Flower");
    res.render('body/flowers', { flowersProps: flowersProps, flowers: flowers });
}

module.exports = mw;
