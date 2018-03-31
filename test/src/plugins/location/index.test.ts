'use strict'
import Hapi = require('hapi');
import Chai = require('chai');
import Lab = require('lab');
import Config = require('../../../../config');

import Location from '../../../../src/plugins/location/models/location';

import EmitterPlugin = require('../../../../src/plugins/event-emitter/index');
import AuthPlugin = require('../../../../src/plugins/auth/index');
import LocationPlugin = require('../../../../src/plugins/location/index');

const lab = exports.lab = Lab.script();
let request;
let server;
let token = null;

lab.before((done) => {
    const plugins = [EmitterPlugin, AuthPlugin, LocationPlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }

        server.initialize(done);
    });
});

lab.experiment('Location Plugin', () => {
  let token = null;
  let addedLocationId = null;

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

  lab.test('it should allow user to create Location', done => {
    const request = {
      method: 'POST',
      url: '/location',
      payload: {
        name: 'Holden Dock',
        alias: 'H.Dock',
        country: 'Australia'
      },
      headers: {
        Authorization: token
      }
    }

    server.inject(request, response => {
      Chai.expect(response.result).to.be.instanceof(Location);
      addedLocationId = response.result.id;

      done();
    })
  })

  lab.test('it should allow user to edit Location', done => {
    const request = {
      method: 'PATCH',
      url: `/location/${addedLocationId}`,
      payload: {
        name: 'Gellibrand',
        alias: 'Gellibrand',
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

  lab.test('it should allow user to view Locations', done => {
    const request = {
      method: 'GET',
      url: `/location`,
      headers: {
        Authorization: token
      }
    }

    server.inject(request, response => {
      Chai.expect(response.result).to.have.lengthOf(6);
      Chai.expect(response.result[0]).to.be.instanceof(Location);

      done();
    })
  })

  lab.test('it should allow user to delete Location', done => {
    const request = {
      method: 'DELETE',
      url: `/location/${addedLocationId}`,
      headers: {
        Authorization: token
      }
    }

    server.inject(request, response => {
      Chai.expect(response.result.success).to.equal(true);

      done();
    })
  })

  lab.test('it should not allow unauthenticated user to update Location', done => {
    const request = {
      method: 'PATCH',
      url: `/location/${addedLocationId}`,
      payload: {
        name: 'Vopak Sebareek'
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
