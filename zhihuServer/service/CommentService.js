/**
 * Created by lzc on 2017/11/13.
 */
var {ErrorCode, ResultData} = require(getPath('extra/ResponseData'));

class CommentService {
    constructor () {
        let CommentDao = require(getPath('dao/CommentDao'));
        this.commentDao = new CommentDao();
    }

    getCommentById (id, callback) {
        return this.commentDao.getCommentById(id, callback);
    }
    
    getCommentsByTypeAndId (type, id, {pageSize = 20, pageIndex = 0}, callback) {
        return this.commentDao.getCommentsByTypeAndId(type, id, {pageSize, pageIndex}, callback);
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