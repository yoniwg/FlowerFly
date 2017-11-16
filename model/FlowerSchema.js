const Schema = require('mongoose').Schema;

const FlowerSchema = new Schema(
    {
        isActive : {type: Boolean, require: true, select:false},
        name :      {type: String,      require: true },
        color :     {type: String,      require: true },
        imageUrl :  {type: String,      require: true },
        price:      {type: Number,   require: true }
    }
);


module.exports = FlowerSchema;