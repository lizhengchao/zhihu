/**
 * Created by lzc on 2017/10/27.
 */
import React, {Component} from 'react';
import SigninPassword from './SigninPassword';
import SigninPhone from './SigninPhone';

class Signin extends Component {
    constructor (props) {
        super(props);

        this.setSigninMode = this.setSigninMode.bind(this);

        this.state = {
            curSigninMode: 0, //0:二维码登录;1:密码登录;2.手机验证码登录
            needVerify: true //是否需要验证码，一天内验证过一次则不再次验证
        }
    }

    setSigninMode (newMode) {
        this.setState({
            curSigninMode: newMode
        })
    }

    render () {
        switch (this.state.curSigninMode) {
            case 0:
                return (
                    <div className="sign-form qrcode-signin">
                        <div className="qrcode-container">
                            <img className="qrcode" src={require('resource/img/qrcode.png')} alt=""/>
                            <p>打开最新 <a href="https://www.zhihu.com/app/" target="_blank">知乎app</a>
                                <br/>在[更多]页面右上角打开扫一扫
                            </p>
                            <div className="signin-intro-container">
                                <img className="signin-intro" src={require('resource/img/signin-intro.jpg')} alt=""/>
                            </div>
                        </div>
                        <div className="use-pd-signin" onClick={this.setSigninMode.bind(this, 1)}>使用密码登录</div>
                    </div>
                );
            case 1:
                return (
                    <SigninPassword needVerify={this.state.needVerify} setSigninMode={this.setSigninMode}/>
                );
            case 2:
                return (
                    <SigninPhone needVerify={this.state.needVerify} setSigninMode={this.setSigninMode}/>
                )
        }

    }
}

export default Signin;