/**
 * Created by lzc on 2017/10/26.
 */
require('./getSequelize'); //初始化sequelize

let express = require('express'),
    PersonRouter = require('./controller/PersonController'),
    VerificationCodeRouter = require('./controller/VerificationCodeController'),
    app = express();

app.get('/', (req, res)=> {
    res.send('hello zhihu');
});

app.use('/person', PersonRouter);

app.use('/verificationCode', VerificationCodeRouter);

app.listen(3001);