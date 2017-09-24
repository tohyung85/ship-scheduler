const packageJson = require('./package.json');

exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/hello',
    handler: (req, reply) => {
      reply('Hello World!');
    }
  });

  next();
};

exports.register.attributes = {
  pkg: packageJson
};
