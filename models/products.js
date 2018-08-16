const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
  },
  stock: {
    type: String,
  },
  price: {
    type: Number,
  },
  likes: {
    type: Number,
  },
});

ProductSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('products', ProductSchema);
