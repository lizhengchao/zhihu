/**
 * Created by lzc on 2017/10/26.
 */

const express = require('express'),
    router = express.Router(),
    {ResponseData, ErrorCode} = require('./ResponseData');
let personService;


router.use('/', (req, res, next)=>{
    const PersonService = require('../service/PersonService');
    personService = new PersonService();
    next();
})

router.get('/getUserInfo', (req, res)=> {
    let id = req.query.id,
        successCallback = person => {
            res.send(new ResponseData(ErrorCode[0], null, person).buildStr());
        },
        failCallback = err => {
            res.send(new ResponseData(ErrorCode[10001], 'getUserInfo fail, error:' + err, null).buildStr());
        };
    personService.getPersonInfoById(id, successCallback, failCallback);

});

router.get('/addUser', (req, res)=> {
    let
        successCallback = (person) => {
            res.send(new ResponseData(ErrorCode[0], null, person).buildStr());
        },
        failCallback = (error) => {
            res.send(new ResponseData(ErrorCode[10001], 'add user fail, error: ' + error).buildStr());
        }
    personService.addPerson(req.query.name, successCallback, failCallback);
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

module.exports = router;

