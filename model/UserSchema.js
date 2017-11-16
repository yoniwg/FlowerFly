const Schema = require('mongoose').Schema;

const UserSchema = new Schema(
    {
        isActive :      {type: Boolean, require: true, select:false},
        username :      {type: String,   require: true, unique: true },
        password :      {type: String,   require: true },
        role :          {type: String,   require: true },
        fullName :      {type: String,   require: true },
        address :       {type: String,   require: true },
        flowersIds:     {type: Array,    require: false },
        branchId:       {type: Number,    require: false }
    }
);

module.exports = UserSchema;