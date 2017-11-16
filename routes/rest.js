const express = require('express');
const router = express.Router();
const db = require('../model/database');

function wrapJson(json) {
    return { data: json }
}


///////////////////
// DELETE
///////////////////

router.delete('/:entity/:id', (req, res, next) => {
    const id = req.params.id;
    const entity = req.params.entity;

    db.deleteEntity(entity, id).then(err=> {
            if (!err) {
                res.status(201).json({});
            }else {
                // TODO handle error
            }
        }
    );

});



///////////////////
// GET ALL USERS
///////////////////

const usersProps = Object.keys(require('../model/UserSchema').obj).filter(p=>p !== "isActive");
const customerProps = usersProps.filter(p=> p !== "branchId" && p !== "flowersIds");

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

router.get('/:entity/all', (req,res,next) => {
    const entity = req.params.entity;

    db.getEntities(entity).then(items => {
        res.status(201).json({items: items});
    });
});



///////////////////
// GET BY ID
///////////////////

router.get('/:entity/:id', (req,res,next) => {
    const id = req.params.id;
    const entity = req.params.entity;

    db.getEntity(entity, id).then(item=> {
        if (item) {
            res.status(201).json({item: item});
        } else {
            const message = "No entity of type '" + entity + "' with id " + id + " was found.";
            const code = 422;
            res.status(code).json({error: {code: code, message: message}});
        }
    });
});


///////////////////
// CREATE
///////////////////

router.post('/:entity', (req,res,next) => {
    throw Error('not implemented')
});


///////////////////
// UPDATE
///////////////////

router.put('/:entity/:id', (req,res,next) => {
    throw Error('not implemented')
});

module.exports = router;


