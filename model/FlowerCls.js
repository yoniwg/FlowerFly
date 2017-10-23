var Entity = require("./EntityCls");
function Flower(id, name, color, imageUrl, price) {
    Entity.call(this,id);
    Object.defineProperties(this,{
        "name":{writable : true, value: name},
        "color":{writable : true, value: color},
        "imageUrl":{writable : true, value: imageUrl},
        "price":{writable : true, value: price}
    });
}

module.exports = Flower;