'use strict';
import Hapi = require('hapi');
import Chai = require('chai');
import Lab = require('lab');
import Config = require('../../../../config');

import Surveyor from '../../../../src/plugins/surveyor/models/surveyor';

import EmitterPlugin = require('../../../../src/plugins/event-emitter/index');
import AuthPlugin = require('../../../../src/plugins/auth/index');
import SurveyorPlugin = require('../../../../src/plugins/surveyor/index');

const lab = exports.lab = Lab.script();
let request;
let server;
let token = null;

lab.before((done) => {
    const plugins = [EmitterPlugin, AuthPlugin, SurveyorPlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }

        server.initialize(done);
    });
});

lab.experiment('Surveyor Plugin', () => {
  let token = null;
  let addedSurveyorId = null;

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

  lab.test('it should allow user to create surveyor', done => {
    const request = {
      method: 'POST',
      url: '/surveyor',
      payload: {
        company_name: 'Saybolt Singapore',
        alias: 'Saybolt',
        approved: true
      },
      headers: {
        Authorization: token
      }
    }

    server.inject(request, response => {
      Chai.expect(response.result).to.be.instanceof(Surveyor);
      addedSurveyorId = response.result.id;


      done();
    })
  })

  lab.test('it should allow user to edit surveyor', done => {
    const request = {
      method: 'PATCH',
      url: `/surveyor/${addedSurveyorId}`,
      payload: {
        company_name: 'Saybolt Pte Ltd',
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

  lab.test('it should allow user to view surveyors', done => {
    const request = {
      method: 'GET',
      url: `/surveyor`,
      headers: {
        Authorization: token
      }
    }

    server.inject(request, response => {
      Chai.expect(response.result).to.have.lengthOf(4);
      Chai.expect(response.result[0]).to.be.instanceof(Surveyor);

      done();
    })
  })

  lab.test('it should allow user to delete surveyor', done => {
    const request = {
      method: 'DELETE',
      url: `/surveyor/${addedSurveyorId}`,
      headers: {
        Authorization: token
      }
    }

    server.inject(request, response => {
      Chai.expect(response.result.success).to.equal(true);

      done();
    })
  })

  lab.test('it should not allow unauthenticated user to update surveyor', done => {
    const request = {
      method: 'PATCH',
      url: `/surveyor/${addedSurveyorId}`,
      payload: {
        company_name: 'ITS Surveyors Company'
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
