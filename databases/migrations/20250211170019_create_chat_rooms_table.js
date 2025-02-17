/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const TABLE_NAME = 'chat_rooms';
exports.up = function(knex) {
    return knex.schema.createTable(TABLE_NAME, (tb) => {

        tb.increments('id');
        tb.string('name', 100).notNullable();
        tb.integer('admin_id').unsigned();
        tb.foreign('admin_id').references('users.id');
        tb.timestamp('created_at').defaultTo(knex.fn.now());
        tb.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable(TABLE_NAME);
};
