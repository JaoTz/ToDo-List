require('dotenv').config();

const DB_CLIENT = process.env.DB_CLIENT || 'mysql2';
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = process.env.DB_PORT || 3306;
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || 123;
const DB_SCHEMA = process.env.DB_SCHEMA || 'todo_list';
const PORT = process.env.PORT || 3333;
const SECRET = process.env.SECRET || 'secretForJwT';

module.exports = {
  DB_CLIENT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_SCHEMA,
  PORT,
  SECRET,
};
