import * as Knex from "knex";

const tableName = 'counterparties';

exports.up = function (knex: Knex): Promise<any> {
   return knex
   .schema
   .createTable(tableName, (table) => {
     table.increments().primary().notNullable().unique();

      table.string('name', 50).notNullable().unique();
      table.string('alias', 10).notNullable().unique();

      table.integer('created_at', 11).notNullable();
      table.integer('updated_at', 11).notNullable();
   }) 
};

exports.down = function (knex: Knex): Promise<any> {
  return knex
    .schema
      .dropTableIfExists(tableName);
};
