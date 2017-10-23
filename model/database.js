var Branch = require("./BranchCls");
var Customer = require("./CustomerCls");
var Manager = require("./ManagerCls");
var Employee = require("./EmployeeCls");
var Provider = require("./ProviderCls");
var Flower = require("./FlowerCls");

var db = {
    idCounts :{},
    entities : {}
};


db.getEntity = function(entityName,id) {
    return this.entities[entityName][id];
};

db.addEntity = function(entityName, params){
    if (! this.idCounts[entityName]) this.idCounts[entityName] = 0;
    var id = ++this.idCounts[entityName];
    params.unshift(id);
    var entityCtor = eval(entityName);
    var entity = Object.create(entityCtor.prototype);
    entity.constructor.apply(entity, params);
    if (! this.entities[entityName]) this.entities[entityName] = {};
    this.entities[entityName][id] = entity;
    return id;
};

db.removeEntity = function(entityName, id) {
    this.entities[entityName][id].isActive = false;
};

db.updateEntity = function(entityName, id, entity) {
    entity.id = id;
    this.entities[entityName][id] = entity;
};

db.addEntity('Branch', ["Main Branch", "22 Hahagana, TLV"]);
db.addEntity('Branch', ["Beney Berak", "33 Rabi Akiva, Beney Berak"]);
db.addEntity('Manager', ["m1","m1", "Haim Green","22 Hahagana, TLV"]);
db.addEntity('Employee', ["e1", "e1","Bibi Netanyahoo","33 Rabi Akiva, Beney Berak",1]);
db.addEntity('Employee', ["e2", "e2", "Buji Herzog","22 Hahagana, TLV",2]);
db.addEntity('Customer', ["c1", "c1", "Yoni Weis","33 Rabi Akiva, Beney Berak"]);
db.addEntity('Customer', ["c2", "c2", "Moishe Zuchmir" ,"33 Rabi Akiva, Beney Berak"]);
db.addEntity('Flower', ["Hazav", "White", "./images/Hazav.jpg" ,22.90]);
db.addEntity('Flower', ["Kalanit", "Red", "./images/Calanit.jpg" ,12.90]);
db.addEntity('Flower', ["Rakefet", "Purple", "./images/Rakefet.jpg" ,32.90]);
db.addEntity('Flower', ["Hamanya", "Yellow", "./images/Hamanya.jpg" ,10.50]);
db.addEntity('Flower', ["Gladyola", "White", "./images/Gladyola.jpg" ,15.00]);

console.log(db.entities);

module.exports = db;