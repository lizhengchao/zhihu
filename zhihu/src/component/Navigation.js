/**
 * Created by lzc on 2017/11/1.
 */
import React, {Component} from 'react';
import './Navigation.css';
import cs from 'classnames';

class Navigation extends Component {
    constructor (props) {
        super(props);

        this.state = {
            searching: false
        }
    }

    render () {
        return (
            <div className="nav">
                <a href="/home"><div className="nav-logo"></div></a>
                <a className="nav-item" href="/home">首页</a>
                <a className="nav-item" href="">发现</a>
                <a className="nav-item" href="">话题</a>
                <div className={cs({'search-question-container': true, 'searching': this.state.searching})}>
                    <input className="nav-search-input" placeholder="搜索你的感兴趣的内容..." onFocus={()=>{this.setState({searching: true})}}
                           onBlur={()=>{this.setState({searching: false})}}/>
                    <button className="nav-question-btn">提问</button>
                </div>
                <div style={{width: '100px'}}></div>
                <div className="nav-icon" style={{'backgroundImage': 'url('+ require('resource/img/bell.jpg') + ')'}}></div>
                <div className="nav-icon" style={{'backgroundImage': 'url('+ require('resource/img/message.jpg') + ')'}}></div>
                <div className="nav-icon" style={{'backgroundImage': 'url('+ require('resource/img/userHeader.jpg') + ')', marginRight: '175px'}}></div>
            </div>
        )
    }
}

export default Navigation;