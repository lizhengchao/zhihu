/**
 * Created by lzc on 2017/11/15.
 */
var {ErrorCode, ResultData} = require(getPath('extra/ResponseData'));

class TopicService {
    constructor () {
        let TopicDao = require(getPath('dao/topic/TopicDao')),
            QuestionToTopicDao = require(getPath('dao/topic/QuestionToTopicDao')),
            QuestionService = require(getPath('service/QuestionService'));
        this.topicDao = new TopicDao();
        this.questionToTopicDao = new QuestionToTopicDao();
        this.questionService = new QuestionService();
    }

    getTopicById (id) {
        return this.topicDao.getTopicById(id);
    }

    addTopic (topic) {
        this.topicDao.addTopic(topic);
    }

    updateTopic (topic) {
        return this.topicDao.updateTopic(topic);
    }

    deleteTopic (id) {
        return this.topicDao.deleteTopic(id);
    }
    
    async getQuestionsByTopicId (id) {
        var questionToTopics = await this.questionToTopicDao.getByTopicId(id);
        var questions = [];
        for(let questionToTopic of questionToTopics) {
            let questionId = questionToTopic['question_id'];
            let question = await this.questionService.getQuestionById(questionId);
            questions.push(question);
        }
        return questions;
    }
    
    async getTopicsByQuestionId (id) {
        var questionToTopics = await this.questionToTopicDao.getByQuestionId(id);
        var topics = [];
        for(let questionToTopic of questionToTopics) {
            let topicId =questionToTopic['topic_id'];
            let topic = await this.getTopicById(topicId);
            topics.push(topic);
        }
        return topics;
    }

    addQuestionToTopic(questionToTopic) {
        return this.questionToTopicDao.addQuestionToTopic(questionToTopic)
    }

    deleteQuestionToTopic (topicId, questionId) {
        return this.questionToTopicDao.deleteQuestionToTopic(topicId, questionId);
    }
}

module.exports = TopicService;