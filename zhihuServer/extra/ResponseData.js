/**
 * Created by lzc on 2017/10/30.
 */
class ResponseData {
    constructor (errcode, msg, data) {
        if(errcode.constructor === ResultData) {
            this.errcode = errcode.errcode;
            this.msg = errcode.msg;
            this.data = errcode.data;
            return;
        }

        let {code} = errcode;
        if(typeof code === 'undefined') {
            throw new Error ('invalid responseData params');
        }
        if(code !== 0 && (typeof msg === 'undefined' || msg === '')) {
            throw new Error('invalid responseData params');
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

/*服务内部使用的结果对象，对外暴露时需要转化为ResponseData*/
class ResultData {
    constructor (errcode, msg, data) {
        if(arguments.length === 1) {
            this.errcode = errcode;
            this.msg = errcode.type;
            this.data = null;
            return;
        }
        let {code} = errcode;
        if(typeof code === 'undefined') {
            throw new Error ('invalid ResultData params');
        }
        if(code !== 0 && (typeof msg === 'undefined' || msg === '')) {
            throw new Error('invalid ResultData params');
        }

        if(code !== 0 && typeof msg === 'string') {
            data = null;
        }

        this.errcode = errcode;
        this.msg = msg;
        this.data = data;
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
    }, 
    10003: {
        code: 10003,
        type: '登录失败'
    },
    10004: {
        code: 10004,
        type: '记录不存在'
    },
    10005: {
        code: 10005,
        type: '记录已删除'
    },
    10006: {
        code: 10006,
        type: '手机号重复'
    },
    10007: {
        code: 10007,
        type: '密码错误'
    },
    20001: { //2开头： 请求参数不符合接口规定
        code: 20001,
        type: '缺少参数'
    },
    20002: {
        code: 20002,
        type: '手机号格式错误'
    },
    20003: {
        code: 20003,
        type: '密码位数过短'
    }
};

module.exports = {ResponseData, ErrorCode, ResultData};