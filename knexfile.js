// Update with your config settings.
const dbConfig = require('./configs/database');
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  ...dbConfig,

  migrations:{
    tableName: 'fastify_migrations',
    directory : './databases/migrations',

  },

  seeds : {
     directory : "./databases/seeds",
     order: ['user_table_seeder.js', 'chat_rooms_table_seeder.js']
  }
};
