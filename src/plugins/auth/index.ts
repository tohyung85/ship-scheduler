const packageJson = require('./package.json');
const hapiJwt = require('hapi-auth-jwt2');
// import * as Joi from 'joi';
// import User from './models/user';
// import * as UserController from './controllers/user-controller';
var people = { // our "users database"
  1: {
    id: 1,
    name: 'Jen Jones'
  }
};

const validate = function(decoded, request, callback) {
  if (!people[decoded.id]) {
    return callback(null, false);
  }
  else {
    return callback(null, true);
  }
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