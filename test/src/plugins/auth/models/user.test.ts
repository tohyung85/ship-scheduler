import Chai = require('chai');
import Lab = require('lab');
import User from '../../../../../src/plugins/auth/models/user';

const lab = exports.lab = Lab.script();

lab.experiment('UserModel', () => {

  lab.test('it returns table name', (done) => {
    const tableName = User.tableName;

    Chai.expect(User.tableName).to.match(/users/);

    done();
  });

  lab.test('it is able to save a user', (done) => {
    User.query().insert({
      name: 'Test User',
      username: 'testuser95',
      password: 'password',
      email: "test@user.com"
    })
    .then(result => {
      const {name, email, password, username} = result;

      Chai.expect(name).to.equal('Test User');
      Chai.expect(username).to.equal('testuser95');
      Chai.expect(email).to.equal('test@user.com');

      result.verifyPassword('password')
      .then(valid => {
        Chai.expect(valid).to.equal(true);
        done();
      })
    })
    .catch(err => {
      done(err);
    });
  });

  lab.test('it is able to update user details', done => {
    User.query().patch({
      email: 'testNew@user.com'
    })
    .where('username', 'testuser95')
    .then(result => {
      Chai.expect(result).to.equal(1);
      done();
    })
    .catch(err => {
      done(err);
    })

  });

  lab.test('it is able to find a user', done => {
    User.query().where('name', 'Test User')
    .then(result => {
      Chai.expect(result).to.have.lengthOf(1);
      Chai.expect(result[0].name).to.equal('Test User');

      // Double check update
      Chai.expect(result[0].email).to.equal('testNew@user.com');
      
      done();
    })
    .catch(err => {
      done(err);
    });
  })

  lab.test('it is able to delete a user', done => {
    User.query().delete()
    .where('username', 'testuser95')
    .then(result => {
      Chai.expect(result).to.equal(1);
      done();
    })
    .catch(err => {
      done(err);
    });
  });

});
