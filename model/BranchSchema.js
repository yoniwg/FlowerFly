const Schema = require('mongoose').Schema;

const BranchSchema = new Schema(
    {
        isActive: {type: Boolean, require: true, select:false},
        name: {type: String, require: true},
        address: {type: String, require: true},
    }
);


module.exports = BranchSchema;
