'use strict';
import Hapi = require('hapi');
import Chai = require('chai');
import Lab = require('lab');
import Config = require('../../../../config');

import User from '../../../../src/plugins/users/models/user';

import UserPlugin = require('../../../../src/plugins/users/index');

const lab = exports.lab = Lab.script();
let request;
let server;


lab.beforeEach((done) => {
    const plugins = [UserPlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }

        done();
    });
});


lab.experiment('User Plugin', () => {

  let newUser: User | null = null;

  lab.test('it should be able to add a user', done => {
    const request = {
      method: 'POST',
      url: '/users',
      payload: {
        name: 'Test',
        username: 'testuser',
        password: 'password',
        email: 'testadduser@user.com'
      }
    }

    server.inject(request, response => {
      newUser = response.result;

      Chai.expect(newUser).to.not.equal(null);
      
      Chai.expect(newUser!.name).to.equal('Test');
      Chai.expect(newUser).to.not.have.key('password');

      done();
    })
  });

  lab.test('it returns a list of users', (done) => {
    const request = {
        method: 'GET',
        url: '/users'
    };

    server.inject(request, (response) => {
      const {count, items} = response.result;

      Chai.expect(count).to.equal(2);
      Chai.expect(items).to.be.an('array');

      items.forEach(user => {
        Chai.expect(user).to.not.have.key('password');
      });

      Chai.expect(response.statusCode).to.equal(200);

      done();
    });
  });

  lab.test('it should be able to delete a user', done => {
    const request = {
      method: 'DELETE',
      url: `/users/${newUser!.id}`,
    };

    server.inject(request, response => {
      Chai.expect(response.result).to.equal(1);
      done();
    });
  })

});
