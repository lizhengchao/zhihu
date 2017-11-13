/**
 * Created by lzc on 2017/11/13.
 */
const baseDao = require('./baseDao'),
    Sequelize = require('sequelize'),
    {ErrorCode, ResultData} = require(getPath('extra/ResponseData'));

class VoteRelationDao extends baseDao {
    constructor () {
        super();
        let sequelize = this.sequelize,
            VoteRelationSequelize = sequelize.define('VoteRelation', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                type: Sequelize.INTEGER,
                'answer_comment_id': Sequelize.INTEGER,
                'person_id': Sequelize.INTEGER,
                'create_time': Sequelize.DATE,
                'modify_time': Sequelize.DATE
            }, {
                timestamps: false,
                freezeTableName: true,
                tableName: 'voterelation'
            });
        this.voteRelationsequelize = VoteRelationSequelize;
    }

    getVoteCountByTypeAndAnswerCommentId (type, answerCommentId, callback) {
        this.voteRelationsequelize.count({
            where: {
                type: type,
                'answer_comment_id': answerCommentId
            }
        }).then((count)=>{
            callback(new ResultData(ErrorCode[0], null, count));
        }).catch((err) => {
            callback(new ResultData(ErrorCode[10001], err.message, null))
        })
    }

    addVoteRelation (voteRelation, callback) {
        let voteRelationsequelize = this.voteRelationsequelize;

        voteRelationsequelize.create({
            type: voteRelation.type,
            'answer_comment_id': voteRelation.answerCommentId,
            'person_id': voteRelation.personId,
            'create_time': new Date(),
            'modify_time': new Date()
        }).then((v) => {
            console.info('created: ' + JSON.stringify(v));
            callback(new ResultData(ErrorCode[0], null, v));
        }).catch((err) => {
            console.info('create fail, err:' + err.message);
            callback(new ResultData(ErrorCode[10001], err.message, null))
        })
    }

    deleteVoteRelation (type, answerCommentId, personId, callback) {
        let voteRelationsequelize = this.voteRelationsequelize;

        voteRelationsequelize.findAll({
            where: {
                type: type,
                'answer_comment_id': answerCommentId,
                'person_id': personId
            }
        }).then(votes => {
            if(votes.length == 0) {
                callback(new ResultData(ErrorCode[10004], '不存在的点赞关系', null));
                return;
            }
            //有多条则全部删除
            for(let vote of votes) {
                vote.destroy().then(() => {
                    callback(new ResultData(ErrorCode[0], null, null));
                }).catch(err => {
                    callback(new ResultData(ErrorCode[10001], err.message, null))
                })
            }
        }).catch(err => {
            callback(new ResultData(ErrorCode[10001], err.message, null))
        })
    }

}

module.exports = VoteRelationDao;