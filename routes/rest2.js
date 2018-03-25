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
 * TODO documentation
 * @param asyncHandler
 * @return {function(*=, *=, *=)}
 */
function asyncMiddleware(asyncHandler) {
    return (req, res, next) => {
        asyncHandler(req, res, next).then(json => res.json(json)).catch(next)
    }
}

function idEquals(a,b) {
    return a === b // TODO
}


function readAll(readStream) {
    return new Promise(function(resolve,reject) {
        const buffers = [];
        readStream.on('data', (buf)=>{
            buffers.push(buf);
        });
        readStream.on('end', ()=>{
            const data = Buffer.concat(buffers);
            resolve(data);
        });
        readStream.on('error', reject);
    });
}



///////////////////////
// Routes
///////////////////////


// image files

router.get('/images/:id', function (req, res) {
    const id = req.params.id;
    db.getEntity("Image", id).then(image =>{
        res.writeHead(200,{
            'Content-Type': "image/jpeg",
            'Content-Length': image.bytes.length
        });
        res.end(image.bytes)
    });

});

// Registration


router.post('/registration', asyncMiddleware(async req => {

    const requirePropertyDefined = function(name, value) {
        if (!value) throw newStatusError(400, "request object is missing property '" + name +  "'.");
        return value;
    };

    const requestJson = req.body;


    const user = JSON.parse(requirePropertyDefined("user", requestJson.user));
    let roomId;

    // add room if needed
    const role = requirePropertyDefined("player.role", user.role);
    if (role === "OPERATOR") {
        const room = JSON.parse(requirePropertyDefined("room", requestJson.room));

        // add image
        const buffer = await readAll(req.files.image);
        const newImage = await db.addEntity("Image", { bytes: buffer });
        const newImageId = newImage._id;
        room.imageUrl = newImageId;
        const createdRoom = await db.addEntity("Room", room);
        roomId = createdRoom._id;
    }


    // add the user
    user.roomId = roomId;
    const newEntity = await db.addEntity("User", user);
    const newId = newEntity._id;
    return {userId: newId, user: newEntity}
}));


// Get Likes Count

router.get('/Post/:postId/Like/User/:userId', asyncMiddleware(async req => {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const post = await db.getEntity("Post", postId);
    const like = post.likers.includes(userId) ? 1 : post.dislikers.includes(userId) ? -1 : 0;
    return { like: like }
}));


// Sign In
router.post('/sign-in', asyncMiddleware(async req => {
    const reqObject = req.body;
    const email = req.email;
    const password = req.password;
    const users = await db.getEntities("User");
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw newStatusError(403, "No user with such email and passowrd.");
    return {userId: user._id, user: user}
}));


router.get("Room/:id/Participation", asyncMiddleware(async req => {
    const id = req.params.id;
    const entities = await db.getEntities("Participation");
    const items = entities.filter(p => idEquals(p.roomId, id));
    return { items: items }
}));


router.get("Room/:rid/Participation/Player/:pid", asyncMiddleware(async req => {
    const rid = req.params.rid;
    const pid = req.params.pid;
    const entities = await db.getEntities("Participation");
    const item = entities.find(p => idEquals(p.roomId, r_id) && idEquals(p.playerId, p));
    return { item: item }
}));


// GET ALL

const entityTypeBaseRegex = '/:entityType(' + db.entityNames.reduce((a,b) => a + '|' + b)+ ')';

router.get(entityTypeBaseRegex, asyncMiddleware(async req => {
    const entityType = req.params.entityType;
    const items = await db.getEntities(entityType);
    return{ items: items }
}));



// GET BY ID

router.get(entityTypeBaseRegex +'/:id', asyncMiddleware(async req => {
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

router.delete(entityTypeBaseRegex + '/:id', asyncMiddleware(async req => {
    const id = req.params.id;
    const entity = req.params.entityType;
    await db.deleteEntity(entity, id);
    return {}
}));


// CREATE

router.post(entityTypeBaseRegex, asyncMiddleware(async req => {
    const entityType = req.params.entityType;
    const params = req.body;

    const newEntity = await db.addEntity(entityType, params);
    const newId = newEntity._id;
    return {newId: newId, newEntity: newEntity}
}));


// UPDATE

router.put(entityTypeBaseRegex + '/:id', asyncMiddleware(async req => {
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


