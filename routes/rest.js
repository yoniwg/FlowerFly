const express = require('express');
const router = express.Router();
const db = require('../model/database');

function wrapJson(json) {
    return { data: json }
}


router.delete('/:entity/:id', (req, res, next) => {
    const id = req.params.id;
    const entity = req.params.entity;

    db.deleteEntity(entity, id);

    res.status(201).json({});
});

router.get('/:entity', (req,res,next) => {
    const entity = req.params.entity;

    const items = db.getEntities(entity);

    res.status(201).json({items: items});
});

router.get('/:entity/:id', (req,res,next) => {
    const id = req.params.id;
    const entity = req.params.entity;

    const item = db.getEntity(entity,id);

    res.status(201).json({item: item});
});


module.exports = router;
