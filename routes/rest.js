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



const allUsersProps = Array.from(
    db.userEntityCtors
        .reduce((props, entityCtor) => new Set([...props, ...Object.keys(new entityCtor())]), new Set())
);
const customerProps = Object.keys(new db.entityCtorMap.Customer());
router.get('/User/all', (req,res,next) => {
    const id = req.params.id;

    let users = db.getEntities("User");
    let props;
    let editable = false;

    const userRole = req.user.role;
    switch (userRole){
        case "Employee":
            users = users
                .filter(u => u.role === "Customer")
                .map(u => {
                    u.password = "*****";
                    return u;
                });
            props = customerProps;
            break;
        case "Manager":
            props = allUsersProps;
            editable = true;
            break;
        default : next(new Error("a " + userRole + " is not allowed to see users' details."))
    }

    res.status(201).json({items: users, props: props, editable: editable});
});

router.get('/:entity/all', (req,res,next) => {
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
