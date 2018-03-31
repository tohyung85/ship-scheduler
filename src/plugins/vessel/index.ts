const packageJson = require('./package.json');

import * as Joi from 'joi';
import Vessel from './models/Vessel';
import * as VesselController from './controllers/vessel-controller';

const after = function(server, next) {
  server.expose('VesselModel', () => {
    return Vessel;
  });

  server.route({
    method: 'GET',
    path: '/vessel',
    config: {
      tags: ['api'],
      auth: 'jwt',
      handler: VesselController.getVessels
    }
  });

  server.route({
    method: 'POST',
    path:'/vessel',
    config: {
      tags: ['api'],
      auth: 'jwt',
      handler: VesselController.addVessel,
      validate: {
        payload: Vessel.schema 
      }
    }
  });

  server.route({
    method: 'DELETE',
    path:'/vessel/{id}',
    config: {
      tags: ['api'],
      auth: 'jwt',
      handler: VesselController.deleteVessel
    }
  });

  server.route({
    method: 'PATCH',
    path: '/vessel/{id}',
    config: {
      tags: ['api'],
      handler: VesselController.updateVessel,
      auth: 'jwt',
      validate: {
        payload: Vessel.schema 
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
