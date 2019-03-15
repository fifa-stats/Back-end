exports.up = function(knex, Promise) {
  return knex.schema.createTable("custom_team", function(table) {
    table.increments().primary;
    table
      .integer("team_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("teams")
      .onDelete("cascade");
    table
      .integer("player_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("players")
      .onDelete("cascade");
    table.unique(["team_id", "player_id"]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("custom_team");
};
