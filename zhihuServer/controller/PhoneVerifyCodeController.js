/**
 * Created by lzc on 2017/11/1.
 */
const express = require('express'),
    router = express.Router(),
    {ResponseData, ErrorCode} = require(getPath('extra/ResponseData'));
let phoneVerifyCodeService;


router.use('/', (req, res, next)=>{
    const PhoneVerifyCodeService = require(getPath('service/PhoneVerifyCodeService'));
    phoneVerifyCodeService = new PhoneVerifyCodeService();
    next();
})

//获取验证码
router.get('/sendPhoneVerifyCode', (req, res)=> {
    let {phoneNumber} = req.query;
    let callback = (resultData) => {
        if (resultData.errcode !== ErrorCode[0]) {
            res.send(new ResponseData(resultData.errcode, resultData.msg, null).buildStr());
        } else {
            res.send(new ResponseData(ErrorCode[0], null, null).buildStr());
        }
    }
    phoneVerifyCodeService.sendPhoneVerifyCode(phoneNumber, callback);

});

//验证验证码
router.get('/verifyPhoneCode', (req, res) => {
    var {phoneNumber, code} = req.query,
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr());
        };

    phoneVerifyCodeService.verificationPhoneCode(phoneNumber, code, callback);

});

module.exports = router;