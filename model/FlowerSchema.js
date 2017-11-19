const SchemaMaker = require('./SchemaMaker');

const FlowerSchema = SchemaMaker(
    {
        name :      {type: String,      require: true },
        color :     {type: String,      require: true },
        imageUrl :  {type: String,      require: true },
        price:      {type: Number,   require: true }
    }
);


module.exports = FlowerSchema;