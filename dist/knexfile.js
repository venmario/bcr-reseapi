"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Update with your config settings.
const config = {
    development: {
        client: "postgresql",
        connection: {
            host: "127.0.0.1",
            port: 5432,
            user: "postgres",
            password: "root",
            database: "bcr",
        },
        seeds: {
            directory: "./seeds/dev",
        },
    },
};
module.exports = config;
