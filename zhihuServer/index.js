/**
 * Created by lzc on 2017/10/26.
 */
require('./getSequelize'); //初始化sequelize

let path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    app = express();

global.getPath = (absolutePath)=> {
    return path.resolve(process.cwd(), absolutePath);
}

let PersonRouter = require('./controller/PersonController'),
    VerificationCodeRouter = require('./controller/VerificationCodeController'),
    PhoneVerifyCodeRouter = require('./controller/PhoneVerifyCodeController'),
    QuestionRouter = require('./controller/QuestionController'),
    AnswerRouter = require('./controller/AnswerController'),
    VoteRelationRouter = require('./controller/VoteRelationContoller'),
    CommentRouter = require('./controller/CommentController'),
    HomeRouter = require('./controller/HomeController');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

//静态资源
app.use('/static', express.static('static'));

app.get('/', (req, res)=> {
    res.send('hello zhihu');
});

app.use('/person', PersonRouter);

app.use('/verificationCode', VerificationCodeRouter);

app.use('/phoneVerifyCode', PhoneVerifyCodeRouter);

app.use('/question', QuestionRouter);

app.use('/answer', AnswerRouter);

app.use('/voteRelation', VoteRelationRouter);

app.use('/comment', CommentRouter);

app.use('/home', HomeRouter);

app.listen(3001);