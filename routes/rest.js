const express = require('express');
const router = express.Router();
const db = require('../model/database');



const httpCodes = {
    badReq : 400,
    success: 201,
    unprocEntity: 422,
    genericFailure: 500
};

///////////////////
// DELETE
///////////////////

router.delete('/:entity/:id', (req, res, next) => {
    const id = req.params.id;
    const entity = req.params.entity;

    db.deleteEntity(entity, id).then(res=> {
            if (res && res.id == id && !res.isActive) {
                res.status(httpCodes.success).json({});
            }else {
                res.status(httpCodes.genericFailure).json({});
            }
        }
    );

});



///////////////////
// GET ALL USERS
///////////////////
const userSchema = require('../model/UserSchema');
const usersProps = Object.keys(userSchema.propsTypes);
const customerProps = Object.keys(userSchema.customerPropsTypes);

const propsDetails = {
    "username":   {type: "String", require: true, editable:false},
    "password":   {type: "String", require: true, editable:true},
    "role":       {type: "String", require: true, editable:true, enum: ["Customer", "Manager", "Employee"]},
    "fullName":   {type: "String", require: true, editable:true},
    "address":    {type: "String", require: true, editable:true},
    "flowersIds": {type: "Array",  require: false, editable:false},
    "branchId":   {type: "Number", require: false, editable:false}
};


router.get('/User/all', (req,res,next) => {
    if (!req.user) {
        const err = new Error("user is not logged in");
        err.status = 401;
        next(err);
    }

    const userRole = req.user.role;
    if (userRole !== "Manager" && userRole !== "Employee") {
        next(new Error("a " + userRole + " is not allowed to see users' details."));
    }
    const editable = true; // TODO
    const props = userRole === "Manager" ? usersProps : customerProps;
    db.getEntities("User")
        .select(props.join(" "))
        .exec((err,users)=> {
            if (err) next(err);
            if (userRole === "Employee") {
                users = users
                    .filter(u => u.role === "Customer")
                    .map(u => {
                        u.password = "*****";
                        return u;
                    });
            }

            res.status(201).json({
                items: users,
                props: props,
                propsDetails: propsDetails,
                editable:editable
            });
        });
});



///////////////////
// GET ALL
///////////////////

router.get('/:entityType/all', (req,res,next) => {
    const entityType = req.params.entityType;

    db.getEntities(entityType).then(items => {
        res
            .status(httpCodes.success)
            .json({items: items});
    }).catch(next);
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
    }).catch(next);
});


///////////////////
// CREATE
///////////////////

router.post('/:entityType', (req,res,next) => {
    const entityType = req.params.entityType;
    const parms = req.body;

    db.addEntity(entityType, parms).then(newId => {
        res.status(httpCodes.success).json({newId: newId});
    }).catch(next)
});


///////////////////
// UPDATE
///////////////////

router.put('/:entityType/:id', (req,res,next) => {
    const id = req.params.id;
    const entityType = req.params.entityType;
    const parms = req.body;
    parms._id = id;
    db.updateEntity(entityType, parms)
        .then(newEntity => res.status(httpCodes.success).json({newItem: newEntity}))
        .catch(next)
});

////////////////////////////
// Error handling for rest
////////////////////////////

router.use((err,req,res,next) => {
    res.status(err.status || 500).send(err.message);
});


module.exports = router;


