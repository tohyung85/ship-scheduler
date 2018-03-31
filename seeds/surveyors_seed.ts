import * as Knex from "knex";
import * as moment from 'moment';

const tableName = 'surveyors';

exports.seed = function (knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex(tableName).del()
        .then(function () {
            // Inserts seed entries
            const rows = [
              { id: 1, 
                company_name: "Intertek Caleb Pte Ltd",
                approved: true,
                alias: "ITS",
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
              { id: 2, 
                company_name: "Inspectorate Singapore Ptd Ltd",
                approved: true,
                alias: "Inspectorate",
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
              { id: 3, 
                company_name: "Amspec Singapore Ptd Ltd",
                approved: true,
                alias: "Amspec",
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
            ]
            return knex(tableName).insert(rows);
        });
};
