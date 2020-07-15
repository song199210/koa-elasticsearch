module.exports = {
    log4jsConfig:{
        replaceConsole: true,
        pm2: true,
        appenders: {
            http: {  //http请求转发日志
                type: 'dateFile',
                filename: 'logs/http_log/http',
                pattern: 'yyyy-MM-dd.log',
                alwaysIncludePattern: true
            },
            res: {  //响应转发日志
                type: 'dateFile',    //指定日志文件按时间打印
                filename: 'logs/res_log/http',  //指定输出文件路径
                pattern: 'yyyy-MM-dd.log',
                alwaysIncludePattern: true
            },
            err: {  //错误日志
                type: 'dateFile',
                filename: 'logs/err_log/err',
                pattern: 'yyyy-MM-dd.log',
                alwaysIncludePattern: true
            }
        },
        categories: {
            default: {
                appenders: ['http'], level: 'all'
            },
            resLogger: {
                appenders: ['res'], level: 'info'
            },
            errorLogger: {
                appenders: ['err'], level: 'error'
            },
            http: {
                appenders: ['http'], level: 'info'
            }
        },
    },
    esConfig:{
        host:"",
        port:"",
        log: false
    }
}