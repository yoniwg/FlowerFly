const Branch = require("./BranchCls");
const Customer = require("./CustomerCls");
const Manager = require("./ManagerCls");
const Employee = require("./EmployeeCls");
const Provider = require("./ProviderCls");
const Flower = require("./FlowerCls");

// all users are stored in one table
const usersEntities = ["Manager", "Employee", "Provider", "Customer"];

/**
 * TODO: Document the way it deals with super/sub-types (from the interface perspective).
 */
class Database {

    constructor () {
        this.idCounts = {};
        this.entities = {};
    }

    get entityNames() {
        return Object.keys(this.entities);
    }

    /**
     * Get an entity by id.
     * @param {string} entityName
     * @param {number} id
     * @returns {undefined}
     */
    getEntity(entityName, id) {
        if (usersEntities.indexOf(entityName) > -1) entityName = "User";
        const desiredEntity = this.entities[entityName][id];
        return desiredEntity && desiredEntity.isActive
            ? JSON.parse(JSON.stringify(desiredEntity))
            : undefined;
    };

    /**
     * Get all entities of a specific type.
     * @param {string} entityName the type name of the entity.
     * @returns {Array} array of all entities f the given type.
     */
    getEntities(entityName) {
        if (usersEntities.indexOf(entityName) > -1) entityName = "User";
        const desiredEntities = this.entities[entityName];
        if (desiredEntities) {
            return Object.keys(desiredEntities)
                .filter(id => desiredEntities[id].isActive)
                .map(id => JSON.parse(JSON.stringify(desiredEntities[id])));
        }
        return [];
    };

    /**
     * Add an entity to this database.
     * @param {string} entityName The name of the entity type.
     * @param params
     * @returns {number} the id
     */
    addEntity(entityName, params) {
        const entityCtor = eval(entityName);
        if (usersEntities.indexOf(entityName) > -1) entityName = "User";
        if (!this.idCounts[entityName]) this.idCounts[entityName] = 0;
        const id = ++this.idCounts[entityName];
        params.unshift(id);
        const entity = Object.create(entityCtor.prototype);
        entity.constructor.apply(entity, params);
        if (!this.entities[entityName]) this.entities[entityName] = {};
        this.entities[entityName][id] = entity;
        return id;
    };

    /**
     * Remove an entity from this database.
     * @param {string} entityName
     * @param id The entity id.
     */
    removeEntity(entityName, id) {
        if (usersEntities.indexOf(entityName) > -1) entityName = "User";
        if (this.entities[entityName] && this.entities[entityName][id]) {
            this.entities[entityName][id].isActive = false;
        }
    };

    /**
     *
     * @param {string} entityName
     * @param entity
     */
    updateEntity(entityName, entity) {
        if (usersEntities.indexOf(entityName) > -1) entityName = "User";
        const id = entity.id;
        if (this.entities[entityName] && this.entities[entityName][id]) {
            this.entities[entityName][id] = entity;
        } else {
            throw "No such " + entityName + " with id: " + id;
        }
    };

}

const db = new Database();

db.entityCtorMap = {
    Branch : Branch,
    Customer : Customer,
    Manager : Manager,
    Employee : Employee,
    Provider : Provider,
    Flower : Flower
};

db.userEntityCtors = usersEntities.map(entityName => db.entityCtorMap[entityName]);

db.addEntity('Branch', ["Main Branch", "22 Hahagana, TLV"]);
db.addEntity('Branch', ["Beney Berak", "33 Rabi Akiva, Beney Berak"]);
db.addEntity('Manager', ["m1","m1", "Haim Green","22 Hahagana, TLV"]);
db.addEntity('Employee', ["e1", "e1","Bibi Netanyahoo","33 Rabi Akiva, Beney Berak",1]);
db.addEntity('Employee', ["e2", "e2", "Buji Herzog","22 Hahagana, TLV",2]);
db.addEntity('Customer', ["c1", "c1", "Yoni Weis","33 Rabi Akiva, Beney Berak"]);
db.addEntity('Customer', ["c2", "c2", "Moishe Zuchmir" ,"33 Rabi Akiva, Beney Berak"]);
db.addEntity('Flower', ["Vered", "Pink", "./images/Vered.jpg" ,22.90]);
db.addEntity('Flower', ["Kalanit", "Red", "./images/Calanit.jpg" ,12.90]);
db.addEntity('Flower', ["Rakefet", "Purple", "./images/Rakefet.jpg" ,32.90]);
db.addEntity('Flower', ["Hamanya", "Yellow", "./images/Hamanya.jpg" ,10.50]);
db.addEntity('Flower', ["Gladyola", "White", "./images/Gladyola.jpg" ,15.00]);

module.exports = db;