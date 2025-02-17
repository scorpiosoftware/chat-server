const { Knex } = require("knex");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const TABLE_NAME = "users";

exports.up = function (knex) {
    return knex.schema.createTable(TABLE_NAME, (tb) => {
        tb.increments('id');
        tb.string('name', 255).notNullable();
        tb.string('email', 255).notNullable();
        tb.string('password', 255).notNullable().defaultTo('12345678');
        tb.enu('role',['admin','user']).defaultTo('user');
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
