exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(users) {
    users.increments().primary();
    users.string("fname", 30).notNullable();
    users.string("lname", 30).notNullable();
    users.string("email", 30).notNullable();
    users.string("password", 100).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
