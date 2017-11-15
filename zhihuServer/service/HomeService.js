/**
 * Created by lzc on 2017/11/14.
 */
var {ErrorCode, ResultData, ErrorData} = require(getPath('extra/ResponseData'));
var {buildImgUrl} = require(getPath('extra/utils'));

class HomeService {
    constructor () {
        let CommentService = require(getPath('service/CommentService')),
            AnswerService = require(getPath('service/AnswerService')),
            QuestionService = require(getPath('service/QuestionService')),
            VoteRelationService = require(getPath('service/VoteRelationService')),
            PersonService = require(getPath('service/PersonService')),
            TopicService = require(getPath('service/topic/TopicService'));

        this.commentService = new CommentService();
        this.answerService = new AnswerService();
        this.questionService = new QuestionService();
        this.voteRelationService = new VoteRelationService();
        this.personService = new PersonService();
        this.topicService = new TopicService();
    }

    /*
    * 根据用户id获取首页列表
    * TODO:暂时返回该用户的所有回答，后期可改为推荐列表
    * */
    async getHomeList (id) {
        var getImgUrlFromDomText = (domText) => {
            let matchImg = /<img[\s\S]*?>/,
                matchSrc = /src="[\s\S]*?"/,
                img, src;
            img = domText.match(matchImg);
            if(img === null) {
                return '';
            }
            src = img[0].match(matchSrc);
            if(src === null) {
                return '';
            }
            src = src[0].replace('src="', '');
            src = src.replace("\"", '');
            return src;
        };
        var answerList = await this.answerService.getAnswerListByPersonId(id),
            dataList = []; //最终返回的数组
        if(answerList && answerList.length == 0) {
            return answerList;
        }
        for (let answer of answerList) {
            let dataItem = {
                id: answer['id'],
                answerImg: getImgUrlFromDomText(answer['content']),
                answerText: answer['content']
            };
            let answerId = answer['id'],
                questionId = answer['question_id'],
                personId = answer['answer_person_id'];
            var [question, answerPerson, voteCount, commentCount, topics] = await Promise.all([this.questionService.getQuestionById(questionId),
                this.personService.getPersonInfoById(personId), this.voteRelationService.getVoteCountByAnswerId(answerId),
                this.commentService.getCommentCountByAnswerId(answerId), this.topicService.getTopicsByQuestionId(questionId)]);
            dataItem.questionId = questionId;
            dataItem.title = question.content;
            dataItem.answerUser = {
                id: personId,
                name: answerPerson['name'],
                word: answerPerson['signword'],
                headshot: buildImgUrl(answerPerson['headshot'])
            }
            dataItem.approveCount = voteCount;
            dataItem.commentCount = commentCount;
            if(topics.length > 0) {
                dataItem.topicId = topics[0].id;
                dataItem.topicContent = topics[0].name;
            }else {
                dataItem.topicId = null;
                dataItem.topicContent = '';
            }
            dataList.push(dataItem);
        }
        return dataList;
    }
}

module.exports = HomeService;