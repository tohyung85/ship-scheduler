'use strict';
import Hapi = require('hapi');
import Chai = require('chai');
import HelloPlugin = require('../../../../src/plugins/hello/index');
import AuthPLugin = require('../../../../src/plugins/auth/index');
import Lab = require('lab');
import Config = require('../../../../config');


const lab = exports.lab = Lab.script();
let request;
let server;


lab.beforeEach((done) => {
    const plugins = [HelloPlugin, AuthPLugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }

        done();
    });
});

lab.experiment('Auth Plugin', () => {

});
