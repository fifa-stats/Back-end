// Update with your config settings.
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "postgres",
      password: "Slayer2710",
      database: "fifa19"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
