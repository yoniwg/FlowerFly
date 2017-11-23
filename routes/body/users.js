const db = require('../../model/database');

const userSchema = require('../../model/UserSchema');
const usersProps = userSchema.propsTypes;
const customerProps = userSchema.customerPropsTypes;

function mw(req, res, next) {
    db.getEntities("User").then((users)=> {
        let props;
        let editable = false;

        const userRole = req.user.role;
        switch (userRole) {
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
                props = usersProps;
                editable = true;
                break;
            default :
                next(new Error("a " + userRole + " is not allowed to see users' details."))
        }

        res.render('body/users', {props: props, users: users, editable: editable});
    });
}

module.exports = mw;


