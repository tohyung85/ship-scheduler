import * as Knex from "knex";
import * as moment from 'moment';

const tableName = 'charter_types';

exports.seed = function (knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex(tableName).del()
        .then(function () {
            // Inserts seed entries
            const rows = [
              {  
                type: "COA",
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
              { 
                type: "TC",
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
              { 
                type: "SPOT",
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
            ]
            return knex(tableName).insert(rows);
        });
};
