/**
 * Created by lzc on 2017/11/10.
 */
var {ErrorCode, ResultData} = require(getPath('extra/ResponseData'));

class QuestionService {
    constructor () {
        let QuestionDao = require(getPath('dao/QuestionDao'));
        this.questionDao = new QuestionDao();
    }

    getQuestionById (id, callback) {
        return this.questionDao.getQuestionById(id, callback);
    }

    addQuestion (question, callback) {
        this.questionDao.addQuestion(question, callback);
    }

    updateQuestion (question, callback) {
        return this.questionDao.updateQuestion(question, callback);
    }

    deleteQuestion (id, callback) {
        return this.questionDao.deleteQuestion(id, callback);
    }
}

module.exports = QuestionService;