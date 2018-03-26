const db = require('../model/database');
const castToObjectId = function(str) {
    try {
        return db.ObjectId(str);
    } catch (e) {
        const error = Error("'" + str + "' is not a legal object-id: " + e.message);
        error.cause = e;
        throw error
    }
};

const idEquals = function (a, b) {
    // noinspection EqualityComparisonWithCoercionJS
    return a == b;
};

/**
 * Remove `element` from `array` or add it if it absent depending on whether the `boolean` value is true.
 *
 * The identity of the element is determined by the `equals` function, or by === operator if it is not defined.
 *
 * @param array
 * @param element
 * @param boolean
 * @param equals
 * @return Array the changed array. might be a new instance, or the old one changed.
 */
const setIncludesIff = function (array, element, boolean, equals) {
    if (!array) array = [];
    array = array.map(x => x.toString());
    element = element.toString();
    if (boolean) {
        array.push(element)
    } else  {
        array = array.filter(x => x !== element);
    }
    array = [...new Set(array)];
    return array
};

const create = function(io) {


    const getPostRefreshObject = async function (groupId, clientId) {
        const entities = await db.getEntities("Post");
        const newPostList = entities.filter(p => idEquals(p.groupId, groupId));
        for (const post of newPostList) {
            // post.user = await db.getEntity("User", post.userId);
        }
        return {
            name: "PostsRefresh",
            posts: newPostList
        };
    };

    const broadcastPosts = async function (groupId) {
        let postsRefreshObject = await getPostRefreshObject(groupId);
        io.to(groupId).emit('chat', postsRefreshObject)
    };

    const onNewMessage = async function(groupId, userId, text) {
        await db.addEntity("Post", {
            datetime: new Date(),
            text: text,
            groupId: groupId,
            userId: userId,
            likers: [],
            dislikers: [],
        });
        await broadcastPosts(groupId);
    };

    const onNewLike = async function(postId, userId, like) {
        const post = await db.getEntity("Post", postId);

        post.likers = setIncludesIff(post.likers, userId, like === 1, idEquals);
        post.dislikers = setIncludesIff(post.dislikers, userId, like === -1, idEquals);

        await db.updateEntity("Post", post);
        await broadcastPosts(post.groupId)
    };


    io.on('connection', function(socket){

        console.log("our-socket: user connected");

        const onError = function (err) {
            const message = err.message;
            socket.emit('failure', { message: message });
            console.log("our-socket: failure - " + message)
        };

        const checkParam = function(name, value) {
            // noinspection EqualityComparisonWithCoercionJS
            if (value == undefined) throw new Error("missing parameter '" + name + "'")
            return value;

        };


        let user;
        let userId;
        let group;
        let groupId;


        const onActualConnect = async function () {
            const postsRefreshObject = await getPostRefreshObject(groupId, userId);
            socket.emit('chat', postsRefreshObject)
        };

        const onAccept = function (event, action) {
            socket.on(event, (data) => {
                console.log("our-socket: accept '" + event + "' - userId=" + userId  + " groupId=" + groupId + " data=" + JSON.stringify(data));
                const catchError = function (e) {
                    const error = new Error("error on event '" + event + "': " + e.message);
                    error.cause = e;
                    onError(error)
                };
                try {
                    const result = action(data);
                    if (result.constructor === Promise) {
                        result.catch(catchError)
                    }
                } catch (e) {
                    catchError(e);
                }
            });
        };


        onAccept('user', async (id) => {
            user = await db.getEntity("User", id);
            if (!user) throw Error("No such user");
            userId = user._id;
        });

        onAccept('group', async (id) => {
            socket.leaveAll();
            group = await db.getEntity("Group", id);
            if (!group) throw Error("No such group");
            groupId = group._id;
            socket.join(groupId);
            await onActualConnect();
        });

        onAccept('message', async (msg) => {
            if (!userId) throw new Error("The user has not been determined.");
            if (!groupId) throw new Error("The group has not been determined.");

            if (typeof msg === 'string') {
                msg = JSON.parse(msg);
            }
            switch (msg.name) {
                case "Send":
                    const text = checkParam('text', msg.text);
                    await onNewMessage(groupId, userId, text);
                    break;
                case "Like":
                    const like = checkParam('like', msg.like);
                    const postId = checkParam('postId', msg.postId);
                    await onNewLike(postId, userId, like);
                    break;
                default:
                    throw new Error("Illegal event name: name=" + msg.name);
                    break;
            }
        });


        onAccept("disconnect", () => {
            // do nothing
        });




        /*socket.on('event', (id, msg, more) => {
            socket.emit('event', "accepted id=" + id + " msg='" + msg + " more=" + more + "'. thanks!")
            // socket.broadcast.to(id).emit('my message', msg);

        })
*/





    });



};

module.exports = create;