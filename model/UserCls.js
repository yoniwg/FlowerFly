var Entity = require("./EntityCls");
function User(id, username, password, role, fullName, address) {
    Entity.call(this,id);
    Object.defineProperties(this,{
        "username":{writable : true, value: username, enumerable:true},
        "password":{writable : true, value: password, enumerable:true},
        "role":{writable : true, value: role, enumerable:true},
        "fullName":{writable : true, value: fullName, enumerable:true},
        "address":{writable : true, value:address, enumerable:true}
    });
}

module.exports = User;