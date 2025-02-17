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
const middlewares = require('./middlewares')
const app = Fastify(
    {
        ignoreTrailingSlash,
        logger: true
    }
);
const routes = require('../routes/index')

const io = require('socket.io')(app.server, {
    cors: {
      origin: "http://localhost:3010",
      methods: ["GET", "POST"]
    }
  });
io.on('connection', (socket) => {

    socket.join("room1");
    console.log('New client connected:', socket.rooms);
    socket.on('disconnect', () => {
      const count = io.engine.clientsCount;
      console.log(count);
      console.log('Client disconnected:', socket.id);
    });
    const count = io.engine.clientsCount;
    console.log(count);
  });
app.register(FastifCors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type']
})
// app.register(FastifyIO);
app.decorate('io',io);
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
app.register(routes);
module.exports = app;   