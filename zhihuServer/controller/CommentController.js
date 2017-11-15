/**
 * Created by lzc on 2017/11/13.
 */
const express = require('express'),
    router = express.Router(),
    {ResponseData, ErrorCode} = require(getPath('extra/ResponseData'));
let commentService;


router.use('/', (req, res, next)=>{
    if(!commentService) {
        const CommentService = require(getPath('service/CommentService'));
        commentService = new CommentService();
    }
    next();
})

//获取评论信息
router.get('/getCommentInfo', async (req, res)=> {
    let {id} = req.query;
    try {
        var resultData = await commentService.getCommentById(id);
    } catch (errResultData) {
        res.send(new ResponseData(errResultData).buildStr())
    }
    res.send(new ResponseData(ErrorCode[0], null, resultData).buildStr());
});

router.get('/getCommentsDataByAnswerId', async(req, res) => {
    let {id, pageIndex, pageSize} = req.query;
    try {
        var resultData = await commentService.getCommentsDataByAnswerId(id, {pageIndex, pageSize});
    } catch (errResultData) {
        res.send(new ResponseData(errResultData).buildStr())
    }
    res.send(new ResponseData(ErrorCode[0], null, resultData).buildStr());
})

//新增评论
router.post('/addComment', (req, res) => {
    var {type, questionAnswerId, commentId, content, personId} = req.body,
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr());
        };

    commentService.addComment({type, questionAnswerId, commentId, content, personId}, callback);
});

//更新评论
router.post('/updateComment', (req, res) => {
    let {id, content} = req.body,
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr());
        };
    commentService.updateComment({id, content}, callback);
});

//删除评论
router.get('/deleteComment', (req, res) => {
    let {id} = req.query,
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr());
        }
    commentService.deleteComment(id, callback);
})

module.exports = router;