const mongoose = require("mongoose");

const BranchSchema = require("../model/BranchSchema");
const UserSchema = require("../model/UserSchema");
const FlowerSchema = require("../model/FlowerSchema");

const mongoDbUrl = "mongodb://flowerfly:hgyw1234@flowerfly-shard-00-00-ifale.mongodb.net:27017," +
    "flowerfly-shard-00-01-ifale.mongodb.net:27017," +
    "flowerfly-shard-00-02-ifale.mongodb.net:27017/test?ssl=true&replicaSet=flowerfly-shard-0&authSource=admin";
/**
 * TODO: Document the way it deals with super/sub-types (from the interface perspective).
 */
mongoose.Promise = global.Promise;
class Database {

    constructor (dbName) {
        this.mongoDb = mongoose.createConnection(mongoDbUrl);
        this.entityCtorMap = {
            Branch :    this.mongoDb.model('Branch',BranchSchema),
            User :      this.mongoDb.model('User',  UserSchema),
            Flower :    this.mongoDb.model('Flower',FlowerSchema)
        };
    }

    get entityNames() {
        return Object.keys(this.entityCtorMap); //TODO change to string
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
    getEntities(entityName) {
        return this.mongoDb.model(entityName).find({isActive: true})
    };

    /**
     * Add an entity to this database.
     * @param {string} entityName The name of the entity type.
     * @param params
     * @returns {Promise}
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
                return entity.save();
            }
        });
    };

    /**
     *
     * @param {string} entityName
     * @param entity
     */
    updateEntity(entityName, entity) {
        return this.mongoDb.model(entityName).findByIdAndUpdate(entity._id, entity).then(
            function (err, newEntity) {
                if (err){
                    throw err;
                }
                if (!newEntity){
                    throw "No such " + entityName + " with id: " + id;
                }
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