/**
 * Created by lzc on 2017/11/1.
 */
import React, {Component} from 'react';
import './Navigation.css';
import cs from 'classnames';
import PropTypes from 'prop-types';
import UserBtn from './navigation/UserBtn';

class Navigation extends Component {
    constructor (props) {
        super(props);

        this.state = {
            searching: false,


        }
    }

    render () {
        return (
            <div className="nav">
                <div className="nav-container">
                    <a href="/home"><div className="nav-logo"></div></a>
                    <a className={cs({'nav-item': true, 'select': this.props.selectItemNumber == 0})} href="/home">首页</a>
                    <a className={cs({'nav-item': true, 'select': this.props.selectItemNumber == 1})} href="">发现</a>
                    <a className={cs({'nav-item': true, 'select': this.props.selectItemNumber == 2})} href="">话题</a>
                    <div className={cs({'search-question-container': true, 'searching': this.state.searching})}>
                        <input className="nav-search-input" placeholder="搜索你的感兴趣的内容..." onFocus={()=>{this.setState({searching: true})}}
                               onBlur={()=>{this.setState({searching: false})}}/>
                        <img className="nav-search-img" src={this.state.searching ? require('resource/img/search2.png') : require('resource/img/search1.png')}/>
                        <button className="nav-question-btn">提问</button>
                    </div>
                    <div style={{width: '100px'}}></div>
                    <div className="nav-icon" style={{'backgroundImage': 'url('+ require('resource/img/bell.jpg') + ')'}}></div>
                    <div className="nav-icon" style={{'backgroundImage': 'url('+ require('resource/img/message.jpg') + ')'}}></div>
                    <UserBtn/>
                </div>
            </div>
        )
    }
}

Navigation.propTypes = {
    selectItemNumber: PropTypes.number
}

export default Navigation;