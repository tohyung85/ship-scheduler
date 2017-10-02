import * as Knex from "knex";
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';

exports.seed = function (knex: Knex): Promise<any> {
  const saltRounds = 10;

  const tableName = 'users';
  const planTextPass = 'password';
  

  return bcrypt.hash(planTextPass, saltRounds)
    .then(function(hash) {
      const rows = [
        {
          name: 'Joshua Tan',
          username: 'tantohyung',
          password: hash,
          email: 'tytan@gmail.com',
          created_at: moment().format('X'),
          updated_at: moment().format('X'),
        },
      ];
      // Store hash in your password DB.
      return knex(tableName).del()
        .then(function () {
          return knex(tableName).insert(rows);
        });
    });
};
