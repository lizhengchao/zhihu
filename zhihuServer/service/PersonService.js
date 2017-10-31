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
    
    getPersonInfoById (id, callback) {
        return this.personDao.getPersonInfoById(id, callback);
    }

    getPersonInfoByPhoneNumber(phoneNumber, callback) {
        return this.personDao.getPersonByPhoneNumber(phoneNumber, callback);
    }

    register (person, callback) {
        let {name, phoneNumber, password} = person;
        if(!vaildatUtil.isPhoneNumber(phoneNumber)) {
            callback(new ResultData(ErrorCode[20002], ErrorCode[20002].type, null));
            return;
        }
        if(password.length < 6) {
            callback(new ResultData(ErrorCode[20003], ErrorCode[20003].type, null));
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

    updatePerson (id, name, sCallback, fCallback) {
        return this.personDao.updatePerson(id, name, sCallback, fCallback);
    }
    
    deletePerson (id, sCallback, fCallback) {
        return this.personDao.deletePerson(id, sCallback, fCallback);
    }

    passwordLogin (userId, password, verCodeId, verCodeNumeric, sCallback, fCallback) {
        this.verificationCodeService.verificationCode(verCodeId, verCodeNumeric, ()=> {
            this.getPersonInfoById(userId, (person)=> {
                if(person.password === password) {
                    sCallback();
                } else {
                    fCallback('密码错误');
                }
            }, fCallback);
        }, fCallback);
    }
}

module.exports = PersonService;