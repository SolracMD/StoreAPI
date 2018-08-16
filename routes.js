const ProductController = require('./controllers/products');
const UserController = require('./controllers/users');
const middleware = require('./middleware/auth');

module.exports = (app) => {
  app.use(middleware.authorization);

  app.get('/', (req, res) => {
    res.send('hello world');
  });

  app.post('/api/Products', ProductController.Add);

  app.patch('/api/Products/:id', middleware.accessLevel('0,1,2'), ProductController.ChangePrice);

  app.post('/api/Products/:id', middleware.accessLevel('0,1,2'), ProductController.BuyProduct);

  app.delete('/api/Products/:id', middleware.accessLevel('1,2'), ProductController.DeleteProduct);

  app.put('/api/Products/:id', middleware.accessLevel('0,1,2'), ProductController.LikeProduct);

  app.post('/api/users', UserController.create);

  app.post('./api/users/login', UserController.Login);

  app.get('/api/Products', ProductController.getProducts);
};
