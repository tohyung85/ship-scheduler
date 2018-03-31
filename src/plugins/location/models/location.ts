import * as Joi from 'joi';
import Model from '../../../objection-model';

const {compose} = require('objection');
import RestMixin from '../../../objection-rest-mixin';
import TimestampMixin from '../../../objection-timestamp-mixin';


const mixins = compose(
  RestMixin,
  TimestampMixin
);

export default class Location extends mixins(Model) {
  name: string;
  alias: string;
  country: string;

  static get tableName() {
    return 'locations';
  }

  static get schema() {
    return {
      name: Joi.string(),
      alias: Joi.string(),
      country: Joi.string(),
    }
  }
}