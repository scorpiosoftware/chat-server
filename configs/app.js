require('dotenv').config();

const aliasMode = {
    development:"development",
    dev:"development",
    test:"test",
    production:"production",
    prod:"production",
}

module.exports = {
    appMode : aliasMode[process.env.NODE_ENV] || "development",
    appHost : process.env.APP_HOST || "localhost",
    appPort : parseInt(process.env.APP_PORT) || 3010,
}