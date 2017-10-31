/**
 * Created by lzc on 2017/10/26.
 */
const baseDao = require('./baseDao'),
    Sequelize = require('sequelize'),
    {ErrorCode, ResultData} = require(getPath('extra/ResponseData'));

class PersonDao extends baseDao {
    constructor () {
        super();
        let sequelize = this.sequelize,
            PersonSeq = sequelize.define('Person', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: Sequelize.STRING,
                password: Sequelize.STRING,
                'phone_number': Sequelize.STRING(31),
                'create_time': Sequelize.DATE,
                'modify_time': Sequelize.DATE,
                'is_delete': Sequelize.STRING(1)
            }, {
                timestamps: false,
                freezeTableName: true,
                tableName: 'Person'
            });
        this.personSeq = PersonSeq;
    }
    
    getPersonInfoById (id, callback) {
        let personSeq = this.personSeq;

        personSeq.findById(id).then((p) => {
            if(p == null) {
                callback(new ResultData(ErrorCode[10004], '不存在id为'+id+'的用户', null));
                return;
            }
            if(p['is_delete'] === '1') {
                callback(new ResultData(ErrorCode[10005], '不存在id为'+id+'的用户'));
                return;
            }
            callback(new ResultData(ErrorCode[0], null, p));
        }).catch((err) => {
            callback(new ResultData(ErrorCode[10001], err, null));
        })
    }

    getPersonByPhoneNumber (phoneNumber, callback) {
        this.personSeq.findAll({where: {'phone_number': phoneNumber}}).then((p) => {
            if(p == null) {
                callback(new ResultData(ErrorCode[10004], '不存在手机号为'+phoneNumber+'的用户', null));
            }
            for(let i=0; i<p.length; i++) {
                if(p[i]['is_delete'] != '1') {
                    callback(new ResultData(ErrorCode[0], null, p[i]));       
                    return;
                }
            }
            callback(new ResultData(ErrorCode[10005],  '不存在手机号为'+phoneNumber+'的用户', null));
        }).catch((err) => {
            callback(new ResultData(ErrorCode[10001], err, null));
        })
    }

    addPerson (person, callback) {
        let personSeq = this.personSeq;

        personSeq.create({
            name: person.name,
            password: person.password,
            'phone_number': person.phoneNumber,
            'create_time': new Date(),
            'modify_time': new Date()
        }).then((p) => {
            callback(new ResultData(ErrorCode[0], null, p));
        }).catch((err) => {
            console.error('create person fail, err:' + err);
            callback(new ResultData(ErrorCode[10001], err, null));
        })
    }
    
    updatePerson (person, callback) {
        let personSeq = this.personSeq;

        personSeq.findById(person.id).then(p => {
            if(p == null) {
                callback(new ResultData(ErrorCode[10004], '不存在id为'+person.id+'的用户', null));
                return;
            }
            if(person['is_delete'] === '1') {
                callback(new ResultData(ErrorCode[10005],  '不存在id为'+person.id+'的用户', null));
            }
            p.name= person.name;
            p['modify_time'] = new Date();
            person.save().then(pp => {
                callback(new ResultData(ErrorCode[0], null, pp));
            }).catch(err => {
                callback(new ResultData(ErrorCode[10001], err, null));
            })
        }).catch(err => {
            callback(new ResultData(ErrorCode[10001], err, null));
        })
    }
    
    deletePerson (id, callback) {
        let personSeq = this.personSeq;

        personSeq.findById(id).then(person => {
            if(p == null) {
                callback(new ResultData(ErrorCode[10004], '不存在id为'+id+'的用户', null));
                return;
            }
            if(person['is_delete'] === '1') {
                callback(new ResultData(ErrorCode[10005], '不存在id为'+id+'的用户'));
            }
            person['is_delete']= 1;
            person['modify_time'] = new Date();
            person.save().then(person => {
                callback(new ResultData(ErrorCode[0], null, person));
            }).catch(err => {
                callback(new ResultData(ErrorCode[10001], err, null));
            })
        }).catch(err => {
            callback(new ResultData(ErrorCode[10001], err, null));
        })

        //真删除，改为假删除
        // person.findById(id).then(person => {
        //     person.destroy().then(() => {
        //         sCallback && sCallback();
        //     }).catch(err => {
        //         fCallback && fCallback(err);
        //     })
        // }).catch(err => {
        //     fCallback && fCallback(err);
        // })
    }
}

module.exports = PersonDao;