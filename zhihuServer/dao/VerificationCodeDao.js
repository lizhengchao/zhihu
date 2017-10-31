/**
 * Created by lzc on 2017/10/30.
 */
const baseDao = require('./baseDao'),
    Sequelize = require('sequelize'),
    {ErrorCode, ResultData} = require(getPath('extra/ResponseData'));

class VerificationCodeDao extends baseDao {
    constructor () {
        super();
        let sequelize = this.sequelize,
            VerificationCode = sequelize.define('VerificationCode', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                numeric: Sequelize.INTEGER,
                'create_time': Sequelize.DATE,
                'modify_time': Sequelize.DATE
            }, {
                timestamps: false,
                freezeTableName: true,
                tableName: 'verificationcode'
            });
        this.verificationCode = VerificationCode;
    }

    getVerificationCodeById (id, callback) {
        let verificationCode = this.verificationCode;

        verificationCode.findById(id).then((p) => {
            if(p == null) {
                callback(new ResultData(ErrorCode[10004], '不存在id为'+id+'的验证码', null));
                return;
            }
            callback(new ResultData(ErrorCode[0], null, p));
        }).catch((err) => {
            callback(new ResultData(ErrorCode[10001], err, null))
        })
    }

    addVerificationCode (numeric, callback) {
        let verificationCode = this.verificationCode;

        verificationCode.create({
            numeric: numeric,
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

    deleteVerificationCode (id, callback) {
        let verificationCode = this.verificationCode;

        verificationCode.findById(id).then(verificationCode => {
            if(verificationCode == null) {
                callback(new ResultData(ErrorCode[10004], '不存在id为'+id+'的验证码', null));
                return;
            }
            verificationCode.destroy().then(() => {
                callback(new ResultData(ErrorCode[0], null, null));
            }).catch(err => {
                callback(new ResultData(ErrorCode[10001], err, null))
            })
        }).catch(err => {
            callback(new ResultData(ErrorCode[10001], err, null))
        })
    }
}

module.exports = VerificationCodeDao;