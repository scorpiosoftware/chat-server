const app = require('./app/index');
const {appHost,appPort} = require('./configs/app');
try{
    app.listen({host:appHost,port:appPort});
}catch (error){
    app.log.fatal(error);
    process.exit(1);
}