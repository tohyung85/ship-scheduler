import Vessel from '../models/vessel';
import * as jwt from 'jsonwebtoken';
import * as Boom from 'boom';
import * as moment from 'moment';

export function getVessels(req, reply) {
  let query = Vessel.query();

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

export function addVessel(req, reply) {
  const { name, charter_type, vessel_type, imo, sap_id } = req.payload;
  Vessel.query()
  .insert({
    name,
    charter_type,
    vessel_type,
    imo,
    sap_id 
  })
  .then(result => {
    if(!result) throw Boom.serverUnavailable('Failed to add Vessel')

    reply(result);
  })
  .catch(err => {
    reply(Boom.wrap(err));
  });
}

export function updateVessel(req, reply) {
  const { id } = req.params;
  const {name, charter_type, vessel_type, imo, sap_id} = req.payload;
  Vessel.query()
  .patch({
    name,
    charter_type,
    vessel_type,
    imo,
    sap_id 
  })
  .where('id', id)
  .then(result => {
    if(result < 1) throw Boom.notFound('Vessel not found');

    reply({
      success: true
    })
  })
  .catch(err => {
    reply(Boom.wrap(err));
  })
}

export function deleteVessel(req, reply) {
  const { id } = req.params;

  Vessel.query()
  .delete()
  .where('id', id)
  .then(result => {
    if(result < 1) throw Boom.notFound('Vessel not found');

    reply({
      success: true
    })
  })
  .catch(err => {
    reply(Boom.wrap(err));
  });
}