const products = require('../models/products');
const ChangePriceLog = require('../models/changePriceLog');

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
  const ChangePrice = (req, res) => {
    const { id } = req.params;
    const { price } = req.body;
    const { User } = req.user;
    //  check for valid prodcutID, update price and add the new price to the log
    products.findOneAndUpdate({ _id: id }, { price },{new:true}).exec()
      .then((ProductUpdated) => {
        res.status(200).send(ProductUpdated);
        return ChangePriceLog.create({ userID: User._id, productID: id, price });
      })
      .then((LogCreated) => {
        ///c
      })
      .catch((err) => {
        res.send(err);
      });
  };

  module.exports = {
      Add,
  }