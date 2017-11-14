/**
 * Created by lzc on 2017/11/13.
 */
var {ErrorCode, ResultData} = require(getPath('extra/ResponseData'));

class VoteRelationService {
    constructor () {
        let VoteRelationDao = require(getPath('dao/VoteRelationDao'));
        this.voteRelationDao = new VoteRelationDao();
    }

    getVoteCountByAnswerId (answerId) {
        return this.voteRelationDao.getVoteCountByTypeAndAnswerCommentId(0, answerId);
    }
    
    getVoteCountByCommendId (commentId) {
        return this.voteRelationDao.getVoteCountByTypeAndAnswerCommentId(1, commentId);
    }

    addVoteRelation (voteRelation, callback) {
        this.voteRelationDao.addVoteRelation(voteRelation, callback);
    }

    deleteVoteRelation (type, answerCommentId, personId, callback) {
        return this.voteRelationDao.deleteVoteRelation(type, answerCommentId, personId, callback);
    }
}

module.exports = VoteRelationService;