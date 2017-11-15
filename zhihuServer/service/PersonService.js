/**
 * Created by lzc on 2017/10/26.
 */

var vaildatUtil = require(getPath('extra/utils')).vaildatUtil,
    {ErrorCode, ResultData} = require(getPath('extra/ResponseData'));

class PersonService {
    constructor () {
        let PersonDao = require(getPath('dao/PersonDao'));
        this.personDao = new PersonDao();
        let VerificationCodeService = require('./VerificationCodeService');
        this.verificationCodeService = new VerificationCodeService();
    }
    
    getPersonInfoById (id) {
        return this.personDao.getPersonInfoById(id);
    }

    getPersonInfoByPhoneNumber(phoneNumber, callback) {
        return this.personDao.getPersonByPhoneNumber(phoneNumber, callback);
    }

    register (person, callback) {
        let {phoneNumber, password} = person;
        if(!vaildatUtil.isPhoneNumber(phoneNumber)) {
            callback(new ResultData(ErrorCode[20002]));
            return;
        }
        if(password.length < 6) {
            callback(new ResultData(ErrorCode[20003]));
            return;
        }
        this.getPersonInfoByPhoneNumber(phoneNumber, (resultData) => {
            if(resultData.errcode === ErrorCode[0]) {
                callback(new ResultData(ErrorCode[10006]));
            } else {
                this.personDao.addPerson(person, callback);
            }
        });
    }

    updatePerson (person, callback) {
        return this.personDao.updatePerson(person, callback);
    }
    
    deletePerson (id, callback) {
        return this.personDao.deletePerson(id, callback);
    }

    passwordLogin (userId, password, verCodeId, verCodeNumeric, callback) {
        this.verificationCodeService.verificationCode(verCodeId, verCodeNumeric, (resultData)=> {
            if(resultData.errcode !== ErrorCode[0]) {
                callback(resultData);
                return;
            }
            this.getPersonInfoByPhoneNumber(userId, (resultData) => {
                if(resultData.errcode !== ErrorCode[0]) {
                    callback(resultData);
                    return;
                }
                if(resultData.data.password == password) {
                    callback(new ResultData(ErrorCode[0], null, resultData.data.id))
                } else {
                    callback(new ResultData(ErrorCode[10007]));
                }
            });
        });
    }
}

module.exports = PersonService;