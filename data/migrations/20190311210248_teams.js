exports.up = function(knex, Promise) {
  return knex.schema.createTable("teams", function(teams) {
    teams.increments();
    teams.string("name", 30).notNullable();
    teams
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("teams");
};
