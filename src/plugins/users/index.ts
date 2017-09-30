const packageJson = require('./package.json');
const Joi = require('joi');
import User from './models/user';
import * as UserController from './controllers/user-controller';

export function register(server, options, next) {
  server.expose('userModel', () => {
    return User;
  });

  server.route({
    method: 'GET',
    path: '/users',
    config: {
      tags: ['api'],
      handler: UserController.getAllUsers
    }
  });

  server.route({
    method: 'POST',
    path: '/users',
    config: {
      tags: ['api'],
      handler: UserController.addUser,
      validate: {
        payload: User.schema
      }
    }
  });

  next();
};

exports.register.attributes = {
  pkg: packageJson
};
