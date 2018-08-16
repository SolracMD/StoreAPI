const JWT = require('jsonwebtoken');
const users = require('../models/users');

const { JWT_SECRET } = process.env;


const create = (req, res) => {
  const { username, password, accessLevel } = req.body;

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
