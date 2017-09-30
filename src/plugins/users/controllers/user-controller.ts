import User from '../models/user';

export function getAllUsers(req, reply) {
  User
    .query()
    .then(result => {
      const whiteListResult = result.map(user => {
        return user.toJSON();
      });
      const returnResult = {
        count: result.length,
        items: whiteListResult 
      }
      reply(returnResult);
    })
    .catch(err => {
      console.log('error fetching users', err);
    });
}

export function addUser(req, reply) {
  const {name, username, password, email} = req.payload;
  User.query()
    .insert({
      name,
      username,
      password,
      email
    })
    .then(result => {
      reply(result.toJSON());
    })
    .catch(err => {
      console.log('error fetching users', err);
    });
}

export function deleteUser(req, reply) {
  const {id} = req.params;
  User.query()
    .delete()
    .where('id', id)
    .then(result => {
      reply(result);
    })
    .catch(err => {
      console.log('error deleting', err);
    });
}