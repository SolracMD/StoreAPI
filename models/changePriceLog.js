const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PriceChangeSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'username cant be empty'],
  },
  productID: {
    type: Schema.Types.ObjectId, ref: 'products',
  },
  price: {
    type: String,
  },
});

module.exports = mongoose.model('PriceChangeLog', PriceChangeSchema);
