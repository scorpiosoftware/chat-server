const fp = require('fastify-plugin');

module.exports = fp(
    async function (appInstance) {
        try {
            //#region middleware

            //check authentication user
            appInstance.decorate('authenticate', async function (request, reply) {
                try {
                    await request.jwtVerify();
                } catch (err) {
                    reply.send(err);
                }
            });
            appInstance.decorate('alreayAuth', async function (request, reply) {
                try {
                    await request.jwtVerify();  // Verify the JWT
                    reply.code(403).send({ error: 'You are already logged in' });  // Block access
                } catch (err) {
                    // If the JWT is invalid or missing, allow access to the login route
                    return;
                }
            });
            //check admin authentication
            appInstance.decorate('authenticateAdmin', async function (request, reply) {
                try {
                    // Verify the JWT
                    await request.jwtVerify();
                    // Access the decoded JWT payload
                    const user = request.user;
                    // Check if the user has the 'admin' role
                    if (user.role !== 'admin') {
                        reply.code(403).send({ error: 'Forbidden: Admin access required' });
                        return;
                    }

                    // If the user is an admin, proceed to the next handler
                } catch (err) {
                    reply.code(401).send({ error: 'Unauthorized' });
                }
            });

            //#endregion middleware

        } catch (error) {
            appInstance.log.error(error);
            throw error;
        }
    });