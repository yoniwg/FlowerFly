var User = require("./UserCls");
function Employee(id, username, password, fullName, address, branchId) {
    User.call(this,id, username, password, "Employee", fullName, address);
    Object.defineProperties(this,{
        "branchId":{writable : true, value: branchId}
    });
}

module.exports = Employee;