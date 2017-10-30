/**
 * Created by lzc on 2017/10/30.
 */
class ResponseData {
    constructor (errcode, msg, data) {
        let {code} = errcode;
        if(typeof code === 'undefined') {
            throw new Error ('invaild responseData');
        }
        if(code !== 0 && (typeof msg === 'undefined' || msg === '')) {
            throw new Error('invaild responseData');
        }

        if(code !== 0 && typeof msg === 'string') {
            data = null;
        }
        
        this.errcode = errcode;
        this.msg = msg;
        this.data = data;
        
    }

    buildStr () {
        let {errcode, msg, data} = this;
        return JSON.stringify({errcode: errcode.code, msg: msg, data: data});
    }
}

var ErrorCode = {
    0: {
        code: 0,
        type: '无异常'
    },
    10001: {
        code: 10001,
        type: '服务器查询异常'
    },
    10002: {
        code: 10002,
        type: '验证码错误'
    }
};

module.exports = {ResponseData, ErrorCode};