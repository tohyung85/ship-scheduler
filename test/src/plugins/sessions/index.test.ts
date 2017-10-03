'use strict';
import Hapi = require('hapi');
import Chai = require('chai');
import Lab = require('lab');
import Config = require('../../../../config');

import Session from '../../../../src/plugins/sessions/models/session';

import EmitterPlugin = require('../../../../src/plugins/event-emitter/index');
import AuthPlugin = require('../../../../src/plugins/auth/index');
import SessionPlugin = require('../../../../src/plugins/sessions/index');

const lab = exports.lab = Lab.script();
let server;

lab.beforeEach((done) => {
    const plugins = [EmitterPlugin, AuthPlugin, SessionPlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }

        server.initialize(done);
    });
});

lab.experiment('Session Plugin', () => {
  lab.test('it should create a session on user created', done => {
    const stubUser = {
      id: 1
    };

    server.events.emit('userLogin', stubUser);

    server.events.on('sessionCreated', () => {
      Session.query()
        .first()
        .where('userId', stubUser.id)
        .then(result => {
          Chai.expect(result).to.be.an.instanceof(Session);
          done();
        });
    })
  });

  lab.test('it should delete a session on user signout', done=> {
    const stubUser = {
      id: 1
    };

    server.events.emit('userLogout', stubUser);

    server.events.on('sessionDeleted', () => {
      Session.query()
        .first()
        .where('userId', stubUser.id)
        .then(result => {
          Chai.expect(result).to.not.be.an.instanceof(Session);
          done();
        });
    })

  })
});