exports.up = function(knex, Promise) {
  return knex.schema.createTable("teams", function(teams) {
    teams.increments().primary();
    teams.string("name", 30).notNullable();
    teams
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("cascade");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("teams");
};
