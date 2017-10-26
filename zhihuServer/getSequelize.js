/**
 * Created by lzc on 2017/10/26.
 */
let Sequelize = require('sequelize');

if(global.sequelize) {
    module.exports = global.sequelize;
    return;
}

const sequelize = new Sequelize('zhihu', 'root', '', {
    host: 'localhost',
    post: '3306',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 1000
    }
});

sequelize.authenticate().then(()=>{
    console.info('Connection has been established successfully.');
    global['sequelize'] = sequelize;
}).catch((err)=>{
    console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;