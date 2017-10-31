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
    VerificationCodeRouter = require('./controller/VerificationCodeController');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

app.get('/', (req, res)=> {
    res.send('hello zhihu');
});

app.use('/person', PersonRouter);

app.use('/verificationCode', VerificationCodeRouter);

app.listen(3001);