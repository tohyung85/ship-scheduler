'use strict';
import Hapi = require('hapi');
import Chai = require('chai');
import HelloPlugin = require('../../../../src/plugins/hello/index');
import AuthPlugin = require('../../../../src/plugins/auth/index');
import Lab = require('lab');
import Config = require('../../../../config');


const lab = exports.lab = Lab.script();
let request;
let server;


lab.beforeEach((done) => {
    const plugins = [AuthPlugin, HelloPlugin];
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
            url: '/hello',
            headers: {
              Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkFudGhvbnkgVmFsaWQgVXNlciIsImlhdCI6MTQyNTQ3MzUzNX0.KA68l60mjiC8EXaC2odnjFwdIDxE__iDu5RwLdN1F2A"
            }
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
