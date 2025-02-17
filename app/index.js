const Fastify = require('fastify');
const FastifCors = require('@fastify/cors');
const fastifyJWT = require('@fastify/jwt');
const logger = require('../configs/logger');
const crypto = require('crypto');

const authRoutes = require('../routes/auth');
const userRoutes = require('../routes/users');
const roomRoutes = require('../routes/rooms');

const { ignoreTrailingSlash } = require('../configs/route');
const dbPlugin = require('./plugins/knex');
const socket = require('./plugins/Socket');
const middlewares = require('./middlewares')
const app = Fastify(
    {
        ignoreTrailingSlash,
        logger: true
    }
);
const routes = require('../routes/index')



app.register(FastifCors, {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type']
})
// Register JWT plugin
const secret = crypto.randomBytes(64).toString('hex');
app.register(fastifyJWT, {
    secret: secret  // Used to sign/verify tokens
  });
// Register plugins
app.register(middlewares);
app.register(authRoutes);
app.register(userRoutes);
app.register(roomRoutes);
app.register(dbPlugin);
app.register(socket);
app.register(routes);
module.exports = app;   