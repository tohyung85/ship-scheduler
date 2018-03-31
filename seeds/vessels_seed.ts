import * as Knex from "knex";
import * as moment from 'moment';

const tableName = 'vessels';

exports.seed = function (knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex(tableName).del()
        .then(function () {
            // Inserts seed entries
            const rows = [
              {  
                name: "Stena Paris",
                imo: 1234567,
                sap_id: 'VS0000012345',
                charter_type: 2,
                vessel_type: 3,
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
              {  
                name: "STI Gramacy",
                imo: 7654321,
                sap_id: 'VS0000054123',
                charter_type: 1,
                vessel_type: 1,
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
              {  
                name: "Gulf Coral",
                imo: 5674321,
                sap_id: 'VS0000012355',
                charter_type: 3,
                vessel_type: 4,
                created_at: moment().format('X'),
                updated_at: moment().format('X'),
              },
            ]
            return knex(tableName).insert(rows);
        });
};
