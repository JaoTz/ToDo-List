/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require('dotenv').config();
module.exports = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
  },
  migrations: {
    directory: __dirname + '/src/config/knex/migrations',
  },
  seeds: {
    directory: __dirname + '/src/config/knex/seeds',
  },
};
