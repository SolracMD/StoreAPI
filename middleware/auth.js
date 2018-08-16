const { JWT_SECRET } = process.env;
const JWT = require('jsonwebtoken');


const authorization = function authorization(req, res, next) {
  // get header value
  const bearerHeader = req.headers.authorization;
  // /cjecl of baarer is undefine
  if (typeof bearerHeader !== 'undefined') {
    // spit at the psace
    const bearer = bearerHeader.split(' ');
    // get torkne from arry
    const bearerToken = bearer[1];
    // set the token
    const token = bearerToken;
    JWT.verify(token, JWT_SECRET, (err, authData) => {
      if (err) {
        res.status(403).send({ error: 'incorect jwt' });
      } else {
        req.user = authData;
        next();
      }
    });
  } else {
    res.status(403).send({ error: 'missing token' }); // forbiden
  }
};

const accessLevel = function accessLevel(level) {
    // check user and the role of the user
    return (req, res, next) => {
      if(level.includes('-1')) return next();
      const LevelTest = level.indexOf(req.user.User.accessLevel) > -1;
      if (req.user && (LevelTest)) { next(); } else {
        res.status(403).send({ message: 'Forbiden' });
      }
    };
  };

module.exports = {
  authorization,
  accessLevel,
};
