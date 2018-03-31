import Location from '../models/location';
import * as jwt from 'jsonwebtoken';
import * as Boom from 'boom';
import * as moment from 'moment';

export function getLocations(req, reply) {
  let query = Location.query();

  if(req.query.q) {
    query = query.where('name', 'like', `%${req.query.q}%`);
  } 

  query.then(result => {
    reply(result);
  })
  .catch(err => {
    reply(Boom.wrap(err));
  })
}

export function addLocation(req, reply) {
  const { name, country, alias } = req.payload;
  Location.query()
  .insert({
    name,
    country,
    alias
  })
  .then(result => {
    if(!result) throw Boom.serverUnavailable('Failed to add Location')

    reply(result);
  })
  .catch(err => {
    reply(Boom.wrap(err));
  });
}

export function updateLocation(req, reply) {
  const { id } = req.params;
  const {name, country, alias} = req.payload;
  Location.query()
  .patch({
    name,
    country,
    alias
  })
  .where('id', id)
  .then(result => {
    if(result < 1) throw Boom.notFound('Location not found');

    reply({
      success: true
    })
  })
  .catch(err => {
    reply(Boom.wrap(err));
  })
}

export function deleteLocation(req, reply) {
  const { id } = req.params;

  Location.query()
  .delete()
  .where('id', id)
  .then(result => {
    if(result < 1) throw Boom.notFound('Location not found');

    reply({
      success: true
    })
  })
  .catch(err => {
    reply(Boom.wrap(err));
  });
}