const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const SaleLogSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'username cant be empty'],
  },
  productID: {
    type: Schema.Types.ObjectId, ref: 'products',
  },
  amount: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
SaleLogSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('SaleLog', SaleLogSchema);
