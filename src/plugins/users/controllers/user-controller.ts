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