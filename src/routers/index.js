const Router = require("koa-router");
const TestContro = require("../controllers/TestController.js");


const router = new Router();
TestContro.testApi(router);
TestContro.testEsService(router);
module.exports = router;