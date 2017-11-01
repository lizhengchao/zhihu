/**
 * Created by lzc on 2017/10/30.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SignFormInput from './SignFormInput';
import cs from 'classnames';
import {serverUrl} from 'extra/config';

class SigninPhone extends Component {
    constructor (props) {
        super(props);

        this.Login = this.Login.bind(this);
        this.getVerCode = this.getVerCode.bind(this);

        this.phoneNumber = '';
        this.verCode = '';

        this.state = {
            phoneErrMsg: '',
            verCodeErrMsg: '',
            vercodeText: '获取验证码'
        }
    }
    
    render () {
        return (
            <div>
                <form>
                    <div className="sign-form vercode-signin">
                        <SignFormInput type="text" placeholder="手机号" onChange={(value)=>{this.phoneNumber=value;}}
                                       errmsg={this.state.phoneErrMsg} onFocus={()=>{this.setState({phoneErrMsg: ''})}}
                        />
                        <SignFormInput className="vercode" type="text" placeholder="验证码" onChange={(value)=>{this.verCode=value;}}
                                       errmsg={this.state.verCodeErrMsg} onFocus={()=>{this.setState({verCodeErrMsg: ''})}}/>
                        <div className={cs({'disable': this.state.vercodeText !== '获取验证码','btn-get-vercode':true})} onClick={this.getVerCode}>{this.state.vercodeText}</div>
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
        if(this.state.vercodeText !== '获取验证码') {
            return;
        }
        if(this.phoneNumber === '') {
            this.setState({phoneErrMsg: '请输入手机号'});
            return;
        }
        var me = this,
            updateSendBtnUI = () => {
                me.setState({vercodeText: '60秒后重发'});
                var leftTime = 60,
                    interval =
                        setInterval(() => {
                            if(leftTime>0) {
                                leftTime --;
                                me.setState({vercodeText: leftTime + '秒后重发'});
                            } else {
                                me.setState({vercodeText: '获取验证码'});
                                clearInterval(interval);
                            }
                        }, 1000);
            };

        window.$.get({
            url: serverUrl + '/phoneVerifyCode/sendPhoneVerifyCode',
            data: {
                phoneNumber: this.phoneNumber
            },
            success (res) {
                res = JSON.parse(res);
                if(res.errcode === 0) {
                    updateSendBtnUI();
                } else {
                    me.setState({phoneErrMsg: '发送验证码失败'});
                    console.error('发送验证码失败, err:' + res.msg);
                }
            },
            error (err) {
                me.setState({phoneErrMsg: '发送验证码失败，服务异常'});
                console.error('发送验证码失败，服务异常, err:' + err);
            }
        })
    }

    Login (e) {
        e.preventDefault();
        if(this.phoneNumber === '') {
            this.setState({phoneErrMsg: '请输入手机号'});
            return;
        }
        if(this.verCode === '') {
            this.setState({phoneErrMsg: '请输入验证码'});
            return;
        }
        let me = this;
        window.$.get({
            url: serverUrl + '/phoneVerifyCode/verifyPhoneCode',
            data: {
                phoneNumber: this.phoneNumber,
                code: this.verCode
            },
            success (res) {
                res = JSON.parse(res);
                if(res.errcode === 0) {
                    alert('登录成功');
                    //TODO: 登录成功逻辑
                } else if(res.errcode === 10008) {
                    me.setState({verCodeErrMsg: '短信验证码失效'});
                } else  {
                    me.setState({verCodeErrMsg: '短信验证码错误'});
                }
            },
            error (err) {
                me.setState({phoneErrMsg: '验证验证码失败，服务异常'});
                console.error('验证验证码失败，服务异常, err:' + err);
            }
        })
    }
}

SigninPhone.propTypes = {
    needVerify: PropTypes.bool,
    setSigninMode: PropTypes.func
}

export default SigninPhone;