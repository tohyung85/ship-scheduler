'use strict';
import Hapi = require('hapi');
import Chai = require('chai');
import Lab = require('lab');
import Config = require('../../../../config');

import Counterparty from '../../../../src/plugins/counterparty/models/counterparty';

import EmitterPlugin = require('../../../../src/plugins/event-emitter/index');
import AuthPlugin = require('../../../../src/plugins/auth/index');
import CounterpartyPlugin = require('../../../../src/plugins/counterparty/index');

const lab = exports.lab = Lab.script();
let request;
let server;
let token = null;

lab.before((done) => {
    const plugins = [EmitterPlugin, AuthPlugin, CounterpartyPlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }

        server.initialize(done);
    });
});

lab.experiment('Counterparty Plugin', () => {
  let token = null;
  let addedCounterpartyId = null;

  lab.before(done => {
    const request = {
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: 'tytan@gmail.com',
        password: 'password'
      }
    }

    server.inject(request, response => {
      token = response.result.token;
      done();
    })
  })

  lab.test('it should allow user to create counterparty', done => {
    const request = {
      method: 'POST',
      url: '/counterparty',
      payload: {
        name: 'Hin Leong Trading Pte Ltd',
        alias: 'Hin Leong'
      },
      headers: {
        Authorization: token
      }
    }

    server.inject(request, response => {
      Chai.expect(response.result).to.be.instanceof(Counterparty);
      addedCounterpartyId = response.result.id;


      done();
    })
  })

  lab.test('it should allow user to edit counterparty', done => {
    const request = {
      method: 'PATCH',
      url: `/counterparty/${addedCounterpartyId}`,
      payload: {
        name: 'Hin Leong Singapore',
        alias: 'Leong Hin'
      },
      headers: {
        Authorization: token
      }
    }

    server.inject(request, response => {
      Chai.expect(response.result.success).to.equal(true);

      done();
    })
  })

  lab.test('it should allow user to view counterpartys', done => {
    const request = {
      method: 'GET',
      url: `/counterparty`,
      headers: {
        Authorization: token
      }
    }

    server.inject(request, response => {
      Chai.expect(response.result).to.have.lengthOf(4);
      Chai.expect(response.result[0]).to.be.instanceof(Counterparty);

      done();
    })
  })

  lab.test('it should allow user to delete counterparty', done => {
    const request = {
      method: 'DELETE',
      url: `/counterparty/${addedCounterpartyId}`,
      headers: {
        Authorization: token
      }
    }

    server.inject(request, response => {
      Chai.expect(response.result.success).to.equal(true);

      done();
    })
  })

  lab.test('it should not allow unauthenticated user to update counterparty', done => {
    const request = {
      method: 'PATCH',
      url: `/counterparty/${addedCounterpartyId}`,
      payload: {
        company_name: 'Hin Hin'
      },
      headers: {
        Authorization: 'something'
      }
    }

    server.inject(request, response => {
      Chai.expect(response.statusCode).to.equal(401);

      done();
    })
  })
});
