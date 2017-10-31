/**
 * Created by lzc on 2017/10/30.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SignFormInput from './SignFormInput';

class SigninPhone extends Component {
    constructor (props) {
        super(props);

        this.Login = this.Login.bind(this);
        this.getVerCode = this.getVerCode.bind(this);

        this.phoneNumber = '';
        this.verCode = '';
    }
    
    render () {
        return (
            <div>
                <form>
                    <div className="sign-form vercode-signin">
                        <SignFormInput type="text" placeholder="手机号" onChange={(value)=>{this.phoneNumber=value;}}/>
                        <SignFormInput type="text" placeholder="验证码" onChange={(value)=>{this.verCode=value;}}/>
                        <div className="btn-get-vercode" onClick={this.getVerCode}>获取验证码</div>
                    </div>
                    <button className="btn-signup" type="submit" onClick={this.Login}>登录</button>
                </form>
                <div className="blue-text" onClick={this.props.setSigninMode.bind(this, 1)}>密码登录</div>
                <div className="clear"></div>
                <div className="qrcode-signin-btn" onClick={this.props.setSigninMode.bind(this, 0)}>二维码登录</div>
            </div>
        )
    }

    getVerCode () {

    }

    Login (e) {
        e.preventDefault();
        let me = this;

    }
}

SigninPhone.propTypes = {
    needVerify: PropTypes.bool,
    setSigninMode: PropTypes.func
}

export default SigninPhone;