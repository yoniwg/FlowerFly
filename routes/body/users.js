const db = require('../../model/database');

const userSchema = require('../../model/UserSchema');
const usersProps = userSchema.propsTypes;
const customerProps = userSchema.customerPropsTypes;

function mw(req, res, next) {
    if (!req.user) next(new Error("Internal Error: req.user is not defined."));
    const userRole = req.user.role;
    if (userRole !== "Manager" && userRole !== "Employee") {
        next(new Error("a " + userRole + " is not allowed to see users' details."));
    }
    let editable = userRole === "Manager";
    let props = (userRole === "Manager") ? usersProps : customerProps;

    res.render('body/users', {props: props, editable: editable});

}

module.exports = mw;


