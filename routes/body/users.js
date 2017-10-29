const db = require('../../model/database');

const allUsersProps = db.userEntityCtors
    .reduce((props, entityCtor) => new Set([...props, ...Object.keys(new entityCtor())]), new Set());

const customerProps = Object.keys(new db.entityCtorMap.Customer());
function mw(req, res, next) {
    let users = db.getEntities("User");
    let props;
    let editable = false;

    const userRole = req.user.role;
    switch (userRole){
        case "Employee":
            users = users
                .filter(u => u.role === "Customer")
                .map(u => {
                    u.password = "*****";
                    return u;
                });
            props = customerProps;
            break;
        case "Manager":
            props = allUsersProps;
            editable = true;
            break;
        default : return next(new Error("a " + userRole + " is not allowed to see users' details."))
    }

    res.render('body/users', { props: props, users: users, editable: editable });
}

module.exports = mw;
