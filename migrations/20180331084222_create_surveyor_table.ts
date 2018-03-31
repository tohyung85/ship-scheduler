import * as Knex from "knex";

const tableName = 'surveyors';

exports.up = function (knex: Knex): Promise<any> {
   return knex
   .schema
   .createTable(tableName, (table) => {
     table.increments().primary().notNullable().unique();

      table.string('company_name', 50).notNullable();
      table.string('alias', 50).notNullable();
      table.boolean('approved').defaultTo(true);

      table.integer('created_at', 11).notNullable();
      table.integer('updated_at', 11).notNullable();
   }) 
};

exports.down = function (knex: Knex): Promise<any> {
  return knex
    .schema
      .dropTableIfExists(tableName);
};
