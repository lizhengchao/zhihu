/**
 * Created by lzc on 2017/11/1.
 */
let {ErrorCode, ResultData} = require(getPath('extra/ResponseData'));

class PhoneVerifyCodeService {
    constructor () {
        let PhoneVerifyCodeDao = require(getPath('dao/PhoneVerifyCodeDao'));
        let PersonDao = require(getPath('dao/PersonDao'));
        this.phoneVerifyCodeDao = new PhoneVerifyCodeDao();
        this.personDao = new PersonDao();
    }

    getPhoneVerifyCodeById (id, callback) {
        return this.phoneVerifyCodeDao.getPhoneVerifyCodeById(id, callback);
    }

    addPhoneVerifyCode (phoneNumber, code, callback) {
        return this.phoneVerifyCodeDao.addPhoneVerifyCode(phoneNumber, code, callback);
    }

    deletePhoneVerifyCode (id, callback) {
        return this.phoneVerifyCodeDao.deletePhoneVerifyCode(id, callback);
    }

    sendPhoneVerifyCode (phoneNumber, callback) {
        var code = parseInt(Math.random()*1000000); //生成6位短信验证码
        
        this.addPhoneVerifyCode(phoneNumber, code, (resultData) => {
            if(resultData.errcode !== ErrorCode[0]) {
                callback(resultData);
            } else {
                //TODO: 先插表，再真正的发短信
                callback(new ResultData(ErrorCode[0], null, null));
            }
        })
    }

    verificationPhoneCode (phoneNumber, code, callback) {
        this.phoneVerifyCodeDao.getPhoneVerifyCodeByPhoneAndCode(phoneNumber, code,(resultData) => {
            if(resultData.errcode !== ErrorCode[0]) {
                callback(new ResultData(resultData.errcode, '短信验证码错误', null));
            } else {
                var phoneVerifyCodes = resultData.data,
                    now = new Date().getTime();
                for(let i=0; i< phoneVerifyCodes.length; i++) {
                    if(now - phoneVerifyCodes[i]['create_time'].getTime() <= 3*60*1000) { //验证码有效时间3分钟
                        this.personDao.getPersonByPhoneNumber(phoneNumber, (resultData) => {
                            if(resultData.errcode === ErrorCode[0]) {
                                callback(new ResultData(ErrorCode[0], null, resultData.data.id));
                            } else {
                                callback(resultData);
                            }
                        });
                        return;
                    }
                }
                callback(new ResultData(ErrorCode[10008]))
            }
        })
    }
}

module.exports = PhoneVerifyCodeService;