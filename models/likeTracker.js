const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LikeTrackerSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'username cant be empty'],
  },
  productID: {
    type: Schema.Types.ObjectId, ref: 'products',
  },
});

module.exports = mongoose.model('LikeTracker', LikeTrackerSchema);
