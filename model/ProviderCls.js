var User = require("./UserCls");
function Provider(id, username, password, fullName, address, flowersIds) {
    User.call(this,id, username, password, "Provider", fullName, address);
    Object.defineProperties(this,{
        "flowersIds":{writable : true, value: flowersIds, enumerable:true}
    });
}

module.exports = Provider;