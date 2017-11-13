/**
 * Created by lzc on 2017/11/13.
 */
const express = require('express'),
    router = express.Router(),
    {ResponseData, ErrorCode} = require(getPath('extra/ResponseData'));
let answerService;


router.use('/', (req, res, next)=>{
    if(!answerService) {
        const AnswerService = require(getPath('service/AnswerService'));
        answerService = new AnswerService();
    }
    next();
})

//获取回答信息
router.get('/getAnswerInfo', (req, res)=> {
    let {id} = req.query;
    let callback = (resultData) => {
        res.send(new ResponseData(resultData).buildStr());
    }
    answerService.getAnswerById(id, callback);

});

//新增回答
router.post('/addAnswer', (req, res) => {
    var {content, questionId, answerTime, answerPersonId} = req.body,
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr());
        };
    
    answerTime = new Date(parseInt(answerTime));
    if(answerTime == 'Invlid Date') {
        res.send(new ResponseData(ErrorCode[20004], '日期格式错误', null).buildStr());
    } else {
        answerService.addAnswer({content, questionId, answerTime, answerPersonId}, callback);
    }
});

//更新回答
router.post('/updateAnswer', (req, res) => {
    let {id, content, description} = req.body,
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr());
        };
    answerService.updateAnswer({id, content, description}, callback);
});

//删除回答
router.get('/deleteAnswer', (req, res) => {
    let {id} = req.query,
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr());
        }
    answerService.deleteAnswer(id, callback);
})

module.exports = router;