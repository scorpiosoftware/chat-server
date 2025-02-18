const fp = require('fastify-plugin');
const { Server } = require('socket.io');
module.exports = fp(
  async function (appInstance) {
    try {
      const io = new Server(appInstance.server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"]
        }
      });
      appInstance.decorate("io", io);
      io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);
        socket.on("joinRoom", (roomId) => {
          socket.join(roomId);
        });
        socket.on('message', async (data) => {
          console.log('Message received:', data);
          io.to(data.room_id).emit("message", data);
          const { content, user_id, room_id } = data
          await appInstance.db('messages').insert({ content, user_id, room_id });
        });

        socket.on('disconnect', () => {
          console.log('Client disconnected:', socket.id);
        });
      });

    } catch (error) {
      appInstance.log.error(error);
      throw error;
    }
  });


