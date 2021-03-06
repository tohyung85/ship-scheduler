import * as Knex from "knex";

const tableName = 'vessel_types';

exports.up = function (knex: Knex): Promise<any> {
   return knex
   .schema
   .createTable(tableName, (table) => {
     table.increments().primary().notNullable().unique();

      table.string('type', 50).notNullable();

      table.integer('created_at', 11).notNullable();
      table.integer('updated_at', 11).notNullable();
   }); 
};

exports.down = function (knex: Knex): Promise<any> {
  return knex
    .schema
      .dropTableIfExists(tableName);
};
