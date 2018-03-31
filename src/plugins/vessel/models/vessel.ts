import * as Joi from 'joi';
import Model from '../../../objection-model';

const {compose} = require('objection');
import RestMixin from '../../../objection-rest-mixin';
import TimestampMixin from '../../../objection-timestamp-mixin';


const mixins = compose(
  RestMixin,
  TimestampMixin
);

export default class Vessel extends mixins(Model) {
  name: string;

  static get tableName() {
    return 'vessels';
  }

  static get schema() {
    return {
      name: Joi.string(),
      sap_id: Joi.string(),
      imo: Joi.number(),
      charter_type: Joi.number(),
      vessel_type: Joi.number(),
    }
  }
}