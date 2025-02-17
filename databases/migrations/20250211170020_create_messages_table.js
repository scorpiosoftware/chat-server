/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const TABLE_NAME = 'messages';
exports.up = function (knex) {
    return knex.schema.createTable(TABLE_NAME, (tb) => {

        tb.increments('id');
        tb.text('content', 100).notNullable();
        // Foreign key to users table
        tb.integer('user_id').unsigned().notNullable();
        tb.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
        // Foreign key to rooms table
        tb.integer('room_id').unsigned().notNullable();
        tb.foreign('room_id').references('id').inTable('chat_rooms').onDelete('CASCADE');
        tb.timestamp('created_at').defaultTo(knex.fn.now());
        tb.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable(TABLE_NAME);
};
