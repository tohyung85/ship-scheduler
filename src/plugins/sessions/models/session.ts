import * as Joi from 'joi';
import Model from '../../../objection-model';
const {compose} = require('objection');
const ObjectionGuid = require('objection-guid')();
import RestMixin from '../../../objection-rest-mixin';
import TimestampMixin from '../../../objection-timestamp-mixin';

const mixins = compose(
  RestMixin,
  TimestampMixin,
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