const loggerUtil = require("../configs");


//获取跨域中间件
exports.cors = function () {
    return async (ctx,next)=>{
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', '*');
        await next();
    };
}


//报错系统中间件
exports.throwError = function () {
    return async (ctx,next) => {
        try{
            await next();
        }catch (err) {
            ctx.response.status = err.statusCode || err.status || 403;
            ctx.response.body = {
                flag: "error",
                status: ctx.response.status,
                msg: err.message
            };
            //记录报错日志
            loggerUtil.errorLogger.error("报错:"+err.toString());
        }
    }
}