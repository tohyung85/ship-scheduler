import User from '../models/user';
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
  let user: User | null = null;
  User.query()
    .first()
    .where('email', email)
    .then(result => { // Does user exist?
      if(!result) throw Boom.unauthorized('Email or password is incorrect');

      user = result;
      return result.verifyPassword(password);
    })
    .then(valid => { // Is Password valid?
      if(!valid) throw Boom.unauthorized('Email or password is incorrect');

      req.server.events.emit('userLogin', user);

      const token = jwt.sign({
        id: user!.id,
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
    req.server.events.emit('userSignout', result);

    reply({
      success: true
    })

  })
  .catch(err => {
    reply(Boom.wrap(err));
  });
}

export function getCurrUser(req, reply) {
  const id = req.auth.credentials.id;
  User.whiteList(User.query()
  .first()
  .where('id', id))
  .then(result => {
    if(!result) throw Boom.notFound('User does not exist');
    reply(result);
  })
  .catch(err => {
    reply(Boom.wrap(err));
  })
}