import * as Joi from 'joi';
import Model from '../../../objection-model';

const {compose} = require('objection');
const Password = require('objection-password')({
  allowEmptyPassword: true,
  passwordField: 'password'
});
import TimestampMixin from '../../../objection-timestamp-mixin';
import RestMixin from '../../../objection-rest-mixin';

const mixins = compose(
  Password,
  TimestampMixin,
  RestMixin
);

export default class User extends mixins(Model) {
  name: string;
  username: string;
  password: string;
  email: string;

  static get tableName() {
    return 'users';
  }

  static get hidden() {
    return [
      'password'
    ];
  }

  static get schema() {
    return {
      name: Joi.string(),
      username: Joi.string(),
      password: Joi.string(),
      email: Joi.string()
    }
  }
}