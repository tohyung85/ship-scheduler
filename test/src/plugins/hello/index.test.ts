'use strict';
import Hapi = require('hapi');
import Chai = require('chai');
import EmitterPlugin = require('../../../../src/plugins/event-emitter/index');
import HelloPlugin = require('../../../../src/plugins/hello/index');
import AuthPlugin = require('../../../../src/plugins/auth/index');
import Lab = require('lab');
import Config = require('../../../../config');


const lab = exports.lab = Lab.script();
let request;
let server;


lab.beforeEach((done) => {
    const plugins = [EmitterPlugin, AuthPlugin, HelloPlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }

        server.initialize(done);

        // done();
    });
});


lab.experiment('Hello Plugin', () => {

    lab.beforeEach((done) => {

        request = {
            method: 'GET',
            url: '/hello'
        };

        done();
    });



    lab.test('it returns the hello world message', (done) => {

        server.inject(request, (response) => {

            Chai.expect(response.result).to.match(/Hello World!/i);
            Chai.expect(response.statusCode).to.equal(200);

            done();
        });
    });
});
