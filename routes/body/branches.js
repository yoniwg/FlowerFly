const db = require('../../model/database');

const branchesProps = Object.keys(new db.entityCtorMap.Branch());

function mw(req, res, next) {
    let branches = db.getEntities("Branch");
    const userRole = req.user.role;
    switch (userRole){
        case "Employee":
        case "Manager": break;
        default : next(new Error(userRole + "s are not allowed to see branches' details"))
    }
    res.render('body/branches', { branchesProps: branchesProps, branches: branches });
}

module.exports = mw;
