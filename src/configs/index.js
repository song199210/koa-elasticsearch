//@ts-ignore
const log4js = require("log4js");
const DevConfig = require("./dev.js");
const ProdConfig = require("./prod.js");

const NODE_ENV = process.env.NODE_ENV?"develop":"production";
//@ts-ignore
const isDevEnv = NODE_ENV.trim() == "develop"?true:false;
const Config = isDevEnv?DevConfig:ProdConfig;

//将配置缓存在global全局变量中
if(Config == null){
    throw Error("环境配置错误!");
}else{
    // @ts-ignore
    global['config'] = Config;
}

log4js.configure(Config.log4jsConfig);

// 初始化日志系统
const httpLogger = log4js.getLogger('http');
const resLogger = log4js.getLogger('resLogger');
const errorLogger = log4js.getLogger('errorLogger');

let loggerUtil = {
    httpLogger,
    resLogger,
    errorLogger,
};
if(isDevEnv){
    const consoleLogger = log4js.getLogger();
    //@ts-ignore
    loggerUtil['consoleLogger'] = consoleLogger;
}

module.exports = loggerUtil;