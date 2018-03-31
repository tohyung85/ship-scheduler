import * as Knex from "knex";
import * as moment from 'moment';

const tableName = 'counterparties';

exports.seed = function (knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex(tableName).del()
        .then(function () {
            // Inserts seed entries
            const rows = [
              {  
                name: "P66 International Pte Ltd",
                alias: 'P66',
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
              {  
                name: "Shell International Eastern Trading Company",
                alias: 'SIETCO',
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
              {  
                name: "JX Tonen General",
                alias: 'JXTG',
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
            ]
            return knex(tableName).insert(rows);
        });
};
