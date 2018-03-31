const packageJson = require('./package.json');

import * as Joi from 'joi';
import Surveyor from './models/Surveyor';
import * as SurveyorController from './controllers/surveyor-controller';

const after = function(server, next) {
  server.expose('SurveyorModel', () => {
    return Surveyor;
  });

  server.route({
    method: 'GET',
    path: '/surveyor',
    config: {
      tags: ['api'],
      auth: 'jwt',
      handler: SurveyorController.getSurveyors
    }
  });

  server.route({
    method: 'POST',
    path:'/surveyor',
    config: {
      tags: ['api'],
      auth: 'jwt',
      handler: SurveyorController.addSurveyor,
      validate: {
        payload: Surveyor.schema
      }
    }
  });

  server.route({
    method: 'DELETE',
    path:'/surveyor/{id}',
    config: {
      tags: ['api'],
      auth: 'jwt',
      handler: SurveyorController.deleteSurveyor
    }
  });

  server.route({
    method: 'PATCH',
    path: '/surveyor/{id}',
    config: {
      tags: ['api'],
      handler: SurveyorController.updateSurveyor,
      auth: 'jwt',
      validate: {
        payload: Surveyor.schema 
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
