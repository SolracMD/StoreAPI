const JWT = require('jsonwebtoken');
const users = require('../models/users');

const { JWT_SECRET } = process.env;


const create = (req, res) => {
  const { username, password, accessLevel } = req.body;
  if(accessLevel >= 1 && req.user == undefined)return res.status(404).send('only admins can add employee or admins');
  users.findOne({ username }).exec()
    .then((UserFound) => {
      if (UserFound) return Promise.reject({ statusCode: 400, error: 'username already in user' });
      return users.create({ username, password, accessLevel });
    })
    .then((UserCreated) => {
      res.status(201).send(UserCreated);
    })
    .catch((err) => {
      res.send(err);
    });
};
const Login = (req, res) => {
    const { username, password } = req.body;
    users.findOne({ username })
      .exec()
      .then((user) => {
        if (!user) return Promise.reject(({ statusCode: 404, message: 'username not found' }));
        const ValidatePasswordPromise = user.checkPassword((password));
        return Promise.all([user, ValidatePasswordPromise]);
      })
      .then(([User, isValid]) => {
        if (isValid === false) return Promise.reject(({ statusCode: 404, message: 'user or password is incorrect' }));
        const token = JWT.sign({
          User,
          iat: new Date().getTime(),
          expiresIn: '300s',
        }, JWT_SECRET);
        res.status(201).json({ token });
      })
      .catch(((err) => {
        res.status(400).send({ error: err });
      }));
  };
  
  module.exports = {
    create,
    Login,
  };
