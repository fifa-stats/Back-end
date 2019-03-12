exports.up = function(knex, Promise) {
  return knex.schema.createTable("players", function(players) {
    players.increments().primary();
    players.string("Name").notNullable();
    players.integer("Age");
    players.string("Photo");
    players.string("Nationality");
    players.string("Club");
    players.string("Position", 5);
    players.integer("Height");
    players.integer("Weight");
    players.integer("Overall");
    players.integer("Potential");
    players.integer("Value");
    players.integer("Wage");
    players.string("PreferredFoot", 5);
    players.integer("WeakFoot");
    players.integer("Crossing");
    players.integer("Finishing");
    players.integer("HeadingAccuracy");
    players.integer("ShortPassing");
    players.integer("Dribbling");
    players.integer("SprintSpeed");
    players.integer("Agility");
    players.integer("ShotPower");
    players.integer("Stamina");
    players.integer("LongShots");
    players.integer("Interceptions");
    players.integer("Positioning");
    players.integer("Vision");
    players.integer("Marking");
    players.integer("StandingTackle");
    players.integer("SlidingTackle");
    players.integer("GKDiving");
    players.integer("GKHandling");
    players.integer("GKKicking");
    players.integer("GKPositioning");
    players.integer("GKReflexes");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("players");
};
