/**
 * Created by lzc on 2017/10/26.
 */
let express = require('express'),
    app = express();

app.get('/', (req, res)=> {
    res.send('hello express');
});

app.listen(3000);