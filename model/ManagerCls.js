var User = require("./UserCls");
function Manager(id, username, password, fullName, address) {
    User.call(this,id, username, password, "Manager", fullName, address);
}

module.exports = Manager;