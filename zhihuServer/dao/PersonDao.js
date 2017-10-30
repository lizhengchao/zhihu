/**
 * Created by lzc on 2017/10/26.
 */
const baseDao = require('./baseDao'),
    Sequelize = require('sequelize');

class PersonDao extends baseDao {
    constructor () {
        super();
        let sequelize = this.sequelize,
            Person = sequelize.define('Person', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: Sequelize.STRING,
                'create_time': Sequelize.DATE,
                'modify_time': Sequelize.DATE,
                'is_delete': Sequelize.STRING(1)
            }, {
                timestamps: false,
                freezeTableName: true,
                tableName: 'Person'
            });
        this.person = Person;
    }
    
    getPersonInfoById (id, sCallback, fCallback) {
        let person = this.person;

        person.findById(id).then((p) => {
            if(p['is_delete'] === '1') {
                fCallback && fCallback('this user has been delete');
                return;
            }
            sCallback && sCallback(p);
        }).catch((err) => {
            fCallback && fCallback(err);
        })
    }

    addPerson (name, sCallback, fCallback) {
        let person = this.person;

        person.create({
            name: name,
            'create_time': new Date(),
            'modify_time': new Date()
        }).then((p) => {
            console.info('created: ' + JSON.stringify(p));
            sCallback && sCallback(p);
        }).catch((err) => {
            console.info('create fail, err:' + err);
            fCallback && fCallback(err);
        })
    }
    
    updatePerson (id, name, sCallback, fCallback) {
        let person = this.person;

        person.findById(id).then(person => {
            if(person['is_delete'] === '1') {
                fCallback && fCallback('this user has been delete');
            }
            person.name= name;
            person['modify_time'] = new Date();
            person.save().then(person => {
                sCallback && sCallback(person);
            }).catch(err => {
                fCallback && fCallback(err);
            })
        }).catch(err => {
            fCallback && fCallback(err);
        })
    }
    
    deletePerson (id, sCallback, fCallback) {
        let person = this.person;

        person.findById(id).then(person => {
            person['is_delete']= 1;
            person['modify_time'] = new Date();
            person.save().then(person => {
                sCallback && sCallback(person);
            }).catch(err => {
                fCallback && fCallback(err);
            })
        }).catch(err => {
            fCallback && fCallback(err);
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