const bcrypt = require('bcrypt');
const saltRounds = 10;
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const TABLE_NAME = "users";
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del()
  await knex(TABLE_NAME).insert([
    { name: "Admin", email: "admin@admin.com",role: "admin"},
    { name: "Ali Mahfouz", email: "alimahfouz1998@gmail.com"},
    { name: "Jackson", email: "jackson745@gmail.com" },
    { name: "Tailor", email: "tailor556@gmail.com" },
    { name: "Mostafa", email: "mostafa588@gmail.com" },
    { name: "Batul", email: "batul432@gmail.com" },
    { name: "Zaid", email: "zaid098@gmail.com" },
  ]);
};
