/**
 * Created by lzc on 2017/11/13.
 */
const baseDao = require('./baseDao'),
    Sequelize = require('sequelize'),
    {ErrorCode, ResultData, ErrorData} = require(getPath('extra/ResponseData'));

class AnswerDao extends baseDao {
    constructor () {
        super();
        let sequelize = this.sequelize,
            AnswerSeq = sequelize.define('Answer', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                content: Sequelize.STRING,
                'question_id': Sequelize.INTEGER,
                'answer_time': Sequelize.DATE,
                'answer_person_id': Sequelize.INTEGER,
                'create_time': Sequelize.DATE,
                'modify_time': Sequelize.DATE,
                'is_delete': Sequelize.INTEGER
            }, {
                timestamps: false,
                freezeTableName: true,
                tableName: 'answer'
            });
        this.answerSeq = AnswerSeq;
    }

    getAnswerById (id, callback) {
        let answerSeq = this.answerSeq;

        answerSeq.findById(id).then((q) => {
            if(q == null) {
                callback(new ResultData(ErrorCode[10004], '不存在id为'+id+'的回答', null));
                return;
            }
            if (q['is_delete'] == 1) {
                callback(new ResultData(ErrorCode[10005], '不存在id为'+id+'的回答', null));
                return;
            }
            callback(new ResultData(ErrorCode[0], null, q));
        }).catch((err) => {
            callback(new ResultData(ErrorCode[10001], err.message, null));
        })
    }

    // getAnswerListByPersonId (id, callback) {
    //     let answerSeq = this.answerSeq;
    //
    //     answerSeq.findAll({
    //         where: {
    //             'answer_person_id': id
    //         }
    //     }).then(answers => {
    //         callback(new ResultData(ErrorCode[0], null, answers));
    //     }).catch((err) => {
    //         callback(new ResultData(ErrorCode[10001], err.message, null));
    //     })
    // }

    //使用async实现
    async getAnswerListByPersonId (id) {
        try {
            var answers = await this.answerSeq.findAll({
                where: {
                    'answer_person_id': id
                }
            })
        } catch (err) {
            throw new ErrorData(ErrorCode[10001], err.message);
        }
        return answers;
    }

    addAnswer (answer, callback) {
        let answerSeq = this.answerSeq;

        answerSeq.create({
            content: answer.content,
            'question_id': answer.questionId,
            'answer_time': answer.answerTime,
            'answerPersonId': answer.answerPersonId,
            'create_time': new Date(),
            'modify_time': new Date()
        }).then((p) => {
            callback(new ResultData(ErrorCode[0], null, p));
        }).catch((err) => {
            console.error('create answer fail, err:' + err);
            callback(new ResultData(ErrorCode[10001], err.message, null));
        })
    }

    updateAnswer (answer, callback) {
        let answerSeq = this.answerSeq;

        answerSeq.findById(answer.id).then(q => {
            if(q == null) {
                callback(new ResultData(ErrorCode[10004], '不存在id为'+answer.id+'的回答', null));
                return;
            }
            if (q['is_delete'] == 1) {
                callback(new ResultData(ErrorCode[10005], '不存在id为'+answer.id+'的回答', null));
                return;
            }
            if(answer.content) { q.content = answer.content;}
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

    deleteAnswer (id, callback) {
        let answerSeq = this.answerSeq;

        answerSeq.findById(id).then(q => {
            if(q == null) {
                callback(new ResultData(ErrorCode[10004], '不存在id为'+id+'的回答', null));
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

module.exports = AnswerDao;