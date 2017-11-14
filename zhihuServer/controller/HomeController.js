/**
 * Created by lzc on 2017/11/14.
 */
const express = require('express'),
    router = express.Router(),
    {ResponseData, ErrorCode} = require(getPath('extra/ResponseData'));
let homeService;


router.use('/', (req, res, next)=>{
    if(!homeService) {
        const HomeService = require(getPath('service/HomeService'));
        homeService = new HomeService();
    }
    next();
})

//根据用户id获取其对应的首页列表
router.get('/getHomeList', async (req, res)=> {
    let {userId} = req.query;

    if(typeof userId === 'undefined') {
        res.send(new ResponseData(ErrorCode[20001], '缺少userId', null).buildStr());
        return;
    }

    try {
        var homeList = await homeService.getHomeList(userId);
    } catch (errResultData) {
        res.send(new ResponseData(errResultData).buildStr());
    }
    res.send(new ResponseData(ErrorCode[0], null, homeList).buildStr());
});

module.exports = router;