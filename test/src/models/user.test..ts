import Chai = require('chai');
import Lab = require('lab');
import User from '../../../src/models/user';

const lab = exports.lab = Lab.script();

lab.experiment('UserModel', () => {

  lab.test('it returns table name', (done) => {
    const tableName = User.tableName;

    Chai.expect(User.tableName).to.match(/users/);

    done();
  });

  lab.test('it is able to save, find and delete a user', (done) => {
    User.query().insert({
      name: 'Test User',
      username: 'testuser95',
      password: '12345',
      email: "test@user.com",
      guid: '1234'
    })
    .then(result => {
      return User.query().where('name', 'Test User');
    })
    .then(result => {
      Chai.expect(result).to.have.lengthOf(1);

      return User.query().delete().where('name', 'Test User');
    })
    .then(result => {
    })
    .catch(err => {
      console.log('error', err);
    });

    done();
  })

});
