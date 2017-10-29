const db = require('../model/database');

const usersProps = db.entitiesTypes.usersEntities
    .map(en=>db.entitiesTypes[en])
    .reduce((props, enCtor) => new Set([...props, ...Object.keys(new enCtor())]), new Set());


function mw(req, res, next) {
    let users = db.getEntities("User");
    const userRole = req.user.role;
    switch (userRole){
        case "Employee":
            users = users.map(function (u) {
                u.password = "*****";
                return u;
            }).filter(u => u.role === "Customer");
            break;
        case "Manager": break;
        default : next(new Error(userRole + "s are not allowed to see users' details"))
    }
    res.render('body/users', { usersProps: [...usersProps], users: users });
}

module.exports = mw;
