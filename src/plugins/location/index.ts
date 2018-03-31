const packageJson = require('./package.json');

import * as Joi from 'joi';
import Location from './models/Location';
import * as LocationController from './controllers/location-controller';

const after = function(server, next) {
  server.expose('LocationModel', () => {
    return Location;
  });

  server.route({
    method: 'GET',
    path: '/location',
    config: {
      tags: ['api'],
      auth: 'jwt',
      handler: LocationController.getLocations
    }
  });

  server.route({
    method: 'POST',
    path:'/location',
    config: {
      tags: ['api'],
      auth: 'jwt',
      handler: LocationController.addLocation,
      validate: {
        payload: Location.schema
      }
    }
  });

  server.route({
    method: 'DELETE',
    path:'/location/{id}',
    config: {
      tags: ['api'],
      auth: 'jwt',
      handler: LocationController.deleteLocation
    }
  });

  server.route({
    method: 'PATCH',
    path: '/location/{id}',
    config: {
      tags: ['api'],
      handler: LocationController.updateLocation,
      auth: 'jwt',
      validate: {
        payload: Location.schema 
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
