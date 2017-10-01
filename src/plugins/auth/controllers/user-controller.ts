import User from '../models/user';
import * as jwt from 'jsonwebtoken';

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
      console.log('error fetching users', err);
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
      return reply({
        success: false
      });
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

      reply({
        success: false
      });
    })
    .catch(err => {
      console.log('error logging in', err);
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
      console.log('error fetching users', err);
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
      console.log('error deleting', err);
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
    console.log('error signing out', err);
  });
}