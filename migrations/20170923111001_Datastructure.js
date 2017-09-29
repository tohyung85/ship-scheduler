
exports.up = function(knex, Promise) {
    return knex
        .schema
        .createTable( 'users', function(usersTable) {

            //Primary key
            usersTable.increments();

            // Date
            usersTable.string('name', 50).notNullable();
            usersTable.string('username', 50).notNullable().unique();
            usersTable.string('email', 50).notNullable().unique();
            usersTable.string('password', 128).notNullable();
            usersTable.string('guid', 50).notNullable().unique();

            usersTable.timestamp('created_at').notNullable();
        })

        .createTable('birds', function(birdsTable) {
            // Primary Key
            birdsTable.increments();
            birdsTable.string('owner', 46).references('guid').inTable('users');
            
            // Data
            birdsTable.string('name', 250).notNullable();
            birdsTable.string('species', 250).notNullable();
            birdsTable.string('picture_url', 250).notNullable();
            birdsTable.string('guid', 250).notNullable().unique();
            birdsTable.boolean('isPublic').notNullable().defaultTo(true);

            birdsTable.timestamp('created_at').notNullable();
        })
};

exports.down = function(knex, Promise) {
    return knex
        .schema
            .dropTableIfExists('birds')
            .dropTableIfExists('users');
};
