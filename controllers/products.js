const products = require('../models/products');

const Add = (req, res) => {
    const { name, stock, price } = req.body;
  
    products.findOne({ name }).exec()
      .then((ProductFound) => {
        if (ProductFound) return Promise.reject({ statusCode: 400, err: 'product already in Store' });
        return products.create({
          name, stock, price, likes: 0,
        });
      })
      .then((CreatedProduct) => {
        res.status(201).send(CreatedProduct);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  };

  module.exports = {
      Add,
  }