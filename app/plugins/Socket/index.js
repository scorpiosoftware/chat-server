const fp = require('fastify-plugin');

module.exports = fp(
    async function(appInstance){
          try {
            const io = require('socket.io')(appInstance.server, {
                cors: {
                  origin: "*",
                  methods: ["GET", "POST"]
                }
              });
              appInstance.decorate("io",io);
              io.on('connection', (socket) => {
                console.log('New client connected:', socket.id);
                 
                socket.on('message', (data) => {
                  console.log('Message received:', data);
                  socket.emit('reply', 'Message received!');
                  const {content,user_id,_room_id}
                  appInstance.db('messages').insert({data.content,data.user_id,data.room_id});
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


