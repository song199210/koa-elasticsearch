const ResBodyEntry = require("../entrys/ResBodyEntry");

const ESearchService = require("./ESearchService");
const {formatMsgData, getDateTimes} = require("../utils");

class TestService {
    constructor() {
        this.resbody = new ResBodyEntry();
        this.client = new ESearchService();
    }
    async getInfoService() {
        const options = {
            index: 'test-saas',
            type: '_doc',
            body: {
                "sort": [
                    {
                        "@timestamp": {
                            "order": "desc"
                        }
                    }
                ],
                "size": 10000,
                "query": {
                    "match_phrase": {
                        "message": "device/status"
                    }
                }
            }
        };
        const result = await this.client.searchResult(options);
        const hits = result['hits']['hits'];
        let datas = [];
        if(hits.length > 0){
            const msg = hits[0]['_source']['message'];
            if(msg.indexOf("=[{") != -1){
                datas = formatMsgData(msg,"=[{");
            }
        }
        this.resbody.data = datas;
        return this.resbody;
    }
}
module.exports = TestService;