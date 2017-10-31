/**
 * Created by lzc on 2017/10/30.
 */
const express = require('express'),
    router = express.Router(),
    captchapng = require('captchapng'),
    {ResponseData, ErrorCode} = require(getPath('extra/ResponseData'));
let verificationCodeService;


router.use('/', (req, res, next)=>{
    const VerificationCodeService = require(getPath('service/VerificationCodeService'));
    verificationCodeService = new VerificationCodeService();
    next();
})

//获取验证码
router.get('/getVerificationCode', (req, res)=> {
    let {numeric, img} = getImg();
    let successCallback = ({id}) => {
            res.send(new ResponseData(ErrorCode[0],null, {id, img}).buildStr());
        },
        failCallback = err => {
            res.send(new ResponseData(ErrorCode[10001], 'get verificationCode fail, error:' + err).buildStr());
        };
    verificationCodeService.addVerificationCode(numeric, successCallback, failCallback);

});

//验证验证码
router.get('/verificationCode', (req, res) => {
    var {id, numeric} = req.query,
        successCallback = (verificationCode) => {
            if(verificationCode.numeric === parseInt(numeric)) {
                res.send(new ResponseData(ErrorCode[0], null, null).buildStr());
            } else {
                res.send(new ResponseData(ErrorCode[10002], '验证码错误', null).buildStr())
            }
        },
        failCallback = err => {
            res.send(new ResponseData(ErrorCode[10001], 'verificationCode fail, error:' + err).buildStr());
        };

    verificationCodeService.getVerificationCodeById(id, successCallback, failCallback);

})

function getImg(){
    var numeric = parseInt(Math.random()*9000+1000);
    var p = new captchapng(80,30,numeric); // width,height,numeric captcha
    p.color(255, 255, 255, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    // var imgbase64 = new Buffer(img,'base64');
    return {numeric, img};
}

module.exports = router;