/**
 * Created by lzc on 2017/10/26.
 */

const express = require('express'),
    router = express.Router();
let personService;


router.use('/', (req, res, next)=>{
    const PersonService = require('../service/PersonService');
    personService = new PersonService();
    next();
})

router.get('/getUserInfo', (req, res)=> {
    let id = req.query.id,
        successCallback = person => {
            res.send(JSON.stringify(person));
        },
        failCallback = err => {
            res.status(500).send('getUserInfo fail, error:' + err);
        };
    personService.getPersonInfoById(id, successCallback, failCallback);

});

router.get('/addUser', (req, res)=> {
    let
        successCallback = (person) => {
            res.send('add user success, user: ' + JSON.stringify(person));
        },
        failCallback = (error) => {
            res.status(500).send('add user fail, error: ' + error);
        }
    personService.addPerson(req.query.name, successCallback, failCallback);
});

router.get('/updateUser', (req, res) => {
    let
        successCallback = (person) => {
            res.send('update user success, user: ' + JSON.stringify(person));
        },
        failCallback = (error) => {
            res.status(500).send('update user fail, error: ' + error);
        }
    personService.updatePerson(req.query.id, req.query.name, successCallback, failCallback);
});

router.get('/deleteUser', (req, res) => {
    let
        successCallback = () => {
            res.send('delete user success');
        },
        failCallback = (error) => {
            res.status(500).send('update user fail, error: ' + error);
        }
    personService.deletePerson(req.query.id, successCallback, failCallback);
});

module.exports = router;

