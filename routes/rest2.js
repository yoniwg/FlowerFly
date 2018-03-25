const express = require('express');
const router = express.Router();
const db = require('../model/database');

////////////////////////
// Utils
////////////////////////

const httpCodes = {
    badReq : 400,
    notFound: 404,
    success: 201,
    unprocEntity: 422
};


function newStatusError(status, message, cause) {
    const err = new Error(message, cause);
    err.cause = err.cause || cause;
    err.status = status;
    return err
}

/**
 * TODO
 * @param asyncHandler
 * @return {function(*=, *=, *=)}
 */
function asyncHandler(asyncHandler) {
    return (req, res, next) => {
        asyncHandler(req, res, next).then(json => res.json(json)).catch(next)
    }
}

function idEquals(a,b) {
    return a === b // TODO
}


///////////////////////
// Routes
///////////////////////

// Registration

router.post('/registration', asyncHandler(async req => {

    const requirePropertyDefined = function(name, value) {
        if (!value) throw newStatusError(400, "request object is missing property '" + name +  "'.");
        return value;
    };

    const requestJson = req.body;
    // add room if needed
    const user = requirePropertyDefined("player", requestJson.user);
    const role = requirePropertyDefined("player.role", user.role);
    let roomId;
    if (role === "OPERATOR") {
        const room = requirePropertyDefined("room", requestJson.room);
        const createdRoom = db.addEntity("Room", room);
        roomId = createdRoom._id;
    }

    // add the user
    user.roomId = roomId;
    const newEntity = await db.addEntity("User", user);
    const newId = newEntity._id;
    return {userId: newId, user: newEntity}
}));


// Registration

router.post('/registration', asyncHandler(async req => {

    const requirePropertyDefined = function(name, value) {
        if (!value) throw newStatusError(400, "request object is missing property '" + name +  "'.");
        return value;
    };

    const reqObject = req.body;
    // add room if needed
    const user = requirePropertyDefined("player", reqObject.user);
    const role = requirePropertyDefined("player.role", user.role);
    let roomId;
    if (role === "OPERATOR") {
        const room = requirePropertyDefined("room", reqObject.room);
        const createdRoom = db.addEntity("Room", room);
        roomId = createdRoom._id;
    }

    // add the user
    user.roomId = roomId;
    const createdUser = await db.addEntity("User", user);
    return {userId: createdUser._id, user: createdUser}

}));

// Get Likes Count

router.get('/Post/:postId/Like/User/:userId', asyncHandler(async req => {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const post = await db.getEntity("Post", postId);
    const like = post.likers.includes(userId) ? 1 : post.dislikers.includes(userId) ? -1 : 0;
    return { like: like }
}));


// Sign In
router.post('/sign-in', asyncHandler(async req => {
    const reqObject = req.body;
    const email = req.email;
    const password = req.password;
    const users = await db.getEntities("User");
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw newStatusError(403, "No user with such email and passowrd.");
    return {userId: user._id, user: user}
}));


router.get("Room/:id/Participation", asyncHandler(async req => {
    const id = req.params.id;
    const entities = await db.getEntities("Participation");
    const items = entities.filter(p => idEquals(p.roomId, id));
    return { items: items }
}));


router.get("Room/:rid/Participation/Player/:pid", asyncHandler(async req => {
    const rid = req.params.rid;
    const pid = req.params.pid;
    const entities = await db.getEntities("Participation");
    const item = entities.find(p => idEquals(p.roomId, r_id) && idEquals(p.playerId, p));
    return { item: item }
}));


// GET ALL

const entityTypeBaseRegex = '/:entityType(' + db.entityNames.reduce((a,b) => a + '|' + b)+ ')';

router.get(entityTypeBaseRegex, asyncHandler(async req => {
    const entityType = req.params.entityType;
    const items = await db.getEntities(entityType);
    return{ items: items }
}));



// GET BY ID

router.get(entityTypeBaseRegex +'/:id', asyncHandler(async req => {
    const id = req.params.id;
    const entityType = req.params.entityType;
    const item = await db.getEntity(entityType, id);
    if (item) {
        return {item: item}
    } else {
        const message = "No entity of type '" + entityType + "' with id " + id + " was found.";
        throw newStatusError(httpCodes.notFound, message);
    }
}));


// DELETE

router.delete(entityTypeBaseRegex + '/:id', asyncHandler(async req => {
    const id = req.params.id;
    const entity = req.params.entityType;
    await db.deleteEntity(entity, id);
    return {}
}));


// CREATE

router.post(entityTypeBaseRegex, asyncHandler(async req => {
    const entityType = req.params.entityType;
    const params = req.body;

    const newEntity = await db.addEntity(entityType, params);
    const newId = newEntity._id;
    return {newId: newId, newEntity: newEntity}
}));


// UPDATE

router.put(entityTypeBaseRegex + '/:id', asyncHandler(async req => {
    const id = req.params.id;
    const entityType = req.params.entityType;

    const parms = req.body;
    parms._id = id;

    const newEntity = await db.updateEntity(entityType, parms);
    return {newItem: newEntity}
}));





////////////////////////////
// NotFound and Error handling for rest
////////////////////////////

const errorStatuses = {
    "ValidationError": httpCodes.unprocEntity,
    "MissingSchemaError": httpCodes.notFound
};

const getStatusCodeForError = err => errorStatuses[err.name];


router.use((req,res,next) => {
    next(newStatusError(404, 'Not Found'));
});

router.use((err,req,res,next) => {
    const statusCode = err.status || getStatusCodeForError(err) || 500;
    const message = err.message;
    res.status(statusCode).send({error: {code: statusCode, status: statusCode, message: message}});
    console.log("Sending error on the REST api. status code: " + statusCode + " message: '" + message.replace("\n", " ") + "'");
});


module.exports = router;


