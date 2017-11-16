/**
 * Created by lzc on 2017/11/13.
 */
var {ErrorCode, ResultData} = require(getPath('extra/ResponseData'));
var {buildImgUrl} = require(getPath('extra/utils'));

class CommentService {
    constructor () {
        let CommentDao = require(getPath('dao/CommentDao')),
            PersonService = require(getPath('service/PersonService')),
            VoteRelationService = require(getPath('service/VoteRelationService'));
        this.commentDao = new CommentDao();
        this.personService = new PersonService();
        this.voteRelationService = new VoteRelationService();
    }

    getCommentById (id) {
        return this.commentDao.getCommentById(id);
    }
    
    getCommentsByTypeAndId (type, id, {pageSize = 20, pageIndex = 0}) {
        return this.commentDao.getCommentsByTypeAndId(type, id, {pageSize, pageIndex});
    }
    
    async getCommentsDataByAnswerId (id, {pageSize = 20, pageIndex = 0}) {
        var [comments, commentCount] = await Promise.all([this.getCommentsByTypeAndId(1, id, {pageSize, pageIndex}),
            this.getCommentCountByAnswerId(id)]),
            commentsResult = [],
            result = {};
        for(let comment of comments) {
            try {
                let item = {
                    id: comment.id,
                    content: comment.content,
                    createTime: comment['create_time'].getTime()
                };
                //加入个人信息
                let personId = comment['person_id'];
                let personInfo = await this.personService.getPersonInfoById(personId);
                item.answerPerson = {
                    id: personId,
                    name: personInfo.name,
                    headShot: buildImgUrl(personInfo.headshot)
                }
                //加入点赞数
                let voteCount = await this.voteRelationService.getVoteCountByCommendId(comment.id);
                item.approveCount = voteCount;
                //是否是回复
                if(comment['comment_id']) {
                    item.hasReply = true;
                    let replyComment = await this.getCommentById(comment['comment_id']);
                    let replyPersonId = replyComment['person_id'];
                    let replyPersonInfo = await this.personService.getPersonInfoById(replyPersonId);
                    item.replyPerson = {
                        id: replyPersonId,
                        name: replyPersonInfo.name
                    }
                } else {
                    item.hasReply = false;
                }
                commentsResult.push(item);
            } catch (err) {
                console.warn('on getCommentsDataByAnswerId, push commentid:' + comment.id + ' fail, errmsg:' + (err.msg || err.message));
            }
        }
        result.comment = commentsResult;
        //加入页信息
        result.count = commentCount;
        result.pageSize = parseInt(pageSize);
        result.pageIndex = parseInt(pageIndex);
        result.totalCount = Math.ceil(commentCount/pageSize);
        return result
    }

    async getCommentCountByAnswerId (id) {
        return this.commentDao.getCommentCountByTypeAndId(1, id);
    }

    addComment (comment, callback) {
        this.commentDao.addComment(comment, callback);
    }

    updateComment (comment, callback) {
        return this.commentDao.updateComment(comment, callback);
    }

    deleteComment (id, callback) {
        return this.commentDao.deleteComment(id, callback);
    }
}

module.exports = CommentService;