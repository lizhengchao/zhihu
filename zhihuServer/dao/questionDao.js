/**
 * Created by lzc on 2017/11/10.
 */
const baseDao = require('./baseDao'),
    Sequelize = require('sequelize'),
    {ErrorCode, ResultData} = require(getPath('extra/ResponseData'));

class QuestionDao extends baseDao {
    constructor () {
        super();
        let sequelize = this.sequelize,
            QuestionSeq = sequelize.define('Question', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                content: Sequelize.STRING,
                'person_id': Sequelize.INTEGER,
                'description': Sequelize.TEXT,
                'publish_time': Sequelize.DATE,
                'create_time': Sequelize.DATE,
                'modify_time': Sequelize.DATE,
                'is_delete': Sequelize.INTEGER
            }, {
                timestamps: false,
                freezeTableName: true,
                tableName: 'question'
            });
        this.questionSeq = QuestionSeq;
    }

    getQuestionById (id, callback) {
        let questionSeq = this.questionSeq;

        questionSeq.findById(id).then((q) => {
            if(q == null) {
                callback(new ResultData(ErrorCode[10004], '不存在id为'+id+'的问题', null));
                return;
            }
            if (q['is_delete'] == 1) {
                callback(new ResultData(ErrorCode[10005], '不存在id为'+id+'的问题', null));
                return;
            }
            callback(new ResultData(ErrorCode[0], null, q));
        }).catch((err) => {
            callback(new ResultData(ErrorCode[10001], err.message, null));
        })
    }

    addQuestion (question, callback) {
        let questionSeq = this.questionSeq;

        questionSeq.create({
            content: question.content,
            'person_id': question.personId,
            'description': question.description,
            'publish_time': question.publishTime,
            'create_time': new Date(),
            'modify_time': new Date()
        }).then((p) => {
            callback(new ResultData(ErrorCode[0], null, p));
        }).catch((err) => {
            console.error('create question fail, err:' + err.message);
            callback(new ResultData(ErrorCode[10001], err.message, null));
        })
    }

    updateQuestion (question, callback) {
        let questionSeq = this.questionSeq;

        questionSeq.findById(question.id).then(q => {
            if(q == null) {
                callback(new ResultData(ErrorCode[10004], '不存在id为'+question.id+'的问题', null));
                return;
            }
            if (q['is_delete'] == 1) {
                callback(new ResultData(ErrorCode[10005], '不存在id为'+question.id+'的问题', null));
                return;
            }
            if(question.content) { q.content = question.content;}
            if(question.description) {q.description = question.description;}
            q['modify_time'] = new Date();
            q.save().then(pp => {
                callback(new ResultData(ErrorCode[0], null, pp));
            }).catch(err => {
                callback(new ResultData(ErrorCode[10001], err.message, null));
            })
        }).catch(err => {
            callback(new ResultData(ErrorCode[10001], err.message, null));
        })
    }

    deleteQuestion (id, callback) {
        let questionSeq = this.questionSeq;

        questionSeq.findById(id).then(q => {
            if(q == null) {
                callback(new ResultData(ErrorCode[10004], '不存在id为'+id+'的问题', null));
                return;
            }
            q['is_delete'] = 1;
            q['modify_time'] = new Date();
            q.save().then(person => {
                callback(new ResultData(ErrorCode[0], null, null));
            }).catch(err => {
                callback(new ResultData(ErrorCode[10001], err.message, null));
            })
        }).catch(err => {
            callback(new ResultData(ErrorCode[10001], err.message, null));
        })
    }
}

module.exports = QuestionDao;