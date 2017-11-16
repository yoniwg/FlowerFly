var Entity = require("./EntityCls");
function Branch(id, name, address) {
    Entity.call(this,id);
    Object.defineProperties(this,{
        "name":{writable : true, value: name, enumerable:true},
        "address":{writable : true, value: address, enumerable:true}
    });
}

module.exports = Branch;