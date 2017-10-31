/**
 * Created by lzc on 2017/10/27.
 */
import React, {Component} from 'react';
import SignFormInput from './SignFormInput';
import {serverUrl} from 'extra/config';

class Signup extends Component {
    constructor (props) {
        super(props);

        this.register = this.register.bind(this);

        this.userName = '';
        this.phoneNumber = '';
        this.password = '';

        this.state = {
            userNameErrorMsg: '',
            phoneNumberErrorMsg: '',
            passwordErrorMsg: ''
        }
    }

    render () {
        return (
            <div>
                <form>
                    <div className="sign-form">
                        <SignFormInput type="text" placeholder="姓名" onChange={(value)=>{this.userName=value;}}
                                       errmsg={this.state.userNameErrorMsg} onFocus={()=>{this.setState({userNameErrorMsg: ''})}}/>
                        <SignFormInput type="text" placeholder="手机号" onChange={(value)=>{this.phoneNumber=value;}}
                                       errmsg={this.state.phoneNumberErrorMsg} onFocus={()=>{this.setState({phoneNumberErrorMsg: ''})}}/>
                        <SignFormInput type="password" placeholder="密码（不少于6位）" onChange={(value)=>{this.password=value;}}
                                       errmsg={this.state.passwordErrorMsg} onFocus={()=>{this.setState({passwordErrorMsg: ''})}}/>
                    </div>
                    <button className="btn-signup" type="submit" onClick={this.register}>注册知乎</button>
                </form>
                <div className="agree-tap">点击「注册」按钮，即代表你同意<a href="https://www.zhihu.com/terms" target="_blank">《知乎协议》</a></div>
                <div className="reg-org">注册机构号</div>
            </div>
        )
    }

    register (e) {
        var me = this;
        e.preventDefault();
        if(this.userName === '') {
            this.setState({userNameErrorMsg: '请填写姓名'});
        }
        if(this.phoneNumber === '') {
            this.setState({phoneNumberErrorMsg: '请填写手机号'});
        }
        if(this.password === '') {
            this.setState({passwordErrorMsg: '请填写密码'});
        }
        if(this.userName === '' || this.phoneNumber === '' || this.password === '') {
            return;
        }

        window.jQuery.post({
            url: serverUrl + '/person/register',
            data: {
                name: this.userName,
                password: this.password,
                phoneNumber: this.phoneNumber
            },
            success (res) {
                res = JSON.parse(res);
                if(res.errcode === 0) {
                    alert('注册成功');
                    //TODO:注册成功的逻辑
                } else if(res.errcode === 20002) {
                    me.setState({phoneNumberErrorMsg: '手机号格式错误'});
                } else if (res.errcode === 20003) {
                    me.setState({passwordErrorMsg: '密码长度不能小于6位'});
                } else if (res.errcode === 10006) {
                    me.setState({phoneNumberErrorMsg: '手机号已存在'});
                } else {
                    me.setState({phoneNumberErrorMsg: '服务异常'});
                    console.warn(res.msg);
                }
            },
            error (e) {
                console.err('register err msg:' + e);
                this.setState({phoneNumberErrorMsg: e})
            }
        })
    }
}

export default Signup;