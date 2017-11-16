const Entity = require("./EntityCls");

/**
 *
 * @param id
 * @param name
 * @param color
 * @param imageUrl
 * @param {number} price
 * @constructor
 */
function Flower(id, name, color, imageUrl, price) {
    Entity.call(this,id);
    Object.defineProperties(this,{
        "name":{writable : true, value: name, enumerable:true},
        "color":{writable : true, value: color, enumerable:true},
        "imageUrl":{writable : true, value: imageUrl, enumerable:true},
        "price":{writable : true, value: price, enumerable:true}
    });
}

module.exports = Flower;