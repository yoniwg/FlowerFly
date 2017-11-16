const db = require('../../model/database');
const flowersProps = Object.keys(require('../../model/FlowerSchema').obj);

function mw(req, res, next) {
    db.getEntities('Flower').then((flowers)=> {
        res.render('body/flowers', {flowersProps: flowersProps, flowers: flowers});
    });
}

module.exports = mw;
