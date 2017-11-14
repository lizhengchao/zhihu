/**
 * Created by lzc on 2017/10/26.
 */

const express = require('express'),
    router = express.Router(),
    {ResponseData, ErrorCode} = require(getPath('extra/ResponseData'));
let personService;

router.use('/', (req, res, next)=>{
    const PersonService = require(getPath('service/PersonService'));
    personService = new PersonService();
    next();
});

router.get('/getUserInfo', async (req, res)=> {
    let id = req.query.id;
    try {
        var resultData = await personService.getPersonInfoById(id);
    } catch (errResultData) {
        res.send(new ResponseData(errResultData).buildStr())
    }
    res.send(new ResponseData(ErrorCode[0], null, resultData).buildStr());
});

router.post('/register', (req, res)=> {
    let {name, password, phoneNumber} = req.body;
    if(typeof name === 'undefined' || typeof password === 'undefined' || typeof phoneNumber === 'undefined') {
        res.send(new ResponseData(ErrorCode[20001], '添加用户失败，名字、密码、手机号都不能为空').buildStr());
        return;
    }
    let person = {name, password, phoneNumber},
        callback = (resultData) => {
            if(resultData.errcode === ErrorCode[0]) {
                res.send(new ResponseData(ErrorCode[0], null, resultData.data.id).buildStr());
            } else {
                res.send(new ResponseData(resultData).buildStr());
            }
        };
    
    personService.register(person, callback);
});

router.get('/updateUser', (req, res) => {
    let {id, name} = req.query;
    if(typeof id === 'undefined' || typeof name === 'undefined') {
        res.send(new ResponseData(ErrorCode[20001], 'id或name不能为空').buildStr());
    }
    let person = {id, name},
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr());
        };
    personService.updatePerson(person, callback);
});

router.get('/deleteUser', (req, res) => {
    let
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr());
        };
    personService.deletePerson(req.query.id, callback);
});

router.post('/passwordLogin', (req, res) => {
    let {userId, password, verCodeId, verCodeNumeric} = req.body,
        callback = (resultData) => {
            res.send(new ResponseData(resultData).buildStr())
        };

    personService.passwordLogin(userId, password, verCodeId, verCodeNumeric, callback);
})

module.exports = router;

