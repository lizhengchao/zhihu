/**
 * Created by lzc on 2017/10/27.
 */
import React, {Component} from 'react';

class Signup extends Component {
    render () {
        return (
            <div>
                <form>
                    <div className="sign-form">
                        <input type="text" placeholder="姓名" autoComplete="on"/>
                        <input type="text" placeholder="手机号"/>
                        <input type="password" placeholder="密码（不少于6位）"/>
                    </div>
                    <button className="btn-signup" type="submit">注册知乎</button>
                </form>
                <div className="agree-tap">点击「注册」按钮，即代表你同意<a href="https://www.zhihu.com/terms" target="_blank">《知乎协议》</a></div>
                <div className="reg-org">注册机构号</div>
            </div>
        )
    }
}

export default Signup;