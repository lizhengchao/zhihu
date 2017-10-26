/**
 * Created by lzc on 2017/10/26.
 */
require('./getSequelize'); //初始化sequelize

let express = require('express'),
    PersonRouter = require('./controller/PersonController'),
    app = express();

app.get('/', (req, res)=> {
    res.send('hello express');
});

app.use('/person', PersonRouter);

app.listen(3000);