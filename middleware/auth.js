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



module.exports = {
  authorization,
  accessLevel,
};
