const fp = require("fastify-plugin");
module.exports = fp(
    async function (appInstance) {
        //#region users
        //get users data
        appInstance.get("/api/users", { preHandler: [appInstance.authenticateAdmin] }, async function (req, rep) {
            try {
                const data = await this.db("users").select("*");
                return rep.code(200).send({
                    status: "LOADED",
                    statusCode: 200,
                    message: "User Data List",
                    payload: {
                        data,
                    },
                });
            } catch (error) {
                return error;
            }
        });

        //post user data
        appInstance.post("/api/users/create", { preHandler: [appInstance.authenticate] }, async function (req, rep) {
            try {
                const { name, email } = req.body;
                const [userId] = await this.db("users").insert({ name, email });
                const user = await this.db("users").select("*").where({ id: userId });
                return rep.code(201).send({
                    status: "CREATED",
                    statusCode: 201,
                    message: "User POST DATA",
                    payload: {
                        user,
                    },
                });
            } catch (error) {
                return error;
            }
        });
        //get user by id
        appInstance.get("/api/users/:userId", { preHandler: [appInstance.authenticate] }, async function (req, rep) {
            try {
                const params = req.params;
                const user = await this.db("users")
                    .select("*")
                    .where({ id: params.userId })
                    .first();
                return rep.code(201).send({
                    status: "LOADED",
                    statusCode: 201,
                    message: "User GET DATA",
                    payload: {
                        params,
                        user: user ? user : {},
                    },
                });
            } catch (error) {
                return error;
            }
        });
        //Update user by userId
        appInstance.put("/api/users/update/:userId", { preHandler: [appInstance.authenticate] }, async function (req, rep) {
            try {
                const { userId } = req.params; // user id under parameters
                const { name, email , role } = req.body; // request body [data sended by url post]
                let user = {};
                const userExist = await this.db("users")
                    .select("*")
                    .where({ id: userId })
                    .first(); // check if user exist in database
                if (!userExist) {
                    return rep.code(200).send({
                        status: "DATA_NOT_FOUND",
                        statusCode: 404,
                        message: "No User Data",
                        // payload: {
                            params,
                        //     user,
                        // },
                    });
                }
                const result = await this.db("users")
                    .update({ name, email , role, updated_at: this.db.fn.now() })
                    .where({ id: userId }); // update user row in database
                if (result) {
                    user = await this.db("users")
                        .select("*")
                        .where({ id: userId })
                        .first();
                }
                return rep.code(200).send({
                    status: "UPDATED",
                    statusCode: 200,
                    message: "User PUT DATA",
                    // payload: {
                    //     params,
                    //     user,
                    // },
                });
            } catch (error) {
                return error;
            }
        });
        //Delete user by userId
        appInstance.delete("/api/users/delete/:userId", { preHandler: [appInstance.authenticate] }, async function (req, rep) {
            const params = req.params;
            const { userId } = params;
            const userExist = await this.db("users")
                .select("*")
                .where({ id: userId })
                .first();
            if (!userExist) {
                return rep.code(200).send({
                    status: "DATA_NOT_FOUND",
                    statusCode: 200,
                    message: "FAILD On Delete User Data",
                    payload: {
                        params,
                    },
                });
            }

            await this.db("users").del().where({
                id: userId,
            });
            return rep.code(200).send({
                status: "DELETED",
                statusCode: 200,
                message: "Delete User Data",

            });
        });
        //#endregion


    },
    { name: "app-routes" }
);