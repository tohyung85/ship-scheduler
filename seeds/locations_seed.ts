import * as Knex from "knex";
import * as moment from 'moment';

const tableName = 'locations';

exports.seed = function (knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex(tableName).del()
        .then(function () {
            // Inserts seed entries
            const rows = [
              {  
                name: "Exxon Mobil Pulau Ayer Chawan Terminal",
                alias: 'PAC',
                country: 'Singapore',
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
              {  
                name: "Exxon Mobil Jurong Terminal",
                alias: 'JUR',
                country: 'Singapore',
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
              {  
                name: "Vopak Banyan Terminal",
                alias: 'V.Banyan',
                country: 'Singapore',
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
              {  
                name: "Vopak Sebarok Terminal",
                alias: 'V.Sebarok',
                country: 'Singapore',
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
              {  
                name: "Tanjung Bin Terminal",
                alias: 'Tj.Bin',
                country: 'Malaysia',
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
            ]
            return knex(tableName).insert(rows);
        });
};
