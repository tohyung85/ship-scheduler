'use strict';
import Hapi = require('hapi');
import Chai = require('chai');
import Lab = require('lab');
import Config = require('../../../../config');

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

  lab.beforeEach((done) => {

    request = {
        method: 'GET',
        url: '/users'
    };

    done();
  });

  lab.test('it returns a list of users', (done) => {
    server.inject(request, (response) => {
      const {count, items} = response.result;

      console.log('all users', items);

      Chai.expect(count).to.equal(1);
      Chai.expect(items).to.be.an('array');
      Chai.expect(response.statusCode).to.equal(200);

      done();
    });
  });

});
