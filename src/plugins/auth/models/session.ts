import * as Joi from 'joi';
import Model from '../../../objection-model';
const {compose} = require('objection');
import RestMixin from '../../../objection-rest-mixin';
import ObjectionGuid from 'objection-guid';

const mixins = compose(
  RestMixin,
  ObjectionGuid
);

export default class Session extends mixins(Model) {
  userId: number; 
  created_at: number;
  expiry: number;

  static get tableName() {
    return 'sessions';
  }

  static get schema() {
    return {
      userId: Joi.number().integer(),
      created_at: Joi.date().timestamp(),
      expiry: Joi.date().timestamp(),
    }
  }
}