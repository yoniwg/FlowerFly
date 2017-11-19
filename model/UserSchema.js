const SchemaMaker = require('./SchemaMaker');

const UserSchema = SchemaMaker(
    {
        username :      {type: String,   require: true, unique: true },
        password :      {type: String,   require: true },
        role :          {type: String,   require: true },
        fullName :      {type: String,   require: true },
        address :       {type: String,   require: true },
        flowersIds:     {type: Array,    require: false },
        branchId:       {type: Number,    require: false }
    }
);

Object.defineProperty(UserSchema,"customerPropsTypes",{get:function () {
    const returnedProps = this.propsTypes;
    delete returnedProps.flowersIds;
    delete returnedProps.branchId;
    return returnedProps;
}});

module.exports = UserSchema;