/**
 * Created by lzc on 2017/11/1.
 */
/**
 * Created by lzc on 2017/10/30.
 */
const baseDao = require('./baseDao'),
    Sequelize = require('sequelize'),
    {ErrorCode, ResultData} = require(getPath('extra/ResponseData'));

class PhoneVerifyCodeDao extends baseDao {
    constructor () {
        super();
        let sequelize = this.sequelize,
            PhoneVerifyCode = sequelize.define('PhoneVerifyCode', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                'phone_number': Sequelize.STRING(31),
                code: Sequelize.STRING(15),
                'create_time': Sequelize.DATE,
                'modify_time': Sequelize.DATE
            }, {
                timestamps: false,
                freezeTableName: true,
                tableName: 'phoneverifycode'
            });
        this.phoneVerifyCode = PhoneVerifyCode;
    }

    getPhoneVerifyCodeByPhoneAndCode (phoneNumber, code, callback) {
        this.phoneVerifyCode.findAll({
            where: {
                'phone_number': phoneNumber,
                code: code
            }
        }).then((phoneVerifyCodes)=>{
            if(phoneVerifyCodes.length === 0) {
                callback(new ResultData(ErrorCode[10004], '不存在对应的短信验证码', null));
                return;
            }
            callback(new ResultData(ErrorCode[0], null, phoneVerifyCodes));
        }).catch((err) => {
            callback(new ResultData(ErrorCode[10001], err, null))
        })
    }

    getPhoneVerifyCodeById (id, callback) {
        let phoneVerifyCode = this.phoneVerifyCode;

        phoneVerifyCode.findById(id).then((p) => {
            if(p == null) {
                callback(new ResultData(ErrorCode[10004], '不存在id为'+id+'的短信验证码', null));
                return;
            }
            callback(new ResultData(ErrorCode[0], null, p));
        }).catch((err) => {
            callback(new ResultData(ErrorCode[10001], err, null))
        })
    }

    addPhoneVerifyCode (phoneNumber, code, callback) {
        let phoneVerifyCode = this.phoneVerifyCode;

        phoneVerifyCode.create({
            'phone_number': phoneNumber,
            code: code,
            'create_time': new Date(),
            'modify_time': new Date()
        }).then((v) => {
            console.info('created: ' + JSON.stringify(v));
            callback(new ResultData(ErrorCode[0], null, v));
        }).catch((err) => {
            console.info('create fail, err:' + err);
            callback(new ResultData(ErrorCode[10001], err, null))
        })
    }

    deletePhoneVerifyCode (id, callback) {
        let phoneVerifyCode = this.phoneVerifyCode;

        phoneVerifyCode.findById(id).then(p => {
            if(p == null) {
                callback(new ResultData(ErrorCode[10004], '不存在id为'+id+'的短信验证码', null));
                return;
            }
            p.destroy().then(() => {
                callback(new ResultData(ErrorCode[0], null, null));
            }).catch(err => {
                callback(new ResultData(ErrorCode[10001], err, null))
            })
        }).catch(err => {
            callback(new ResultData(ErrorCode[10001], err, null))
        })
    }
}

module.exports = PhoneVerifyCodeDao;