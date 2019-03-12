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
    }
  },

  production: {
    client: "pg",
    connection: {
      database: process.env.DATABASE_URL
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations"
    }
  }
};
