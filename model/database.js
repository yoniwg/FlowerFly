const mongoose = require("mongoose");


/////////////////////////
// Schemas
/////////////////////////

const SchemaMaker = require('./SchemaMaker');

const Schema = mongoose.Schema;

const schemaMap = new Map();

const createSchema = function(name, params) {
    const schema = SchemaMaker(params);
    schemaMap.set(name, schema);
    return schema;
};

/**
 * Create a validation object for `validate` property of the Schema.
 * @param propertyName The name of the property for the error message.
 * @param predicate The predicate determines the legallity of the value.
 * @return {{validator: Function, message: string}}
 */
function vaidator(propertyName, predicate) {
    return {
        validator: predicate,
        message: "{VALUE} is not a legal " + propertyName + "."
    };
}

function isInteger(x) {
    return true // TODO
}

createSchema('User', {
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, validate: vaidator("role", x => /^OPERATOR|PLAYER$/.test(x)) },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    address: {type: Object, required: true},
    roomId: {type: "ObjectId", required: false}
});

createSchema('Room', {
    name: {type: String, required: true },
    description: {type: String, required: false },
    imageUrl: {type: String, required: true },
    address: {type: Object, required: true },
    difficulty: {type: Number, required: true, validate: vaidator("difficulty", x => isInteger(x) && x >= 1 && x <= 5) },
});

createSchema('Participation', {
    playerId: {type: "ObjectId", required: true },
    roomId: {type: "ObjectId", required: true },
    datetime: {type: String, required: true },
    duration: {type: Number , required: true },// seconds
    hints: {type: Number, required: true },
    playerRank: {type: Number, required: true, validate: vaidator("playerRank", x => !x || isInteger(x) && x >= 1 && x <= 5) },
});


createSchema('Group', {
    name: { type: String, required: true },
    managerId: { type: "ObjectId", required: true },
    members: { type: ["ObjectId"], required: false }
});

createSchema('Post', {
    datetime: { type: Date, required: true },
    text: { type: String, required: true },
    groupId: { type: "ObjectId", required: true },
    userId: { type: "ObjectId", required: true },
    likers: { type: ["ObjectId"], required: false },
    dislikers: { type: ["ObjectId"], required: false },
});

createSchema('Image', {
    bytes: { type: Buffer, required: true },
});




//////////////////////////
// DB
//////////////////////////
const mongoDbUrl = "mongodb://admin:hgyw1234@runnerscluster-shard-00-00-7mx5t.mongodb.net:27017," +
    "runnerscluster-shard-00-01-7mx5t.mongodb.net:27017," +
    "runnerscluster-shard-00-02-7mx5t.mongodb.net:27017/test?ssl=true&replicaSet=RunnersCluster-shard-0&authSource=admin";
/**
 * TODO: Document the way it deals with super/sub-types (from the interface perspective).
 */

mongoose.Promise = global.Promise;

class Database {

    constructor() {
        this.mongoDb = mongoose.createConnection(mongoDbUrl);
        schemaMap.forEach((schema, name) => {
            this.mongoDb.model(name, schema);
        });
        this.entityNames = Array.from(schemaMap.keys());
        this.ObjectId = mongoose.Types.ObjectId
    }



    /**
     * Get an entity by id.
     * @param {string} entityName
     * @param {number} id
     * @returns {undefined}
     */
    getEntity(entityName, id) {
        return this.mongoDb.model(entityName).findOne({_id : id, isActive: true})
    };

    /**
     * Get all entities of a specific type.
     * @param {string} entityName the type name of the entity.
     * @returns {Array} array of all entities f the given type.
     */
    async getEntities(entityName) {
        const docs = await this.mongoDb.model(entityName).find({isActive: true}).exec();
        return docs.map(doc => JSON.parse(JSON.stringify(doc)));
    };

    getEntities0(entityName) {
        return this.mongoDb.model(entityName).find({isActive: true});
    };

    /**
     * Add an entity to this database.
     * @param {string} entityName The name of the entity type.
     * @param params
     * @returns {Promise} of the newly created entity
     */
    addEntity(entityName, params) {
        const entityCtor = this.mongoDb.model(entityName);
        params.isActive = true;
        const entity = new entityCtor(params);
        return entity.save();
    };

    /**
     * Remove an entity from this database.
     * @param {string} entityName
     * @param id The entity id.
     */
    deleteEntity(entityName, id) {
        return this.getEntity(entityName,id).then(function (entity) {
            if (entity) {
                entity.isActive = false;
                let modified = entity.save();
                if (!(modified && modified.id === id && !modified.isActive)) {
                    const err = new Error("haim greenstein");
                    err.code = httpCodes.genericFailure;
                    throw err
                }
                return modifyed;
            }
        });
    };

    /**
     *
     * @param {string} entityName
     * @param entity
     */
    updateEntity(entityName, entity) {
        return this.mongoDb.model(entityName)
            .findByIdAndUpdate(entity._id, entity, { runValidators: true })
            .then(newEntity => {
                if (!newEntity){
                    throw "No such " + entityName + " with id: " + id;
                }
                return newEntity;
            });
    }

}

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});

const db = new Database();


// db.addEntity('Branch', {name:"Main Branch", address:"22 Hahagana, TLV"}).then();
// db.addEntity('Branch', {name:"Beney Berak", address:"33 Rabi Akiva, Beney Berak"}).then();
// db.addEntity('User', {role:"Manager", username:"m1",password:"m1", fullName:"Haim Green",address:"22 Hahagana, TLV"}).then();
// db.addEntity('User', {role:"Employee", username:"e1",password: "e1",fullName:"Bibi Netanyahoo",address:"33 Rabi Akiva, Beney Berak",branchId:1}).then();
// db.addEntity('User', {role:"Employee", username:"e2",password: "e2",fullName: "Buji Herzog",address:"22 Hahagana, TLV",branchId:2}).then();
// db.addEntity('User', {role:"Customer", username:"c1",password: "c1",fullName: "Yoni Weis",address:"33 Rabi Akiva, Beney Berak"}).then();
// db.addEntity('User', {role:"Customer", username:"c2",password: "c2",fullName: "Moishe Zuchmir" ,address:"33 Rabi Akiva, Beney Berak"}).then();
// db.addEntity('Flower', {name:"Vered",   color:"Pink",   imageUrl:"./images/Vered.jpg" ,     price:22.90}).then();
// db.addEntity('Flower', {name:"Kalanit", color:"Red",    imageUrl:"./images/Calanit.jpg",    price:12.90}).then();
// db.addEntity('Flower', {name:"Rakefet", color:"Purple", imageUrl:"./images/Rakefet.jpg",    price:32.90}).then();
// db.addEntity('Flower', {name:"Hamanya", color:"Yellow", imageUrl:"./images/Hamanya.jpg",    price:10.50}).then();
// db.addEntity('Flower', {name:"Gladyola",color: "White", imageUrl:"./images/Gladyola.jpg",   price:15.00}).then();

module.exports = db;