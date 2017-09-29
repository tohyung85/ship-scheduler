exports.seed = function seed(knex, Promise) {
    const tableName = 'users';

    const rows = [
        {
            name: 'Joshua Tan',
            username: 'tantohyung',
            password: 'password',
            email: 'tytan@gmail.com',
            guid: 'f03ede7c-b121-4112-bcc7-130a3e87988c'
        },
    ];

    return knex(tableName)
    .del()
    .then(function() {
        return knex.insert(rows).into(tableName);
    })
}