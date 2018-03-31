import * as Knex from "knex";

const tableName = 'vessels';

exports.up = function (knex: Knex): Promise<any> {
   return knex
   .schema
   .createTable(tableName, (table) => {
     table.increments().primary().notNullable().unique();

      table.string('name', 50).notNullable();
      table.integer('imo', 10).notNullable();
      table.string('sap_id', 50);

      //has one relation
      table.integer('charter_type', 5);
      table.integer('vessel_type', 5);

      table.integer('created_at', 11).notNullable();
      table.integer('updated_at', 11).notNullable();
   });
};

exports.down = function (knex: Knex): Promise<any> {
  return knex
    .schema
      .dropTableIfExists(tableName);
};
