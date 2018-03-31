'use strict';
import Hapi = require('hapi');
import Chai = require('chai');
import Lab = require('lab');
import Config = require('../../../../config');

import Vessel from '../../../../src/plugins/vessel/models/vessel';

import EmitterPlugin = require('../../../../src/plugins/event-emitter/index');
import AuthPlugin = require('../../../../src/plugins/auth/index');
import VesselPlugin = require('../../../../src/plugins/vessel/index');

const lab = exports.lab = Lab.script();
let request;
let server;
let token = null;

lab.before((done) => {
    const plugins = [EmitterPlugin, AuthPlugin, VesselPlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }

        server.initialize(done);
    });
});

lab.experiment('Vessel Plugin', () => {
  let token = null;
  let addedVesselId = null;

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

  lab.test('it should allow user to create Vessel', done => {
    const request = {
      method: 'POST',
      url: '/vessel',
      payload: {
        name: 'Stena Provence',
        imo: 1234567,
        sap_id: 'VS0000012345',
        charter_type: 2,
        vessel_type: 3,
      },
      headers: {
        Authorization: token
      }
    }

    server.inject(request, response => {
      Chai.expect(response.result).to.be.instanceof(Vessel);
      addedVesselId = response.result.id;

      done();
    })
  })

  lab.test('it should allow user to edit Vessel', done => {
    const request = {
      method: 'PATCH',
      url: `/vessel/${addedVesselId}`,
      payload: {
        name: 'Stena Providence',
        imo: 1234567,
        sap_id: 'VS0000012345',
        charter_type: 2,
        vessel_type: 3,
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

  lab.test('it should allow user to view Vessels', done => {
    const request = {
      method: 'GET',
      url: `/vessel`,
      headers: {
        Authorization: token
      }
    }

    server.inject(request, response => {
      Chai.expect(response.result).to.have.lengthOf(4);
      Chai.expect(response.result[0]).to.be.instanceof(Vessel);

      done();
    })
  })

  lab.test('it should allow user to delete Vessel', done => {
    const request = {
      method: 'DELETE',
      url: `/vessel/${addedVesselId}`,
      headers: {
        Authorization: token
      }
    }

    server.inject(request, response => {
      Chai.expect(response.result.success).to.equal(true);

      done();
    })
  })

  lab.test('it should not allow unauthenticated user to update Vessel', done => {
    const request = {
      method: 'PATCH',
      url: `/vessel/${addedVesselId}`,
      payload: {
        name: 'Ocean Buggee'
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
