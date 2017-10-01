const packageJson = require('./package.json');

const after = function(server, next) {
  server.route({
    method: 'GET',
    path: '/hello',
    config: {
      tags: ['api'],
      auth: false,
      handler: (req, reply) => {
        reply('Hello World!');
      }
    }
  });
  next();
}

export function register(server, options, next) {
  server.dependency('auth-section', after);

  next();
};

exports.register.attributes = {
  pkg: packageJson
};
