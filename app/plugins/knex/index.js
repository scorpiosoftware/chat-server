const fp = require('fastify-plugin');
const knex = require('knex');
const dbConfig = require('../../../configs/database');

module.exports = fp(
    async function(appInstance){
          try {
            const db = knex(dbConfig);
            appInstance.decorate("db",db);
            appInstance.addHook("onClose",(instance,done) => {
                 if(instance.db){
                    instance.db.destroy();
                    delete instance.db;
                 }
                 done();
            })

          } catch (error) {
            appInstance.log.error(error);
            throw error;
          }
});