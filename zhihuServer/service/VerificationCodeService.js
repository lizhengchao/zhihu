/**
 * Created by lzc on 2017/10/30.
 */
let {ErrorCode, ResultData} = require(getPath('extra/ResponseData'));
    
class VerificationCodeService {
    constructor () {
        let VerificationCodeDao = require(getPath('dao/VerificationCodeDao'));
        this.verificationCodeDao = new VerificationCodeDao();
    }

    getVerificationCodeById (id, callback) {
        return this.verificationCodeDao.getVerificationCodeById(id, callback);
    }

    addVerificationCode (numeric, callback) {
        return this.verificationCodeDao.addVerificationCode(numeric, callback);
    }

    deleteVerificationCode (id, callback) {
        return this.verificationCodeDao.deleteVerificationCode(id, callback);
    }
    
    verificationCode (id, numeric, callback) {
        this.verificationCodeDao.getVerificationCodeById(id, (resultData) => {
            if(resultData.errcode !== ErrorCode[0]) {
                callback(resultData);
            } else if(resultData.data.numeric === parseInt(numeric)) {
                callback(new ResultData(ErrorCode[0], null, null));
            } else {
                callback(new ResultData(ErrorCode[10002]));
            }
        });
    }
}

module.exports = VerificationCodeService;