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

router.get('/getUserInfo', (req, res)=> {
    let id = req.query.id,
        callback = resultData => {
            res.send(new ResponseData(resultData).buildStr());
        }
    personService.getPersonInfoById(id, callback);

});

router.post('/register', (req, res)=> {
    let {name, password, phoneNumber} = req.body;
    if(typeof name === 'undefined' || typeof password === 'undefined' || typeof phoneNumber === 'undefined') {
        res.send(new ResponseData(ErrorCode[20001], '添加用户失败，名字、密码、手机号都不能为空').buildStr());
        return;
    }
    let person = {name, password, phoneNumber},
        callback = (ResultData) => {
            res.send(new ResponseData(ResultData).buildStr());
        };
    
    personService.register(person, callback);
});

router.get('/updateUser', (req, res) => {
    let
        successCallback = (person) => {
            res.send(new ResponseData(ErrorCode[0], null, person).buildStr());
        },
        failCallback = (error) => {
            res.send(new ResponseData(ErrorCode[10001], 'update user fail, error: ' + error).buildStr());
        }
    personService.updatePerson(req.query.id, req.query.name, successCallback, failCallback);
});

router.get('/deleteUser', (req, res) => {
    let
        successCallback = () => {
            res.send(new ResponseData(ErrorCode[0], null, null).buildStr());
        },
        failCallback = (error) => {
            res.send(new ResponseData(ErrorCode[10001], 'delete user fail, error: ' + error).buildStr());
        }
    personService.deletePerson(req.query.id, successCallback, failCallback);
});

router.post('/passwordLogin', (req, res) => {
    let {userId, password, verCodeId, verCodeNumeric} = req.body,
        successCallback = () => {
            res.send(new ResponseData(ErrorCode[0], null, null).buildStr())
        },
        failCallback = (error)=> {
            res.send(new ResponseData(ErrorCode[10003], error).buildStr());
        };

    personService.passwordLogin(userId, password, verCodeId, verCodeNumeric, successCallback, failCallback);
})

module.exports = router;

