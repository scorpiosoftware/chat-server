/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const TABLE_NAME = 'users_chat_rooms';
exports.up = function (knex) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments('id');
        // Foreign key to users table
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');

        // Foreign key to rooms table
        table.integer('room_id').unsigned().notNullable();
        table.foreign('room_id').references('id').inTable('chat_rooms').onDelete('CASCADE');

        // // Composite primary key using user_id and room_id
        // table.primary(['user_id', 'room_id']);

        // Timestamps for created_at and updated_at
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable(TABLE_NAME);
};
