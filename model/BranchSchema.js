const SchemaMaker = require('./SchemaMaker');


const BranchSchema = SchemaMaker(
    {
        name: {type: String, require: true},
        address: {type: String, require: true},
    }
);


module.exports = BranchSchema;
