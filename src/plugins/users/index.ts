const packageJson = require('./package.json');
import * as Joi from 'joi';
import User from './models/user';
import * as UserController from './controllers/user-controller';

const after = function(server, next) {
  server.expose('userModel', () => {
    return User;
  });

  server.route({
    method: 'GET',
    path: '/users',
    config: {
      tags: ['api'],
      auth: 'jwt',
      handler: UserController.getAllUsers
    }
  });

  server.route({
    method: 'POST',
    path: '/auth/login',
    config: {
      tags: ['api'],
      handler: UserController.login,
      auth: false,
      validate: {
        payload: {
          email: Joi.string(),
          password: Joi.string()
        }
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/auth/signout',
    config: {
      tags: ['api'],
      handler: UserController.signout,
      auth: 'jwt'
    }
  })

  server.route({
    method: 'POST',
    path: '/auth/register',
    config: {
      auth: false,
      tags: ['api'],
      handler: UserController.addUser,
      validate: {
        payload: User.schema
      }
    }
  });

  server.route({
    method: 'DELETE',
    path: '/users/{id}',
    config: {
      tags: ['api'],
      auth: 'jwt',
      handler: UserController.deleteUser,
      validate: {
        params: {
          id: Joi.number()
        }
      }
    }
  });

  next();
}

export function register(server, options, next) {
  server.dependency('auth-section', after);
  next();
};

exports.register.attributes = {
  pkg: packageJson
};
