/**
 * Created by lzc on 2017/11/15.
 */
const baseDao = require('../baseDao'),
    Sequelize = require('sequelize'),
    {ErrorCode, ErrorData} = require(getPath('extra/ResponseData'));

class TopicDao extends baseDao {
    constructor () {
        super();
        let sequelize = this.sequelize,
            TopicSeq = sequelize.define('Topic', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: Sequelize.STRING,
                description: Sequelize.STRING,
                'create_time': Sequelize.DATE,
                'modify_time': Sequelize.DATE,
                'is_delete': Sequelize.INTEGER
            }, {
                timestamps: false,
                freezeTableName: true,
                tableName: 'topic'
            });
        this.topicSeq = TopicSeq;
    }

    async getTopicById (id) {
        try {
           var topic = await this.topicSeq.findById(id);
        } catch (err) {
            throw new ErrorData(ErrorCode[10001], err.message);
        }
        if(topic == null) {
            throw new ErrorData(ErrorCode[10004], '不存在id为'+id+'的话题');
        }
        if (topic['is_delete'] == 1) {
            throw new ErrorData(ErrorCode[10005], '不存在id为'+id+'的话题');
        }
        return topic;
    }

    async addTopic (topic) {
        try {
            var topic = await this.topicSeq.create({
                content: answer.content,
                'question_id': answer.questionId,
                'answer_time': answer.answerTime,
                'answerPersonId': answer.answerPersonId,
                'create_time': new Date(),
                'modify_time': new Date()
            })
        } catch (err) {
            throw new ErrorData(ErrorCode[10001], err.message);
        }
        return topic;
    }

    async updateTopic (topic) {
        try {
            var t = await this.topicSeq.findById(topic.id);
        } catch (err) {
            throw new ErrorData(ErrorCode[10001], err.message);
        }
        if(t == null) {
            throw new ErrorData(ErrorCode[10004], '不存在id为'+answer.id+'的话题');
        }
        if (t['is_delete'] == 1) {
            throw new ErrorData(ErrorCode[10005], '不存在id为'+answer.id+'的话题');
        }
        if(topic.name) { t.name = topic.name;}
        if(topic.description) {t.description = topic.description;}
        t['modify_time'] = new Date();

        try {
            var tt = await this.topicSeq.save(t);
        } catch (err) {
            throw new ErrorData(ErrorCode[10001], err.message);
        }
        return tt;
    }

    async deleteTopic (id) {
        try {
            var topic = await this.topicSeq.findById(id);
        } catch (err) {
            throw new ErrorData(ErrorCode[10001], err.message);
        }
        if(topic == null) {
            throw new ErrorData(ErrorCode[10004], '不存在id为'+id+'的回答');
        }
        topic['is_delete'] = 1;
        topic['modify_time'] = new Date();
        try {
            await this.topicSeq.save(topic);
        } catch (err) {
            throw new ErrorData(ErrorCode[10001], err.message);
        }
        return true;
    }
}

module.exports = TopicDao;