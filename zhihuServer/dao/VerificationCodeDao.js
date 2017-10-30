/**
 * Created by lzc on 2017/10/30.
 */
const baseDao = require('./baseDao'),
    Sequelize = require('sequelize');

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

    getVerificationCodeById (id, sCallback, fCallback) {
        let verificationCode = this.verificationCode;

        verificationCode.findById(id).then((p) => {
            sCallback && sCallback(p);
        }).catch((err) => {
            fCallback && fCallback(err);
        })
    }

    addVerificationCode (numeric, sCallback, fCallback) {
        let verificationCode = this.verificationCode;

        verificationCode.create({
            numeric: numeric,
            'create_time': new Date(),
            'modify_time': new Date()
        }).then((v) => {
            console.info('created: ' + JSON.stringify(v));
            sCallback && sCallback(v);
        }).catch((err) => {
            console.info('create fail, err:' + err);
            fCallback && fCallback(err);
        })
    }

    deleteVerificationCode (id, sCallback, fCallback) {
        let verificationCode = this.verificationCode;

        verificationCode.findById(id).then(verificationCode => {
            verificationCode.destroy().then(() => {
                sCallback && sCallback();
            }).catch(err => {
                fCallback && fCallback(err);
            })
        }).catch(err => {
            fCallback && fCallback(err);
        })
    }
}

module.exports = VerificationCodeDao;