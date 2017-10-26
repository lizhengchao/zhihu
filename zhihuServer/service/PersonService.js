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
}

module.exports = PersonService;