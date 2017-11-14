/**
 * Created by lzc on 2017/11/13.
 */
var {ErrorCode, ResultData} = require(getPath('extra/ResponseData'));

class AnswerService {
    constructor () {
        let AnswerDao = require(getPath('dao/AnswerDao'));
        this.answerDao = new AnswerDao();
    }

    getAnswerById (id, callback) {
        return this.answerDao.getAnswerById(id, callback);
    }

    getAnswerListByPersonId (id) {
        return this.answerDao.getAnswerListByPersonId(id);
    }

    addAnswer (answer, callback) {
        this.answerDao.addAnswer(answer, callback);
    }

    updateAnswer (answer, callback) {
        return this.answerDao.updateAnswer(answer, callback);
    }

    deleteAnswer (id, callback) {
        return this.answerDao.deleteAnswer(id, callback);
    }
}

module.exports = AnswerService;