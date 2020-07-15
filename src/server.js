const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
const {cors,throwError} = require("./middlewares");  //顺序在前面，因为设置了global变量

const Router = require("./routers");

const app = new Koa();

app.use(cors());
app.use(throwError());
app.use(BodyParser());
app.use(Router.routes()).use(Router.allowedMethods());


app.listen(3000,()=>{
  console.log('Server is running at http://localhost:3000；ENV is:'+process.env.NODE_ENV);
  console.log('Press CTRL-C to stop \n');
});