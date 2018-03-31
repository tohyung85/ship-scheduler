import Counterparty from '../models/counterparty';
import * as jwt from 'jsonwebtoken';
import * as Boom from 'boom';
import * as moment from 'moment';

export function getCounterparties(req, reply) {
  let query = Counterparty.query();

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

export function addCounterparty(req, reply) {
  const { name, alias } = req.payload;
  Counterparty.query()
  .insert({
    name,
    alias 
  })
  .then(result => {
    if(!result) throw Boom.serverUnavailable('Failed to add Counterparty')

    reply(result);
  })
  .catch(err => {
    reply(Boom.wrap(err));
  });
}

export function updateCounterparty(req, reply) {
  const { id } = req.params;
  const {name, alias} = req.payload;
  Counterparty.query()
  .patch({
    name,
    alias
  })
  .where('id', id)
  .then(result => {
    if(result < 1) throw Boom.notFound('Counterparty not found');

    reply({
      success: true
    })
  })
  .catch(err => {
    reply(Boom.wrap(err));
  })
}

export function deleteCounterparty(req, reply) {
  const { id } = req.params;

  Counterparty.query()
  .delete()
  .where('id', id)
  .then(result => {
    if(result < 1) throw Boom.notFound('Counterparty not found');

    reply({
      success: true
    })
  })
  .catch(err => {
    reply(Boom.wrap(err));
  });
}