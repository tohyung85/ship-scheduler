const packageJson = require('./package.json');
import Sessions from './models/session';
import * as moment from 'moment';
import * as Boom from 'boom';
import * as Events from './events';

const after = function(server, next) {
  Events.registerEvents(server.events);

  next();
}

export function register(server, options, next) {
  server.dependency('auth-section', after);

  next();
}

exports.register.attributes = {
  pkg: packageJson
};
