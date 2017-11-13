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

//获取回答信息
router.get('/getCommentInfo', (req, res)=> {
    let {id} = req.query;
    let callback = (resultData) => {
        res.send(new ResponseData(resultData).buildStr());
    };
    commentService.getCommentById(id, callback);
});

router.get('/getCommentsByAnswerId', (req, res) => {
    let {id, pageIndex, pageSize} =req.query,
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr());
        };
    commentService.getCommentsByTypeAndId(2, id, {pageIndex, pageSize}, callback);
})

//新增回答
router.post('/addComment', (req, res) => {
    var {type, questionCommentAnswerId, content, personId} = req.body,
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr());
        };

    commentService.addComment({type, questionCommentAnswerId, content, personId}, callback);
});

//更新回答
router.post('/updateComment', (req, res) => {
    let {id, content} = req.body,
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr());
        };
    commentService.updateComment({id, content}, callback);
});

//删除回答
router.get('/deleteComment', (req, res) => {
    let {id} = req.query,
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr());
        }
    commentService.deleteComment(id, callback);
})

module.exports = router;