import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
  return knex
  .schema
  .createTable('sessions', (sessionsTable) => {
    // Primary key
    sessionsTable.uuid('id').primary().notNullable().unique();

    sessionsTable.integer('userId', 50).notNullable();

    sessionsTable.integer('created_at', 11).notNullable();
    sessionsTable.integer('updated_at', 11).notNullable();
    sessionsTable.integer('expiry', 11).notNullable();
  }); 
    
};

exports.down = function (knex: Knex): Promise<any> {
  return knex
    .schema
      .dropTableIfExists('sessions');
};
