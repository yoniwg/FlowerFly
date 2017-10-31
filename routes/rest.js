const express = require('express');
const router = express.Router();
const db = require('../model/database');


 router.delete('/:entity/:id', (req, res, next) => {
     const id = req.params.id;
     const entity = req.params.entity;
     const deleteResult = db.deleteEntity(entity, id);
     if (deleteResult instanceof Error) next(deleteResult);
     res.status(201).json({});
 });


module.exports = router;
