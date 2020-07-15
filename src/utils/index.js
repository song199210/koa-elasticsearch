//将时间对象Date格式化成字符串
const loggerUtil = require("../configs");

exports.formatDateTime = function (dateStr, fmt = "yyyy-MM-dd hh:mm:ss") {
    const date = new Date(dateStr);
    console.log(date);
    const o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            // @ts-ignore
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}
//累加天数计算
function addData(dateStr, days) {
    if(days == undefined) {
        days = 1;
    }
    var date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const mm = month.toString();
    const dd = day.toString();

    let monthStr = "";
    let dayStr = "";
    if(mm.length == 1) {
        monthStr = "0" + month;
    }else{
        monthStr = mm;
    }
    if(dd.length == 1) {
        dayStr = "0" + day;
    }else {
        dayStr = dd;
    }
    return  date.getFullYear() + "-" + monthStr + "-" + dayStr;
}
exports.addData = addData;
//计算开始时间和结束时间相差几天
function diffDays(startDtime,endDtime,days = 0) {
    const _startDate = new Date(startDtime);
    const _endDate = new Date(endDtime);
    const _date = _endDate.getTime() - (_startDate.getTime() - days*24*3600*1000);
    if(_date < 0){
        throw Error(`开始时间${startDtime}不能大于结束时间${endDtime}!`);
    }
    return Math.floor(_date / (24 * 3600 * 1000));
    // return Math.floor(_date / (60 * 1000));
}
exports.diffDays = diffDays;
//获取时间段各个时间数组
exports.getDateTimes = function (startDatetime,endDatetime,funs1 = diffDays,funs2 = addData) {
    const dayLen = funs1(startDatetime,endDatetime);
    let dates_arr = [];
    for(let i = 0;i < dayLen;i++){
        dates_arr.push(funs2(startDatetime,i+1));
    }
    return dates_arr;
}
//格式化获取数据Message字段
exports.formatMsgData = function(msg,fmt = "={") {
    if(!msg && typeof msg != "string"){
        throw Error("msg数据不存在!")
    }
    const arr = msg.split(fmt);
    if(arr.length == 0){
        throw Error("ES查询数据格式有误:"+msg);
    }
    return JSON.parse(`${fmt.replace("=","")}${arr[1]}`);
}
//将UTC转成北京时间
exports.convertUTCtoLocal = function(UTCDatetimeStr) {
    //判断是否是UTC时区
    const isUTC = /[0-9]?T(.+)(Z|z)$/.test(UTCDatetimeStr);
    //判断月/日/时/分是否+0
    let FZoreNum = function (num) {
        return num < 10?`0${num}`:num.toString();
    }
    let times = 0;
    if(isUTC){
        UTCDatetimeStr = UTCDatetimeStr.replace("T"," ");
        UTCDatetimeStr = UTCDatetimeStr.replace(/\.([0-9]{1,})(Z|z)$/,"");
    }
    const date = new Date(UTCDatetimeStr);
    const year = date.getFullYear();
    const month = FZoreNum(date.getMonth()+1);
    const day = FZoreNum(date.getDate());
    const hours = FZoreNum(date.getHours());
    const minutes = FZoreNum(date.getMinutes());
    const second = FZoreNum(date.getSeconds());
    FZoreNum = null;
    return `${year}-${month}-${day} ${hours}:${minutes}:${second}`;
}