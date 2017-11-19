const express = require('express');
const router = express.Router();
const db = require('../model/database');

function wrapJson(json) {
    return { data: json }
}

const httpCodes = {
    badReq : 400,
    success: 201,
    unprocEntity: 422
};

///////////////////
// DELETE
///////////////////

router.delete('/:entity/:id', (req, res, next) => {
    const id = req.params.id;
    const entity = req.params.entity;

    db.deleteEntity(entity, id).then(err=> {
            if (!err) {
                res.status(httpCodes.success).json({});
            }else {
                // TODO handle error
            }
        }
    );

});



///////////////////
// GET ALL USERS
///////////////////
const userSchema = require('../model/UserSchema');
const usersProps = userSchema.propsTypes;
const customerProps = userSchema.customerPropsTypes;

router.get('/User/all', (req,res,next) => {
    const id = req.params.id;

    db.getEntities("User").then(users=> {
        let userRole;
        let props;
        let editable = false;
        if (req.user) {
           userRole = req.user.role;
        }
        switch (userRole) {
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
                props = usersProps;
                editable = true;
                break;
            default :
                next(new Error("a " + userRole + " is not allowed to see users' details."))
        }

        res.status(201).json({items: users, props: props, editable: editable});
    });
});



///////////////////
// GET ALL
///////////////////

router.get('/:entityType/all', (req,res,next) => {
    const entityType = req.params.entityType;

    db.getEntities(entityType).then(items => {
        res.status(httpCodes.success).json({items: items});
    });
});



///////////////////
// GET BY ID
///////////////////

router.get('/:entityType/:id', (req,res,next) => {
    const id = req.params.id;
    const entityType = req.params.entityType;

    db.getEntity(entityType, id).then(item=> {
        if (item) {
            res.status(httpCodes.success).json({item: item});
        } else {
            const message = "No entity of type '" + entity + "' with id " + id + " was found.";
            res.status(httpCodes.unprocEntity).json({error: {code: httpCodes.unprocEntity, message: message}});
        }
    });
});


///////////////////
// CREATE
///////////////////

router.post('/:entityType/:parms', (req,res,next) => {
    const entityType = req.params.entityType;
    const parms = req.params.parms;

    db.addEntity(entityType, parms).then(function (error, newId) {
        if (error) {
            res.status(httpCodes.badReq).json({error: {code: httpCodes.badReq, message: error.message}});
        }
        res.status(httpCodes.success).json({newId: newId});
    })
});


///////////////////
// UPDATE
///////////////////

router.put('/:entityType/:id', (req,res,next) => {
    const id = req.params.id;
    const entityType = req.params.entityType;
    const parms = req.body;
    parms.id = id;
    db.updateEntity(entityType, parms).then(function (error, newEntity) {
        if (error) {
            res.status(httpCodes.badReq).json({error: {code: httpCodes.badReq, message: error.message}});
        }
        res.status(httpCodes.success).json({newEntity: newEntity});
    })
});

module.exports = router;


