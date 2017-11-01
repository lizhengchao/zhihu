/**
 * Created by lzc on 2017/10/30.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SignFormInput from './SignFormInput';
import {serverUrl} from 'extra/config';

class SigninPassword extends  Component {
    constructor (props, context) {
        super(props, context);

        this.passwordSignin = this.passwordSignin.bind(this);
        this.getVerCodeImg = this.getVerCodeImg.bind(this);

        this.userId = ''; //用户，用户名或手机号
        this.password = ''; //密码
        this.verCodeId = ''; //验证码id
        this.verCodeNumeric = ''; //验证码值

        this.state = {
            verificationCodeBase64: '',
            phoneErrMsg: '',
            verCodeErrMsg: ''
        }

        if(props.needVerify) {
            this.getVerCodeImg();
        }
    }

    render () {
        return (
            <div>
                <form>
                    <div className="sign-form pd-signin">
                        <SignFormInput type="text" placeholder="手机号或邮箱" onChange={this.getInputValue.bind(this, 0)}
                                       onFocus={()=>{this.setState({phoneErrMsg: ''})}} errmsg={this.state.phoneErrMsg}/>
                        <SignFormInput type="password" placeholder="密码" onChange={this.getInputValue.bind(this, 1)}/>
                        <SignFormInput className="vercode" type="text" placeholder="验证码" onChange={this.getInputValue.bind(this, 2)}
                                       onFocus={()=>{this.setState({verCodeErrMsg: ''})}} errmsg={this.state.verCodeErrMsg}/>
                        <img className="vercode-img" src={"data:image/jpeg;base64," + this.state.verificationCodeBase64} onClick={this.getVerCodeImg}/>
                    </div>
                    <button className="btn-signup" onClick={this.passwordSignin}>登录</button>
                </form>
                <div className="blue-text" onClick={this.props.setSigninMode.bind(this, 2)}>手机验证码登录</div>
                <div className="not-signin">无法登录</div>
                <div className="clear"></div>
                <div className="qrcode-signin-btn" onClick={this.props.setSigninMode.bind(this, 0)}>二维码登录</div>
            </div>
        )
    }

    /*type:
     * 0:手机邮箱
     * 1:密码
     * 2:验证码
     * */
    getInputValue (type, value) {
        switch (type) {
            case 0:
                this.userId = value; break;
            case 1:
                this.password = value; break;
            case 2:
                this.verCodeNumeric = value; break;
        }
    }

    passwordSignin (e) {
        var me = this;
        e.preventDefault();
        window.jQuery.post({
            url: serverUrl + '/person/passwordLogin',
            data: {
                userId: this.userId,
                password: this.password,
                verCodeId: this.verCodeId,
                verCodeNumeric: this.verCodeNumeric
            },
            success (res) {
                res = JSON.parse(res);
                switch (res.errcode) {
                    case 0: me.context.addUserInfoAndToHome(res.data);
                        break;
                    case 10002: //验证码错误
                        me.setState({verCodeErrMsg: '验证码错误'});
                        break;
                    case 10004: //手机号不存在
                        me.setState({phoneErrMsg: '账号不存在'});
                        break;
                    case 10005:
                        me.setState({phoneErrMsg: '账号不存在'});
                        break;
                    case 10007: //账号或密码错误
                        me.setState({phoneErrMsg: '账号或密码错误'});
                        break;
                    default:
                        me.setState({phoneErrMsg: '服务异常，' + res.msg});
                }
            },
            error (err) {
                console.error('登录失败，服务器异常，错误信息：' + err);
            }
        })
    }

    /*获取二维码*/
    getVerCodeImg () {
        var me = this;
        window.jQuery.get({
            url: serverUrl + '/verificationCode/getVerificationCode',
            success (res) {
                res = JSON.parse(res);
                if(res.errcode === 0 && res.data) {
                    me.verCodeId = res.data.id;
                    me.setState({
                        verificationCodeBase64: res.data.img
                    })
                } else {
                    console.error('获取验证码失败，错误信息' + res.msg);
                }
            },
            error (e) {
                console.error('获取验证码图片失败, 错误信息：' + e);
            }
        })
    }
}

SigninPassword.contextTypes = {
    addUserInfoAndToHome: PropTypes.func
}

SigninPassword.propTypes = {
    needVerify: PropTypes.bool,
    setSigninMode: PropTypes.func
}

export default SigninPassword;