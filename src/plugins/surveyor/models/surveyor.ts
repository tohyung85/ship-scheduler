import * as Joi from 'joi';
import Model from '../../../objection-model';

const {compose} = require('objection');
import RestMixin from '../../../objection-rest-mixin';
import TimestampMixin from '../../../objection-timestamp-mixin';


const mixins = compose(
  RestMixin,
  TimestampMixin
);

export default class Surveyor extends mixins(Model) {
  company_name: string;
  alias: string;
  approved: boolean;

  static get tableName() {
    return 'surveyors';
  }

  static get schema() {
    return {
      company_name: Joi.string(),
      alias: Joi.string(),
      approved: Joi.boolean(),
    }
  }
}