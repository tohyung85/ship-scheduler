const packageJson = require('./package.json');

const hapiJwt = require('hapi-auth-jwt2');
import * as Joi from 'joi';
import User from './models/user';
import * as UserController from './controllers/user-controller';

const validate = function(decoded, request, callback) {
  const id = decoded.id;
  User.query()
    .first()
    .where('id', id)
    .then(result => {
      if(result) 
        return callback(null, true);

      return callback(null, false);
    }) 
} 

const after = function(server, next) {
  server.register(hapiJwt);

  server.auth.strategy('jwt', 'jwt',
    {
      key: process.env.JWT_KEY,
      validateFunc: validate,
      verifyOptions: { algorithms: ['HS256'] }
    }
  )

  // Set route auth individually, default conflicts with swagger
  // server.auth.default('jwt');

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

  server.route({
    method: 'GET',
    path: '/auth/me',
    config: {
      tags: ['api'],
      auth: 'jwt',
      handler: UserController.getCurrUser
    }
  });

  next();
}

export function register(server, options, next) {
  server.dependency('event-emitter', after);

  next();
};

exports.register.attributes = {
  pkg: packageJson
};
