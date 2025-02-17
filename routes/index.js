const fp = require("fastify-plugin");
module.exports = fp(
  async function (appInstance) {
    appInstance.get("/", {}, async function () {
      return {
        app: "server is running at http://localhost:3010",
      };
    });
  },
  { name: "app-routes" }
);
