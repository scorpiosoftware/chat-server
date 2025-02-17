/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const TABLE_NAME = "chat_rooms";
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del()
  await knex(TABLE_NAME).insert([
    { name: "Department 1", admin_id:1},
    { name: "Department 2", admin_id:2},
    { name: "Department 3", admin_id:3},
    { name: "Department 4", admin_id:4},
  ]);
};
