/**
 * Created by lzc on 2017/10/31.
 */
const vaildatUtil = {
    isPhoneNumber (testPhoneNumber) {
        return /^1(3|4|5|7|8)\d{9}$/.test(testPhoneNumber);
    }
}

module.exports = {
    vaildatUtil: vaildatUtil
}