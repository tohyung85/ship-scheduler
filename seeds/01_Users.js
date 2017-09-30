exports.seed = function seed(knex, Promise) {
  const tableName = 'users';

  const rows = [
    {
      name: 'Joshua Tan',
      username: 'tantohyung',
      password: 'password',
      email: 'tytan@gmail.com',
    },
  ];

  return knex(tableName)
    .del()
    .then(function() {
      return knex.insert(rows).into(tableName);
    })
}