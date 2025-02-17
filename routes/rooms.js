const fp = require("fastify-plugin");
module.exports = fp(
    async function (appInstance) {
        //#region Rooms
        //get chat rooms list by room id
        appInstance.get("/api/rooms", { }, async function (req, rep) {
            try {
                const data = await this.db("chat_rooms").select("*");
                return rep.code(200).send({
                    status: "LOADED",
                    statusCode: 200,
                    message: "Room Data Feched",
                    payload: {
                        data
                    },
                });
            } catch (error) {
                return error;
            }
        });

        //get room by id
        appInstance.get("/api/room/:roomId", { preHandler: [appInstance.authenticate] }, async function (req, rep) {
            try {
                const params = req.params;
                const room = await this.db("chat_rooms").select("*").where({ id: params.roomId }).first();
                if (!room) {
                    return rep.code(404).send({
                        status: "Error",
                        statusCode: 404,
                        message: "Room Data Not Found",
                        payload: {
                            room: room ? room : {},
                        },
                    });
                }
                return rep.code(201).send({
                    status: "Success",
                    statusCode: 200,
                    message: "Room Data Feched",
                    payload: {
                        room: room ? room : {},
                    },
                });
            } catch (error) {
                return error;
            }
        });

        //Create chat room by room id
        appInstance.post("/api/room/create", { preHandler: [appInstance.authenticateAdmin] }, async function (req, rep) {
            try {
                const { name, admin_id } = req.body;
                const [roomId] = await this.db("chat_rooms").insert({ name, admin_id });
                const room = await this.db("chat_rooms").select("*").where({ id: admin_id });
                return rep.code(201).send({
                    status: "CREATED",
                    statusCode: 201,
                    message: "Room POST DATA",
                    payload: {
                        roomId,
                        room,
                    },
                });
            } catch (error) {
                return error;
            }
        });

        appInstance.put("/api/room/update/:roomId", { preHandler: [appInstance.authenticateAdmin] }, async function (req, rep) {
            try {
                const params = req.params; //  parameters url
                const { roomId } = req.params; // room id under parameters
                const { name, admin_id } = req.body; // request body [data sended by url post]
                let room = {};
                const roomExist = await this.db("chat_rooms")
                    .select("*")
                    .where({ id: roomId })
                    .first(); // check if user exist in database
                if (!roomExist) {
                    return rep.code(200).send({
                        status: "DATA_NOT_FOUND",
                        statusCode: 404,
                        message: "No Room Data",
                        payload: {
                            params,
                            room,
                        },
                    });
                }
                const result = await this.db("chat_rooms")
                    .update({ name: name, admin_id: admin_id, updated_at: this.db.fn.now() })
                    .where({ id: roomId }); // update room row in database
                if (result) {
                    room = await this.db("chat_rooms")
                        .select("*")
                        .where({ id: roomId })
                        .first();
                }
                return rep.code(200).send({
                    status: "UPDATED",
                    statusCode: 200,
                    message: "Room PUT DATA",
                    payload: {
                        params,
                        room,
                    },
                });
            } catch (error) {
                return error;
            }
        });
        //Delete room by roomId
        appInstance.delete("/api/room/delete/:roomId", { preHandler: [appInstance.authenticateAdmin] }, async function (req, rep) {
            const params = req.params;
            const { roomId } = params;
            const roomExist = await this.db("chat_rooms")
                .select("*")
                .where({ id: roomId })
                .first();
            if (!roomExist) {
                return rep.code(200).send({
                    status: "DATA_NOT_FOUND",
                    statusCode: 200,
                    message: "FAILD On Delete Room Data",
                    payload: {
                        params,
                    },
                });
            }

            await this.db("chat_rooms").del().where({
                id: roomId,
            });
            return rep.code(200).send({
                status: "DELETED",
                statusCode: 200,
                message: "Delete Room Data",
                payload: {
                    params,
                },
            });
        });

        appInstance.get("/api/chats/:roomId", {}, async function (req, rep) {
          try {
            const params = req.params;
            const { roomId } = params;
            const room = await this.db("chat_rooms")
              .select("*")
              .where({ id: roomId })
              .first();

            const chats = await this.db("messages").select("*").where({ room_id: roomId })
            return rep.code(201).send({
              status: "LOADED",
              statusCode: 201,
              message: "Room GET DATA",
              payload: {
                params,
                data: chats,
              },
            });
          } catch (error) {
            return error;
          }
        });

        //#endregion Rooms
    },
    { name: "app-routes" }
);
