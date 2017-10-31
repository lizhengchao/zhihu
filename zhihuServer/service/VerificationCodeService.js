/**
 * Created by lzc on 2017/10/30.
 */
class VerificationCodeService {
    constructor () {
        let VerificationCodeDao = require(getPath('dao/VerificationCodeDao'));
        this.verificationCodeDao = new VerificationCodeDao();
    }

    getVerificationCodeById (id, sCallback, fCallback) {
        return this.verificationCodeDao.getVerificationCodeById(id, sCallback, fCallback);
    }

    addVerificationCode (numeric, sCallback, fCallback) {
        return this.verificationCodeDao.addVerificationCode(numeric, sCallback, fCallback);
    }

    deleteVerificationCode (id, sCallback, fCallback) {
        return this.verificationCodeDao.deleteVerificationCode(id, sCallback, fCallback);
    }
    
    verificationCode (id, numeric, sCallback, fCallback) {
        this.verificationCodeDao.getVerificationCodeById(id, (verificationCode) => {
            if(verificationCode.numeric === parseInt(numeric)) {
                sCallback();
            } else {
                fCallback('验证码错误');
            }
        }, fCallback);
    }
}

module.exports = VerificationCodeService;