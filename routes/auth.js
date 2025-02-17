const fp = require("fastify-plugin");
module.exports = fp(
  async function (appInstance) {
    //#region Auth
    appInstance.post(
      "/api/login",
      { preHandler: [appInstance.alreayAuth] },
      async function (req, rep) {
        try {
          const { email, password } = req.body;
          // Check if email/password are provided
          if (!email || !password) {
            return rep.code(400).send({
              status: "BAD_REQUEST",
              statusCode: 400,
              message: "Email and password are required",
            });
          }
          const user = await this.db("users")
            .select("*")
            .where({ email: email, password: password })
            .first();
          if (!user) {
            return rep.code(401).send({
              status: "UNAUTHORIZED",
              statusCode: 401,
              message: "Invalid credentials",
            });
          }
          const token = appInstance.jwt.sign({
            userId: user.id,
            email: user.email,
            role: user.role,
          }); // Generate JWT based on email password and role {admin , user}
          return rep.code(200).send({
            status: "SUCCESS",
            statusCode: 200,
            message: "Login successful",
            payload: {
              user: {
                id: user.id,
                email: user.email,
                role: user.role,
              },
              token,
            },
          });
        } catch (error) {
          appInstance.log.error(error);
          // Send a proper error response
          return rep.code(500).send({
            status: "INTERNAL_SERVER_ERROR",
            statusCode: 500,
            message: "Something went wrong",
          });
        }
      }
    );
    //post user data
    appInstance.post(
      "/api/register",
      { preHandler: [appInstance.alreayAuth] },
      async function (req, rep) {
        try {
          const { name, email, password } = req.body;
          const userExist = await this.db("users")
            .select("*")
            .where({ email: email })
            .first();
          if (userExist) {
            return rep.code(201).send({
              status: "EXIST",
              statusCode: 201,
              message: "The email you entred exist on our records , try login!",
              payload: {
                userExist,
              },
            });
          }
          const [userId] = await this.db("users").insert({
            name,
            email,
            password,
          });
          const user = await this.db("users").select("*").where({ id: userId });
          const token = appInstance.jwt.sign({
            userId: user.id,
            email: user.email,
            role: user.role,
          }); // Generate JWT based on email password and role {admin , user}
          return rep.code(201).send({
            status: "Regisered",
            statusCode: 201,
            message: "User Registered Successfuly",
            payload: {
              user,
              token,
            },
          });
        } catch (error) {
          return error;
        }
      }
    );
    //#endregion Auth
  },
  { name: "app-routes" }
);
