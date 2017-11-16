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
                'question_answer_id': Sequelize.INTEGER,
                'comment_id': Sequelize.INTEGER,
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

    async getCommentById (id) {
        try {
            var comment = await this.commentSeq.findById(id);
        } catch (err) {
            throw new ErrorData(ErrorCode[10001], err.message);
        }
        if(comment == null) {
            throw new ErrorData(ErrorCode[10004], '不存在id为'+id+'的评论');
        }
        if (comment['is_delete'] == 1) {
            throw new ErrorData(ErrorCode[10005], '不存在id为'+id+'的评论');
        }
        return comment;
    }

    async getCommentsByTypeAndId (type, id, {pageSize, pageIndex}) {
        try {
            var comments = await this.commentSeq.findAll({
                where: {
                    type: type,
                    'question_answer_id': id
                },
                offset: pageSize * pageIndex,
                limit: parseInt(pageSize)
            });
        } catch (err) {
            throw new ErrorData(ErrorCode[10001], err.message);
        }
        return comments;
    }

    async getCommentCountByTypeAndId (type, id) {
        const Op = Sequelize.Op;
        try {
            var count = await this.commentSeq.count({
                where: {
                    type: type,
                    'question_answer_id': id,
                    'is_delete': null
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
            'question_answer_id': comment.questionAnswerId,
            'comment_id': comment.commentId,
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