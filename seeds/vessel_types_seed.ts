import * as Knex from "knex";
import * as moment from 'moment';

const tableName = 'vessel_types';

exports.seed = function (knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex(tableName).del()
        .then(function () {
            // Inserts seed entries
            const rows = [
              {  
                type: "MR",
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
              { 
                type: "GP",
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
              { 
                type: "PMAX",
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
              { 
                type: "LR",
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
            ]
            return knex(tableName).insert(rows);
        });
};
