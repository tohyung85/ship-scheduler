import Surveyor from '../models/surveyor';
import * as jwt from 'jsonwebtoken';
import * as Boom from 'boom';
import * as moment from 'moment';

export function getSurveyors(req, reply) {
  let query = Surveyor.query();

  if(req.query.q) {
    query = query.where('company_name', 'like', `%${req.query.q}%`);
  } 

  query.then(result => {
    reply(result);
  })
  .catch(err => {
    reply(Boom.wrap(err));
  })
}

export function addSurveyor(req, reply) {
  const { company_name, approved, alias } = req.payload;
  Surveyor.query()
  .insert({
    company_name,
    alias,
    approved
  })
  .then(result => {
    if(!result) throw Boom.serverUnavailable('Failed to add Surveyor')

    reply(result);
  })
  .catch(err => {
    reply(Boom.wrap(err));
  });
}

export function updateSurveyor(req, reply) {
  const { id } = req.params;
  const {company_name, approved, alias} = req.payload;
  Surveyor.query()
  .patch({
    company_name,
    alias,
    approved
  })
  .where('id', id)
  .then(result => {
    if(result < 1) throw Boom.notFound('Surveyor not found');

    reply({
      success: true
    })
  })
  .catch(err => {
    reply(Boom.wrap(err));
  })
}

export function deleteSurveyor(req, reply) {
  const { id } = req.params;

  Surveyor.query()
  .delete()
  .where('id', id)
  .then(result => {
    if(result < 1) throw Boom.notFound('Surveyor not found');

    reply({
      success: true
    })
  })
  .catch(err => {
    reply(Boom.wrap(err));
  });
}