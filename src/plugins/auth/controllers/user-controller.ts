import User from '../models/user';
import Session from '../models/session';
import * as jwt from 'jsonwebtoken';
import * as Boom from 'boom';
import * as moment from 'moment';


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
    .then(result => { // Does user exist?
      if(!result) throw Boom.unauthorized('Email or password is incorrect');

      id = result.id;
      return result.verifyPassword(password);
    })
    .then(valid => { // Is Password valid?
      if(!valid) throw Boom.unauthorized('Email or password is incorrect');

      return Session.query()
        .first()
        .where('userId', id);
    })
    .then(result => { // Is there already a session?
      if(result) return Promise.resolve(result); 
      return Session.query()
        .insert({
          userId: id,
          expiry: moment().add(1, 'd').format('X')
        });
    })
    .then(result => { // Successfully created a session?
        const token = jwt.sign({
          id,
          email,
        }, process.env.JWT_KEY, {
            algorithm: 'HS256',
            // expiresIn: '1h'
        });

        reply({
          success: true,
          token
        });
    })
    .catch(err => {
      reply(Boom.wrap(err));
    });
}

export function addUser(req, reply) {
  const {name, username, password, email} = req.payload;
  User.whiteList(User.query()
    .insert({
      name,
      username,
      password,
      email,
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
    return Session.query()
      .delete()
      .where('userId', id)
  })
  .then(result => {
    if(!result) throw Boom.notFound('User is not signed in');

    reply({
      success: true
    })

  })
  .catch(err => {
    reply(Boom.wrap(err));
  });
}