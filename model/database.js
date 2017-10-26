var Branch = require("./BranchCls");
var Customer = require("./CustomerCls");
var Manager = require("./ManagerCls");
var Employee = require("./EmployeeCls");
var Provider = require("./ProviderCls");
var Flower = require("./FlowerCls");

var Database = (function () {

    var idCounts;
    var entities;
    // all users are stored in one table
    var usersEntities = ["Manager", "Employee", "Provider", "Customer"];

    function Database() {
        idCounts = {};
        entities = {}
    }

    Database.prototype.getEntity = function(entityName,id) {
        if (usersEntities.indexOf(entityName) > -1) entityName = "User";
        var desiredEntity = entities[entityName][id];
        if (!desiredEntity || !desiredEntity.isActive){
            return undefined;
        }
        return desiredEntity;
    };

    Database.prototype.getEntities = function(entityName) {
        if (usersEntities.indexOf(entityName) > -1) entityName = "User";
        var desiredEntities = entities[entityName];
        if (desiredEntities) {
            return Object.keys(desiredEntities)
                .map(id => desiredEntities[id])
                .filter(e => e.isActive);
        }
        return [];
    };

    Database.prototype.addEntity = function(entityName, params){
        var entityCtor = eval(entityName);
        if (usersEntities.indexOf(entityName) > -1) entityName = "User";
        if (! idCounts[entityName]) idCounts[entityName] = 0;
        var id = ++idCounts[entityName];
        params.unshift(id);
        var entity = Object.create(entityCtor.prototype);
        entity.constructor.apply(entity, params);
        if (! entities[entityName]) entities[entityName] = {};
        entities[entityName][id] = entity;
        return id;
    };

    Database.prototype.removeEntity = function(entityName, id) {
        if (usersEntities.indexOf(entityName) > -1) entityName = "User";
        if (entities[entityName] && entities[entityName][id]) {
            entities[entityName][id].isActive = false;
        }
    };

    Database.prototype.updateEntity = function(entityName, entity) {
        if (usersEntities.indexOf(entityName) > -1) entityName = "User";
        var id = entity.id;
        if (entities[entityName] && entities[entityName][id]) {
            entities[entityName][id] = entity;
        }else {
            throw "No such " + entityName + " with id: " + id;
        }
    };
    return Database;
})();

var db = new Database();

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