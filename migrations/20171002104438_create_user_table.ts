import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
   return knex
    .schema
    .createTable('users', (usersTable) => {
      //Primary key
      usersTable.increments().primary().notNullable().unique();

      usersTable.string('name', 50).notNullable();
      usersTable.string('username', 50).notNullable().unique();
      usersTable.string('email', 50).notNullable().unique();
      usersTable.string('password', 128).notNullable();

      usersTable.integer('created_at', 11).notNullable();
      usersTable.integer('updated_at', 11).notNullable();
    }); 
};

exports.down = function (knex: Knex): Promise<any> {
  return knex
    .schema
      .dropTableIfExists('users');
};
