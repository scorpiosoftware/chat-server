require('dotenv').config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    client: process.env.DB_CLIENT || 'mysql',
    connection: {
      database: process.env.DB_NAME || '',
      user:     process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || ''
    },
    pool: {
      min: parseInt(process.env.DB_POOL_MIN) || 2,
      max: parseInt(process.env.DB_POOL_MAX) || 10
    }
}