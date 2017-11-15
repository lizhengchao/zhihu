/**
 * Created by lzc on 2017/11/13.
 */
const baseDao = require('./baseDao'),
    Sequelize = require('sequelize'),
    {ErrorCode, ResultData, ErrorData} = require(getPath('extra/ResponseData'));

class CommentDao extends baseDao {
    constructor () {
        super();
        let sequelize = this.sequelize,
            CommentSeq = sequelize.define('Comment', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                type: Sequelize.INTEGER,
                'question_comment_answer_id': Sequelize.INTEGER,
                'content': Sequelize.STRING(1023),
                'person_id': Sequelize.INTEGER,
                'create_time': Sequelize.DATE,
                'modify_time': Sequelize.DATE,
                'is_delete': Sequelize.INTEGER
            }, {
                timestamps: false,
                freezeTableName: true,
                tableName: 'comment'
            });
        this.commentSeq = CommentSeq;
    }

    getCommentById (id, callback) {
        let commentSeq = this.commentSeq;

        commentSeq.findById(id).then((q) => {
            if(q == null) {
                callback(new ResultData(ErrorCode[10004], '不存在id为'+id+'的评论', null));
                return;
            }
            if (q['is_delete'] == 1) {
                callback(new ResultData(ErrorCode[10005], '不存在id为'+id+'的评论', null));
                return;
            }
            callback(new ResultData(ErrorCode[0], null, q));
        }).catch((err) => {
            callback(new ResultData(ErrorCode[10001], err.message, null));
        })
    }

    getCommentsByTypeAndId (type, id, {pageSize, pageIndex}, callback) {
        let commetnSeq = this.commentSeq;

        commetnSeq.findAll({
            where: {
                type: type,
                'question_comment_answer_id': id
            },
            offset: pageSize * pageIndex,
            limit: parseInt(pageSize)
        }).then(comments => {
            callback(new ResultData(ErrorCode[0], null, comments));
        }).catch((err) => {
            callback(new ResultData(ErrorCode[10001], err.message, null));
        })
    }

    async getCommentCountByTypeAndId (type, id) {
        try {
            var count = await this.commentSeq.count({
                where: {
                    type: type,
                    'question_comment_answer_id': id
                }
            });
        } catch (err) {
            throw new ErrorData(ErrorCode[10001], err.message);
        }
        return count;
    }

    addComment (comment, callback) {
        let commentSeq = this.commentSeq;

        commentSeq.create({
            type: comment.type,
            'question_comment_answer_id': comment.questionCommentAnswerId,
            'content': comment.content,
            'person_id': comment.personId,
            'create_time': new Date(),
            'modify_time': new Date()
        }).then((p) => {
            callback(new ResultData(ErrorCode[0], null, p));
        }).catch((err) => {
            console.error('create comment fail, err:' + err);
            callback(new ResultData(ErrorCode[10001], err.message, null));
        })
    }

    updateComment (comment, callback) {
        let commentSeq = this.commentSeq;

        commentSeq.findById(comment.id).then(q => {
            if(q == null) {
                callback(new ResultData(ErrorCode[10004], '不存在id为'+comment.id+'的评论', null));
                return;
            }
            if (q['is_delete'] == 1) {
                callback(new ResultData(ErrorCode[10005], '不存在id为'+comment.id+'的评论', null));
                return;
            }
            if(comment.content) { q.content = comment.content;}
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

    deleteComment (id, callback) {
        let commentSeq = this.commentSeq;

        commentSeq.findById(id).then(q => {
            if(q == null) {
                callback(new ResultData(ErrorCode[10004], '不存在id为'+id+'的评论', null));
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

module.exports = CommentDao;