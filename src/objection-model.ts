import * as DbConfig from '../db-config';
import Knex = require('knex');
import Objection = require('objection');

const {client, connection} = DbConfig.get('/');

const knex = Knex({
  client,
  connection
});

const Model = Objection.Model;
Model.knex(knex);

export default Model;