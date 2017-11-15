/**
 * Created by lzc on 2017/11/15.
 */
const baseDao = require('../baseDao'),
    Sequelize = require('sequelize'),
    {ErrorCode, ErrorData} = require(getPath('extra/ResponseData'));

class QuestionToTopicDao extends baseDao {
    constructor () {
        super();
        let sequelize = this.sequelize,
            QuestionToTopicSeq = sequelize.define('QuestionToTopic', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                'question_id': Sequelize.INTEGER,
                'topic_id': Sequelize.INTEGER,
                'create_time': Sequelize.DATE,
                'modify_time': Sequelize.DATE,
            }, {
                timestamps: false,
                freezeTableName: true,
                tableName: 'questiontotopic'
            });
        this.questionToTopicSeq = QuestionToTopicSeq;
    }

    async getByQuestionId (id) {
        try {
            var topics = await this.questionToTopicSeq.findAll({
                where: {
                    'question_id': id
                }
            });
        } catch (err) {
            throw new ErrorData(ErrorCode[10001], err.message);
        }
        return topics;
    }
    
    async getByTopicId (id) {
        try {
            var questions = await this.questionToTopicSeq.findAll({
                where: {
                    'topic_id': id
                }
            });
        } catch (err) {
            throw new ErrorData(ErrorCode[10001], err.message);
        }
        return questions;
    }

    async addQuestionToTopic (questionToTopic) {
        try {
            questionToTopic = await this.topicSeq.create({
                'question_id': questionToTopic.questionId,
                'topic_id': questionToTopic.topicId,
                'create_time': new Date(),
                'modify_time': new Date()
            })
        } catch (err) {
            throw new ErrorData(ErrorCode[10001], err.message);
        }
        return questionToTopic;
    }

    async deleteQuestionToTopic (topicId, questionId) {
        try {
            var questionToTopics = await this.topicSeq.findAll({
                where: {
                    'topic_id': topicId,
                    'question_id': questionId
                }
            });
            for(let questionToTopic of questionToTopics) {
                questionToTopic.destroy();
            }
            return true;
        } catch (err) {
            throw new ErrorData(ErrorCode[10001], err.message);
        }
        
    }
}

module.exports = QuestionToTopicDao;