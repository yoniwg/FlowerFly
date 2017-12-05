const SchemaMaker = require('./SchemaMaker');

const roleValidate = {
    validator: x => /^Manager|Employee|Provider|Customer$/.test(x),
    message: "{VALUE} is not a legal role."
};
const UserSchema = SchemaMaker(
    {
        username :      {type: String,   require: true, unique: true },
        password :      {type: String,   require: true },
        role :          {type: String,   require: true, validate: roleValidate},
        fullName :      {type: String,   require: true },
        address :       {type: String,   require: true },
        flowersIds:     {type: Array,    require: false },
        branchId:       {type: Number,    require: false }
    }
);

UserSchema.customerPropsTypes = UserSchema.propsTypes || function () { // TODO!!!
    const returnedProps = Object.apply({},this.propsTypes);
    delete returnedProps.flowersIds;
    delete returnedProps.branchId;
    return returnedProps;
}();

module.exports = UserSchema;