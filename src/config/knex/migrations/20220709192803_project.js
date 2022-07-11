/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('projects', function (table) {
    table.increments('id').primary();
    table.string('name', 15).notNullable();
    table.timestamps(true, true, false);

    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('projects');
};
