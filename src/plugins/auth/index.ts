const packageJson = require('./package.json');
const hapiJwt = require('hapi-auth-jwt2');
import User from '../users/models/user';

const validate = function(decoded, request, callback) {
  const userEmail = decoded.email;
  User.query()
    .first()
    .where('email', userEmail)
    .then(result => {
      if(result) 
        return callback(null, true);

      return callback(null, false);
    })
}

export function register(server, options, next) {
  server.register(hapiJwt);

  server.auth.strategy('jwt', 'jwt',
    {
      key: process.env.JWT_KEY,
      validateFunc: validate,
      verifyOptions: { algorithms: ['HS256'] }
    }
  )

  // Set route auth individually
  // server.auth.default('jwt');

  next();
};

exports.register.attributes = {
  pkg: packageJson
};