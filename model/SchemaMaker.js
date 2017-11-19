const Schema = require('mongoose').Schema;

const createSchema = function(params) {
    params.isActive = {type: Boolean, require: true, select: false}

    const schema = new Schema(params);

    Object.defineProperty(schema, "propsTypes", {
        get: function () {
            const returnedProps = {};
            const schemaObj = this.obj;
            Object.keys(schemaObj).forEach(key => {
                returnedProps[key] = schemaObj[key].type.name;
            });
            return returnedProps;
        }
    });

    return schema;
};

module.exports = createSchema;