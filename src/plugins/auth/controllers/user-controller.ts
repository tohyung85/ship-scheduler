import User from '../models/user';
import * as jwt from 'jsonwebtoken';
import * as Boom from 'boom';

export function getAllUsers(req, reply) {
  User.whiteList(User.query())
    .then(result => {
      const returnResult = {
        count: result.length,
        items: result
      }
      reply(returnResult);
    })
    .catch(err => {
      reply(Boom.serverUnavailable('Unable to fetch users'));
    });
}

export function login(req, reply) {
  const {email, password} = req.payload;
  let id = null;
  User.query()
    .first()
    .where('email', email)
    .then(result => {
      if(result) {
        id = result.id;
        return result.verifyPassword(password);
      }
      reply(Boom.unauthorized('Email or password is incorrect'));
    })
    .then(valid => {
      if(valid) {
        const token = jwt.sign({
          id,
          email,
        }, process.env.JWT_KEY, {
            algorithm: 'HS256',
            // expiresIn: '1h'
        });

        return reply({
          success: true,
          token
        });
      } 
      reply(Boom.unauthorized('Email or password is incorrect'));
    })
    .catch(err => {
      reply(Boom.serverUnavailable('Login error'));
    });
}

export function addUser(req, reply) {
  const {name, username, password, email} = req.payload;
  User.whiteList(User.query()
    .insert({
      name,
      username,
      password,
      email
    }))
    .then(result => {
      reply(result);
    })
    .catch(err => {
      reply(Boom.serverUnavailable('Error registering user'));
    });
}

export function deleteUser(req, reply) {
  const {id} = req.params;
  User.whiteList(User.query()
    .delete()
    .where('id', id)
    .then(result => {
      reply(result);
    }))
    .catch(err => {
      reply(Boom.serverUnavailable('Error deleting user'));
    });
}

export function signout(req, reply) {
  const id = req.auth.credentials.id;
  User.query()
  .first()
  .where('id', id)
  .then(result => {
    reply({
      success: true
    })
  })
  .catch(err => {
    reply(Boom.serverUnavailable('Error during user signout'));
  });
}