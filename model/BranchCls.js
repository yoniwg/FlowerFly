var Entity = require("./EntityCls");
function Branch(id, name, address) {
    Entity.call(this,id);
    Object.defineProperties(this,{
        "name":{writable : true, value: name},
        "address":{writable : true, value: address}
    });
}

module.exports = Branch;