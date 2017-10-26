/**
 * Created by lzc on 2017/10/26.
 */
class PersonService {
    constructor () {
        let PersonDao = require('../dao/PersonDao');
        this.personDao = new PersonDao();
    }
    
    getPersonInfoById (id, sCallback, fCallback) {
        return this.personDao.getPersonInfoById(id, sCallback, fCallback);
    }

    addPerson (name, sCallback, fCallback) {
        return this.personDao.addPerson(name, sCallback, fCallback);
    }

    updatePerson (id, name, sCallback, fCallback) {
        return this.personDao.updatePerson(id, name, sCallback, fCallback);
    }
    
    deletePerson (id, sCallback, fCallback) {
        return this.personDao.deletePerson(id, sCallback, fCallback);
    }
}

module.exports = PersonService;