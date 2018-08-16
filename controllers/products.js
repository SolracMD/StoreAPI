const products = require('../models/products');
const ChangePriceLog = require('../models/changePriceLog');
const SaleLog = require('../models/saleLog');
const LikeTracker = require('../models/likeTracker');

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
  const BuyProduct = (req, res) => {
    const { id } = req.params;
    const { User } = req.user;
    const { amount } = req.body;
  
    // check for validProductID, check amount and stock, create log
    products.findOne({ _id: id }).exec()
      .then((ProductFound) => {
        if (!ProductFound) return Promise.reject({ status: 404, message: 'wrong product id' });
        if ((typeof amount === 'number' && (amount % 1) === 0) || amount <= 0) return Promise.reject({ status: 404, message: 'amount needs to be positve whole number greater than 0' });
        const { stock } = ProductFound;
        if ((amount > stock) || stock === 0) return Promise.reject({ status: 404, message: 'not enough stock' });
        ProductFound.stock = stock - amount;
        ProductFound.save();
        return SaleLog.create({ userID: User._id, productID: id, amount });
      })
      .then((LogCreated) => {
        res.send(LogCreated);
      })
      .catch((err) => {
        res.send(err);
      });
  };
  const DeleteProduct = (req, res) => {
    const { id } = req.params;
  
    products.deleteOne({ _id: id }).exec()
      .then((deletedProduct) => {
        res.status(202).send(deletedProduct);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  };
  const LikeProduct = (req, res) => {
    const { id } = req.params;
    const { User } = req.user;
  
    LikeTracker.findOne({ userID: User._id, productID: id }).exec()
      .then((FindLikedProduct) => {
        if (FindLikedProduct) return Promise.reject({ statusCode: 400, message: 'already Liked product' });
        return products.findOneAndUpdate({ _id: id }, { $inc: { likes: parseInt(1, 10) } }, { new: true }).exec();
      })
      .then((UpdateLike) => {
        if (UpdateLike == null) return Promise.reject({ statusCode: 404, message: 'wrong productID' });
        res.send(UpdateLike);
        return LikeTracker.create({ userID: User._id, productID: id });
      })
      .catch((err) => {
        res.send(err);
      });
  };
  const getProducts = (req, res) => {
    const page = req.query.page;
    const SortCriteria = req.query.sort;
    const search = req.query.search;
  
    if (search !== undefined) {
      products.find({ name: search }).exec()
        .then((SearchedProduct) => {
          res.status(200).send(SearchedProduct);
        })
        .catch((err) => {
          res.status(400).code(err);
        });
    } else {
      switch (SortCriteria) {
        case 'name': AscendingSortName(page, res);
  
          break;
  
        case 'name--': DescendingSortName(page, res);
  
          break;
        case 'likes': AscendingSortLikes(page, res);
  
          break;
        case 'likes--': DescendingSortLikes(page, res);
  
          break;
  
        default: AscendingSortName(page, res);
  
          break;
      }
    }
  };


  module.exports = {
      Add,
      ChangePrice,
      BuyProduct,
      DeleteProduct,
      LikeProduct,
      getProducts,

  }

  function AscendingSortName(page, res) {
    if (page === undefined) page = 1;
    {
      const options = {
        sort: { name: 1 },
        limit,
        page,
      };
      products.paginate({}, options)
        .then((AvailableProducts) => {
          res.send(AvailableProducts);
        })
        .catch((err) => {
          res.send(err);
        });
    }
  }
  function DescendingSortName(page, res) {
    if (page === undefined) page = 1;
    {
      const options = {
        sort: { name: -1 },
        limit,
        page,
      };
      products.paginate({}, options)
        .then((AvailableProducts) => {
          res.send(AvailableProducts);
        })
        .catch((err) => {
          res.send(err);
        });
    }
  }
  function AscendingSortLikes(page, res) {
    if (page === undefined) page = 1;
    {
      const options = {
        sort: { likes: 'asc' },
        limit,
        page: 1,
      };
      products.paginate({}, options)
        .then((AvailableProducts) => {
          res.send(AvailableProducts);
        })
        .catch((err) => {
          res.send(err);
        });
    }
  }
  function DescendingSortLikes(page, res) {
    if (page === undefined) page = 1;
    {
      const options = {
        sort: { likes: -1 },
        limit,
        page,
      };
      products.paginate({}, options)
        .then((AvailableProducts) => {
          res.send(AvailableProducts);
        })
        .catch((err) => {
          res.send(err);
        });
    }
  }
  