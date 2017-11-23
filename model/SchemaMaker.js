const Schema = require('mongoose').Schema;

const createSchema = function(params) {
    params.isActive = {type: Boolean, require: true, select: false};

    const schema = new Schema(params);

    schema.propsTypes = function () {
        const returnedProps = {};
        const schemaObj = params;
        Object.keys(schemaObj).filter(p => p !== "isActive").forEach(key => {
            returnedProps[key] = schemaObj[key].type.name;
        });
        return returnedProps;
    }();

    return schema;
};

module.exports = createSchema;