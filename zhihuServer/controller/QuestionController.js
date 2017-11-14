/**
 * Created by lzc on 2017/11/10.
 */
const express = require('express'),
    router = express.Router(),
    {ResponseData, ErrorCode} = require(getPath('extra/ResponseData'));
let questionService;


router.use('/', (req, res, next)=>{
    if(!questionService) {
        const QuestionService = require(getPath('service/QuestionService'));
        questionService = new QuestionService();
    }
    next();
})

//获取问题信息
router.get('/getQuestionInfo',async (req, res)=> {
    let {id} = req.query;
    try {
        var question = await questionService.getQuestionById(id);
    } catch (errResultData) {
        res.send(new ResponseData(errResultData).buildStr());
    }
    res.send(new ResponseData(ErrorCode[0], null, question).buildStr());
});

//新增问题
router.post('/addQuestion', (req, res) => {
    var {content, personId, description, publishTime} = req.body,
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr());
        };

    publishTime = new Date(parseInt(publishTime));
    if(publishTime == 'Invalid Date') {
        res.send(new ResponseData(ErrorCode[20004], '日期格式错误', null).buildStr());
    } else {
        questionService.addQuestion({content, personId, description, publishTime}, callback);
    }
});

//更新问题
router.post('/updateQuestion', (req, res) => {
    let {id, content, description} = req.body,
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr());
        };
    questionService.updateQuestion({id, content, description}, callback);
});

//删除问题
router.get('/deleteQuestion', (req, res) => {
    let {id} = req.query,
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr());
        }
    questionService.deleteQuestion(id, callback);
})

module.exports = router;