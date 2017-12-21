import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from '../dialog/Dialog';
import style from './css/UserBtn.css';
import {deleteUserId} from "extra/utils";
import TransitionGroup from 'react-addons-css-transition-group';

class UserBtn extends Component {
    constructor (props) {
        super(props);

        this.width = 100;
        this.height = 100;

        this.userBtnClick = this.userBtnClick.bind(this);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showDialog: false,
            dialogTop: 0,
            dialogLeft: 0,
            showContent: false //为了内部动画
        }
    }

    componentDidMount () {
        var userBtn = this.refs["userBtn"];
        this.setState({
            dialogTop: userBtn.offsetTop +  window.$(userBtn).height() + 10,
            dialogLeft: userBtn.offsetLeft + window.$(userBtn).width()/2 - this.width/2
        });
    }

    render () {
        return (
            <div className="nav-icon" style={{'backgroundImage': 'url('+ require('resource/img/userHeader.jpg') + ')'}}
                 ref="userBtn" onClick={this.userBtnClick}>
                {this.state.showDialog ?
                    <Dialog top={this.state.dialogTop} left={this.state.dialogLeft} width={this.width} height={this.height}>
                        <TransitionGroup transitionName="appear" transitionEnterTimeout="500" transitionLeaveTimeout="500">
                            {this.state.showContent ?
                                <div>
                                    <div className={style.item}>我的主页</div>
                                    <div className={style.item}>设置</div>
                                    <div className={style.item} onClick={this.logOut}>退出</div>
                                </div>: null
                                }
                        </TransitionGroup>
                    </Dialog> : null}
            </div>

        )
    }

    userBtnClick () {
        if(this.state.showDialog) {
            this.setState({
                showContent: false
            })
            //动画完成后再销毁整个dialog
            setTimeout(()=>{
                this.setState({
                    showDialog: false
                })
            }, 500)
        } else {
            //先让TransitionGroup渲染完毕，然后再让内容出现才能有动画效果
            this.setState({
                showDialog: true
            });
            setTimeout(()=>{
                this.setState({
                    showContent: true
                })
            }, 0);
        }
    }

    logOut () {
        deleteUserId();
        this.context.router.history.replace('/sign');
    }
}

UserBtn.contextTypes = {
    router: PropTypes.object
}

export default UserBtn;