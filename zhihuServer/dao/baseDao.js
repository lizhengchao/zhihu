/**
 * Created by lzc on 2017/10/26.
 */

class baseDao {
    constructor () {
        const sequelize = require('../getSequelize.js');
        this.sequelize = sequelize;
        // sequelize.authenticate().then(()=>{
        //     this.sequelize = sequelize;
        // }).catch((err)=>{
        //     console.error('Unable to connect to the database, reason:', err);
        // });
    }
}

module.exports = baseDao;