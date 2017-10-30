/**
 * Created by lzc on 2017/10/30.
 */
class VerificationCodeService {
    constructor () {
        let VerificationCodeDao = require('../dao/VerificationCodeDao');
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
}

module.exports = VerificationCodeService;