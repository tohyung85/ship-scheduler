'use strict';
import Hapi = require('hapi');
import Chai = require('chai');
import Lab = require('lab');
import Config = require('../../../../config');

import User from '../../../../src/plugins/auth/models/user';
import Session from '../../../../src/plugins/auth/models/session';

import EmitterPlugin = require('../../../../src/plugins/event-emitter/index');
import AuthPlugin = require('../../../../src/plugins/auth/index');

const lab = exports.lab = Lab.script();
let request;
let server;
let token: string | null = null;
let newUser: User | null = null;

lab.beforeEach((done) => {
    const plugins = [EmitterPlugin, AuthPlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/web') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }

        server.initialize(done);
    });
});


lab.experiment('User Plugin', () => {

  lab.test('it should be able to add/register a user', done => {
    const request = {
      method: 'POST',
      url: '/auth/register',
      payload: {
        name: 'Test',
        username: 'testuser',
        password: 'password',
        email: 'testadduser@user.com'
      }
    }

    server.inject(request, response => {
      newUser = response.result;

      Chai.expect(newUser).to.not.equal(null);
      
      Chai.expect(newUser!.name).to.equal('Test');
      Chai.expect(newUser).to.not.have.key('password');

      done();
    })
  });

  lab.test('it should allow a user to login', done => {
    const request = {
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: 'testadduser@user.com',
        password: 'password'
      }
    }

    server.inject(request, response => {
      Chai.expect(response.result).to.have.keys(['success', 'token']);
      Chai.expect(response.result.success).to.equal(true);
      Chai.expect(response.result.token).to.be.a('string');

      token = response.result.token;
      done();
    })
  })

  lab.test('it should not allow user with invalid credentials to log in', done => {
    const request = {
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: 'testadduser@user.com',
        password: 'lamepassword'
      }
    }

    server.inject(request, response => {
      Chai.expect(response.statusCode).to.equal(401);
      Chai.expect(response.result).to.have.keys(['statusCode', 'error', 'message']);

      const {statusCode, error, message} = response.result;
      Chai.expect(error).to.equal('Unauthorized');
      Chai.expect(message).to.match(/Email or password is incorrect/);

      token = response.result.token;
      done();
    })

  })
});


lab.experiment('User logged in', () => {
  let token = null;

  lab.before(done => {
    const request = {
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: 'testadduser@user.com',
        password: 'password'
      }
    }

    server.inject(request, response => {
      token = response.result.token;
      done();
    })
  })

  lab.test('User should be able to get his details', done => {
    const request = {
      method: 'GET',
      url: '/auth/me',
      headers: {
        Authorization: token
      }
    };

    server.inject(request, response => {
      const user = response.result;

      Chai.expect(user.email).to.match(/testadduser@user.com/);
      done();
    })
  })

  lab.test('User should be able to access list of users', done => {
    const request = {
        method: 'GET',
        url: '/users',
        headers: {
          Authorization: token 
        }
    };

    server.inject(request, (response) => {
      const {count, items} = response.result;

      Chai.expect(count).to.equal(2);
      Chai.expect(items).to.be.an('array');

      items.forEach(user => {
        Chai.expect(user).to.not.have.key('password');
      });

      Chai.expect(response.statusCode).to.equal(200);

      done();
    });
  })

  lab.test('User should be able to sign out', done => {
    const request = {
      method: 'POST',
      url: '/auth/signout',
      headers: {
        Authorization: token 
      }
    }

    server.inject(request, response => {
      Chai.expect(response.result).to.have.keys(['success']);
      done();
    });
  })

  lab.test('it should be able to delete a user', done => {
    const request = {
      method: 'DELETE',
      url: `/users/${newUser!.id}`,
      headers: {
        Authorization: token 
      }
    };

    server.inject(request, response => {
      Chai.expect(response.result).to.equal(1);
      done();
    });
  })


  lab.after(done => {
    const request = {
      method: 'POST',
      url: '/auth/signout',
      headers: {
        Authorization: token,
      }
    }

    server.inject(request, response => {
      done();
    })
  })
})

lab.experiment('User is not logged in', () => {
  lab.test('User should not be able to access list', done => {
    const request = {
      method: 'GET',
      url: '/users',
    };

    server.inject(request, (response) => {
      Chai.expect(response.statusCode).to.equal(401);

      done();
    });
  })
})

lab.experiment('JWT is invalid', () => {
  lab.test('User should not be able to access list', done => {
    const request = {
      method: 'GET',
      url: '/users',
      headers: {
        Authorization:'crap token' 
      }
    };

    server.inject(request, (response) => {
      Chai.expect(response.statusCode).to.equal(401);

      done();
    });
  })
})