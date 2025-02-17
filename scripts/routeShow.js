const app = require('../app');
app.ready().then(() => {
    console.log("========Show Routes========");
    console.log(app.printRoutes());
},
    (error) => { console.error("show routes error : ", error); }
)