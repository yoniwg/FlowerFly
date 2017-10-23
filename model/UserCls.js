var Entity = require("./EntityCls");
function User(id, username, password, role, fullName, address) {
    Entity.call(this,id);
    Object.defineProperties(this,{
        "username":{writable : true, value: username},
        "password":{writable : true, value: password},
        "role":{writable : true, value: role},
        "fullName":{writable : true, value: fullName},
        "address":{writable : true, value:address}
    });
}

module.exports = User;