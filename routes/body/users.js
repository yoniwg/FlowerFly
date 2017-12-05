const db = require('../../model/database');

const userSchema = require('../../model/UserSchema');
const usersProps = userSchema.propsTypes;
const customerProps = userSchema.customerPropsTypes;

function mw(req, res, next) {
    const connectedUser = req.user;
    if (!connectedUser) return next(new Error("No user is connected."));
    const userRole = connectedUser.role;
    if (userRole !== "Manager" && userRole !== "Employee") {
        next(new Error("a " + userRole + " is not allowed to see users' details."));
    }
    let editable = userRole === "Manager";
    let props = (userRole === "Manager") ? usersProps : customerProps;

    res.render('body/users', {props: props, editable: editable});

}

module.exports = mw;


