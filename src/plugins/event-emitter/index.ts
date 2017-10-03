const packageJson = require('./package.json');
const EventEmitter = require('events').EventEmitter;

export function register(server, options, next) {
  const emitter = new EventEmitter();
  server.decorate('server', 'events', emitter);

  next();
}

exports.register.attributes = {
  pkg: packageJson
};