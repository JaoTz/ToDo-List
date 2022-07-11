/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tasks', function (table) {
    table.increments('id').primary();
    table.string('description').notNullable();
    table.boolean('check').defaultTo(false);
    table.date('created_at');
    table.date('finish_at');
    table
      .integer('project_id')
      .unsigned()
      .references('id')
      .inTable('projects')
      .notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('tasks');
};
