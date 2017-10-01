import User from '../models/user';

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
  User.query()
    .first()
    .where('email', email)
    .then(result => {
      if(result) {
        return result.verifyPassword(password);
      }
      reply('Login failed');
    })
    .then(valid => {
      if(valid) {
        return reply('login is valid');
      } 

      reply('Login failed');
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