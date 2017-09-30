
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

            usersTable.timestamp('created_at').notNullable();
        })

        .createTable('birds', function(birdsTable) {
            // Primary Key
            birdsTable.increments();
            birdsTable.integer('owner', 46).unsigned().references('id').inTable('users');
            
            // Data
            birdsTable.string('name', 250).notNullable();
            birdsTable.string('species', 250).notNullable();
            birdsTable.string('picture_url', 250).notNullable();
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
