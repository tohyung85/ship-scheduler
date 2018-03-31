const packageJson = require('./package.json');

import * as Joi from 'joi';
import Counterparty from './models/counterparty';
import * as CounterpartyController from './controllers/counterparty-controller';

const after = function(server, next) {
  server.expose('CounterpartyModel', () => {
    return Counterparty;
  });

  server.route({
    method: 'GET',
    path: '/counterparty',
    config: {
      tags: ['api'],
      auth: 'jwt',
      handler: CounterpartyController.getCounterparties
    }
  });

  server.route({
    method: 'POST',
    path:'/counterparty',
    config: {
      tags: ['api'],
      auth: 'jwt',
      handler: CounterpartyController.addCounterparty,
      validate: {
        payload: Counterparty.schema
      }
    }
  });

  server.route({
    method: 'DELETE',
    path:'/counterparty/{id}',
    config: {
      tags: ['api'],
      auth: 'jwt',
      handler: CounterpartyController.deleteCounterparty
    }
  });

  server.route({
    method: 'PATCH',
    path: '/counterparty/{id}',
    config: {
      tags: ['api'],
      handler: CounterpartyController.updateCounterparty,
      auth: 'jwt',
      validate: {
        payload: Counterparty.schema 
      }
    }
  })

  next();
}

export function register(server, options, next) {
  server.dependency('auth-section', after);

  next();
};

exports.register.attributes = {
  pkg: packageJson
};
