const mongoose = require('mongoose');

const { MONGOOSE_URL } = process.env;


const connect = function connect() {
  mongoose.connect(MONGOOSE_URL, { useNewUrlParser: true });
};

module.exports = {
  connect,
};
