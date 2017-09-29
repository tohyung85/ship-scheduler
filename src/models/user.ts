import Model from '../objection-model';

export default class User extends Model {
  name: string;
  username: string;
  password: string;
  email: string;
  guid: string;

  static get tableName() {
    return 'users';
  }
}