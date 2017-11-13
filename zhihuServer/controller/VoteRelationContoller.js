/**
 * Created by lzc on 2017/11/13.
 */
const express = require('express'),
    router = express.Router(),
    {ResponseData, ErrorCode} = require(getPath('extra/ResponseData'));
let voteRelationService;


router.use('/', (req, res, next)=>{
    if(!voteRelationService) {
        const VoteRelationService = require(getPath('service/VoteRelationService'));
        voteRelationService = new VoteRelationService();
    }
    next();
})

//获取回答的点赞数
router.get('/getVoteCountByAnswerId', (req, res)=> {
    let {id} = req.query;
    let callback = (resultData) => {
        res.send(new ResponseData(resultData).buildStr());
    }
    voteRelationService.getVoteCountByAnswerId(id, callback);
});

//获取评论的点赞数
router.get('/getVoteCountByCommentId', (req, res)=> {
    let {id} = req.query;
    let callback = (resultData) => {
        res.send(new ResponseData(resultData).buildStr());
    }
    voteRelationService.getVoteCountByCommendId(id, callback);
});

//点赞
router.post('/addVoteRelation', (req, res) => {
    var {type, answerCommentId, personId} = req.body,
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr());
        };
    voteRelationService.addVoteRelation({type, answerCommentId, personId}, callback);
});

//去掉点赞
router.post('/deleteVoteRelation', (req, res) => {
    var {type, answerCommentId, personId} = req.body,
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr());
        };
    voteRelationService.deleteVoteRelation(type, answerCommentId, personId, callback);
})

module.exports = router;