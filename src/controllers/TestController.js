const TestService = require("../services/TestService");
const ResBodyEntry = require("../entrys/ResBodyEntry");
const {formatDateTime} = require("../utils");
const loggerUtil = require("../configs");

/**
 * @author songxy
 * @datetime 2020-07-14
 * @desc 基础信息控制器
**/
const service = new TestService();
class TestController {
    static mainApi = "/testcontro";

    //测试接口是否能访问
    static testApi(router){
        router.get(`${this.mainApi}/testApi`,async (ctx,next)=>{
            const request = ctx.request;
            const response = ctx.response;
            response.set("Content-Type","text/html;charset=utf-8");
            response.body = `<h1>${this.mainApi}/testApi接口测试成功!</h1>`;
        });
    }
    
    static testEsService(router){
        router.get(`${this.mainApi}/testEsService`,async (ctx,next)=>{
            const request = ctx.request;
            const response = ctx.response;
            //获取参数并格式化参数
            const query = request.query;
            const resbody = await service.getInfoService(query['startDatetime'],query['endDatetime']);
            response.set("Content-Type","application/json;charset=utf-8");
            response.body = resbody.toJson();
        });
    }
}

module.exports = TestController;