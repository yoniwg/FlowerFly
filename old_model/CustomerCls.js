const User = require("./UserCls");

function Customer(id, username, password, fullName, address) {
    User.call(this,id, username, password, "Customer", fullName, address);
}

module.exports = Customer;