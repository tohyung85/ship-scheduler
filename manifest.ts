import Confidence = require('confidence');
import Config = require('./config');

const criteria = {
  env: process.env.NODE_ENV
};

const manifest = {
  $meta: 'This file defines the plot device.',
  server: {
    debug: {
      request: ['error']
    },
    connections: {
      routes: {
        security: true,
        cors: true, // Allow cors for all paths, disable if you wish
      }
    }
  },
  connections: [{
    port: Config.get('/port/web'),
    labels: ['web']
  }],
  registrations: [
    {
      plugin: './src/plugins/event-emitter'
    },
    {
      plugin: './src/plugins/auth'
    },
    {
      plugin: './src/plugins/hello'
    },
    {
      plugin: 'inert'
    },
    {
      plugin: 'vision'
    },
    {
      plugin: {
        register: 'hapi-swagger',
        options: {
          info: {
            title: 'Hapi Starter',
            version: '1.0'
          },
        }
      }
    }

      // TODO: DB config plugin

      // plugin: {
      //   register: 'hapi-mongo-models',
      //   options: {
      //     mongodb: Config.get('/hapiMongoModels/mongodb'),
      //     models: {
      //       Account: './server/models/account',
      //       AdminGroup: './server/models/admin-group',
      //       Admin: './server/models/admin',
      //       AuthAttempt: './server/models/auth-attempt',
      //       Session: './server/models/session',
      //       Status: './server/models/status',
      //       User: './server/models/user'
      //     },
      //     autoIndex: Config.get('/hapiMongoModels/autoIndex')
      //   }
      // }
  ]
};

const store = new Confidence.Store(manifest);

export function get(key: string) {
  return store.get(key, criteria);
};


export function meta(key: string) {
  return store.meta(key, criteria);
};
