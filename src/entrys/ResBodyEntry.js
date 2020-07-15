/**
 * ResBodyEntry实体类
 * @param flag 请求状态
 * @param msg 请求信息
 * @param data 请求返回的信息
 **/
class ResBodyEntry {
    _flag;
    _msg;
    _data;
    _status;

    constructor(flag = "success",msg = "",data = null, status = 200){
        this._flag = flag;
        this._msg = msg;
        this._data = data;
        this._status = status;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get flag() {
        return this._flag;
    }

    set flag(value) {
        this._flag = value;
    }

    get msg() {
        return this._msg;
    }

    set msg(value) {
        this._msg = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    toJson() {
        const obj = {
            flag:this._flag,
            msg:this._msg,
            data:this._data
        };
        return obj;
    }

    getObject() {
        return this;
    }
}
module.exports = ResBodyEntry;