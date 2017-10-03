'use strict';
import Hapi = require('hapi');
import Chai = require('chai');
import Lab = require('lab');
import Config = require('../../../../config');

const EventEmitter = require('events').EventEmitter;
import EmitterPlugin = require('../../../../src/plugins/event-emitter/index');

const lab = exports.lab = Lab.script();
let request;
let server;

lab.beforeEach((done) => {
    const plugins = [EmitterPlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }

        server.initialize(done);
    });
});


lab.experiment('Emitter Plugin', () => {
  
  lab.test('it should set up server with an emitter instance', done => {
    Chai.expect(server.events).to.be.an.instanceof(EventEmitter);
    done();
  })

})