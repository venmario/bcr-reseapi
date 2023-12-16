import type { Knex } from "knex";
import "dotenv/config";
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "root",
      database: "bcr",
    },
    seeds: {
      directory: "./database/seeds/dev",
    },
    migrations: {
      directory: "./database/migrations",
    },
  },
  production: {
    client: "pg",
    // connection: {
    //   host: "fdaa:3:d679:0:1::3",
    //   port: 5432,
    //   user: "postgres",
    //   password: "0T9Riw7KwtHxKIR",
    //   database: "bcr_backend_mario",
    // },
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: "./database/seeds/dev",
    },
    migrations: {
      directory: "./database/migrations",
    },
  },
};

module.exports = config;
