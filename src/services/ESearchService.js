const Elasticsearch = require("elasticsearch");

//读取环境配置ESConfig
// @ts-ignore
const ESConfig = global['config']['esConfig'];
const host = ESConfig['host'];
const port = ESConfig['port'];

/**
 * ESearchService封装
 * @param client elasticsearch客户端
 * @param HOST 服务器地址
 * @param POST 端口号
 **/
class ESearchService {
    constructor(){
        this.HOST = host;
        this.PORT = port;
        this.initClient();
    }
    //初始化Elasticsearch客户端
    initClient(){
        if(this.client == null){
            let esConfig = {
                host: `${this.HOST}:${this.PORT}`,
            };
            if(ESConfig['log']){
              esConfig['log'] = "trace";
            }
            this.client = new Elasticsearch.Client(esConfig);
        }
    }

    //获取Elasticsearch客户端
    getClient() {
        return this.client;
    }

    //调用Elasticsearch查询接口
    searchResult(options) {
        return this.client.search(options);
    }
}

module.exports = ESearchService;