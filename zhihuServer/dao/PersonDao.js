/**
 * Created by lzc on 2017/10/26.
 */
const baseDao = require('./baseDao'),
    Sequelize = require('sequelize'),
    {ErrorCode, ResultData, ErrorData} = require(getPath('extra/ResponseData'));

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
                signword: Sequelize.STRING,
                headshot: Sequelize.STRING,
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
    
    async getPersonInfoById (id) {
        try {
            var p = await this.personSeq.findById(id);
        } catch (err) {
            throw new ErrorData(ErrorCode[10001], err.message);
        }
        if(p == null) {
            throw new ErrorData(ErrorCode[10004], '不存在id为'+id+'的用户');
        }
        if(p['is_delete'] === '1') {
            throw new ErrorData(ErrorCode[10005], '不存在id为'+id+'的用户');
        }
        return p;
    }

    getPersonByPhoneNumber (phoneNumber, callback) {
        this.personSeq.findAll({where: {'phone_number': phoneNumber}}).then((p) => {
            if(p == null) {
                callback(new ResultData(ErrorCode[10004], '不存在手机号为'+phoneNumber+'的用户', null));
                return;
            }
            for(let i=0; i<p.length; i++) {
                if(p[i]['is_delete'] != '1') {
                    callback(new ResultData(ErrorCode[0], null, p[i]));       
                    return;
                }
            }
            callback(new ResultData(ErrorCode[10005],  '不存在手机号为'+phoneNumber+'的用户', null));
        }).catch((err) => {
            callback(new ResultData(ErrorCode[10001], err.message, null));
        })
    }

    addPerson (person, callback) {
        let personSeq = this.personSeq;

        personSeq.create({
            name: person.name,
            password: person.password,
            'phone_number': person.phoneNumber,
            signword: person.signword,
            headshot: person.headshot,
            'create_time': new Date(),
            'modify_time': new Date()
        }).then((p) => {
            callback(new ResultData(ErrorCode[0], null, p));
        }).catch((err) => {
            console.error('create person fail, err:' + err);
            callback(new ResultData(ErrorCode[10001], err.message, null));
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
            if(person.name) p.name= person.name;
            if(person.signword) p.signword = person.signword;
            if(person.headshot) p.headshot = person.headshot;
            p['modify_time'] = new Date();
            p.save().then(pp => {
                callback(new ResultData(ErrorCode[0], null, pp));
            }).catch(err => {
                callback(new ResultData(ErrorCode[10001], err.message, null));
            })
        }).catch(err => {
            callback(new ResultData(ErrorCode[10001], err.message, null));
        })
    }
    
    deletePerson (id, callback) {
        let personSeq = this.personSeq;

        personSeq.findById(id).then(person => {
            if(person == null) {
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
                callback(new ResultData(ErrorCode[10001], err.message, null));
            })
        }).catch(err => {
            callback(new ResultData(ErrorCode[10001], err.message, null));
        })
    }
}

module.exports = PersonDao;