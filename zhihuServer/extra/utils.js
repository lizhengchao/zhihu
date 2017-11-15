/**
 * Created by lzc on 2017/10/31.
 */
const vaildatUtil = {
    isPhoneNumber (testPhoneNumber) {
        return /^1(3|4|5|7|8)\d{9}$/.test(testPhoneNumber);
    }
}

const buildImgUrl = (url) => {
    return 'http://localhost:3001/static/image/' + url;
}

module.exports = {
    vaildatUtil,
    buildImgUrl
}