const ProductController = require('./controllers/products');
const UserController = require('./controllers/users');
const middleware = require('./middleware/auth');
const reactCtrl = require('./controllers/reactAppTest');

module.exports = (app) => {

  app.post('/api/Products',middleware.authorization, middleware.accessLevel('1,2'), ProductController.Add);

  app.patch('/api/Products/:id', middleware.authorization, middleware.accessLevel('1,2'), ProductController.ChangePrice);

  app.post('/api/Products/:id', middleware.authorization, middleware.accessLevel('0,1,2'), ProductController.BuyProduct);

  app.delete('/api/Products/:id', middleware.authorization, middleware.accessLevel('1,2'), ProductController.DeleteProduct);

  app.put('/api/Products/:id', middleware.authorization, middleware.accessLevel('0,1,2'), ProductController.LikeProduct);

  app.post('/api/users', middleware.accessLevel('-1,0,1,2'), UserController.create);

  app.post('/api/users/admin',middleware.authorization, middleware.accessLevel('2'),UserController.create);

  app.post('/api/users/login', UserController.Login);

  app.get('/api/Products', ProductController.getProducts);

  app.get('/api/test',reactCtrl.test_react);
};
