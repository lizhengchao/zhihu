/**
 * Created by lzc on 2017/11/15.
 */
var setUserId = (userId)=> {
    var setCookie = function(c_name,value,expiredays) {
        var exdate=new Date()
        exdate.setDate(exdate.getDate()+expiredays)
        document.cookie=c_name+ "=" + encodeURI(value) +
            ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) + "; path=/"
    };
    setCookie('userId', userId);
};

var getUserId = ()=> {
    function getCookie(c_name) {
        var c_start, c_end;
        if (document.cookie.length>0)
        {
            c_start=document.cookie.indexOf(c_name + "=")
            if (c_start!=-1)
            {
                c_start=c_start + c_name.length+1
                c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return decodeURI(document.cookie.substring(c_start,c_end))
            }
        }
        return ""
    }
    return getCookie('userId');
};

export {
    setUserId, 
    getUserId
}