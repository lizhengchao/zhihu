/**
 * Created by lzc on 2017/10/27.
 */
import React, {Component} from 'react';

class Signin extends Component {
    constructor (props) {
        super(props);

        this.setSigninMode = this.setSigninMode.bind(this);

        this.state = {
            curSigninMode: 0 //0:二维码登录;1:密码登录;2.手机验证码登录
        }
    }

    setSigninMode (newMode) {
        this.setState({
            curSigninMode: newMode
        })
    }

    render () {
        console.info(this.state.curSigninMode);
        switch (this.state.curSigninMode) {
            case 0:
                return (
                    <div className="sign-form qrcode-signin">
                        <div className="qrcode-container">
                            <img className="qrcode" src={require('resource/img/qrcode.png')}/>
                            <p>打开最新 <a href="https://www.zhihu.com/app/" target="_blank">知乎app</a>
                                <br/>在[更多]页面右上角打开扫一扫
                            </p>
                            <div className="signin-intro-container">
                                <img className="signin-intro" src={require('resource/img/signin-intro.jpg')}/>
                            </div>
                        </div>
                        <div className="use-pd-signin" onClick={this.setSigninMode.bind(this, 1)}>使用密码登录</div>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <form>
                            <div className="sign-form">
                                <input type="text" placeholder="手机号或邮箱"/>
                                <input type="password" placeholder="密码"/>
                            </div>
                            <button className="btn-signup" type="submit">登录</button>
                        </form>
                        <div className="blue-text" onClick={this.setSigninMode.bind(this, 2)}>手机验证码登录</div>
                        <div className="not-signin">无法登录</div>
                        <div className="clear"></div>
                        <div className="qrcode-signin-btn" onClick={this.setSigninMode.bind(this, 0)}>二维码登录</div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <form>
                            <div className="sign-form vercode-signin">
                                <input type="text" placeholder="手机号"/>
                                <input type="text" placeholder="验证码"/>
                                <div className="btn-get-vercode">获取验证码</div>
                            </div>
                            <button className="btn-signup" type="submit">登录</button>
                        </form>
                        <div className="blue-text" onClick={this.setSigninMode.bind(this, 1)}>密码登录</div>
                        <div className="clear"></div>
                        <div className="qrcode-signin-btn" onClick={this.setSigninMode.bind(this, 0)}>二维码登录</div>
                    </div>
                )
        }

    }
}

export default Signin;