/**
 * Created by lzc on 2017/10/27.
 */
import React, {Component} from 'react';
import Footer from 'component/Footer';
import PropTypes from 'prop-types';
import './Sign.css';
import {Route, Link} from 'react-router-dom';
import cs from 'classnames';
import Signin from './Signin';
import Signup from './Signup';

class Sign extends Component {
    constructor (props, context) {
        super(props, context);
        if(props.match.url === '/sign') { //默认进入注册页面
            context.router.history.replace('/sign/signup');
        }

        this.navClick = this.navClick.bind(this);

        this.state = {
            curNav: 0 //0: 注册， 1:登录
        }
    }

    navClick (curNav, e) {
        this.setState({
            curNav: curNav
        })
    }

    render () {
        var match = this.props.match;
        console.info('match url: ' + match.url);
        return (
            <div>
                <div className="sign-main">
                    <div className="logo hide-text">知乎</div>
                    <div className="des">与世界分享你的知识、经验和见解</div>
                    <div className="tab-navs" cur-nav={this.state.curNav}>
                        <div className={cs({nav: true, active: this.state.curNav === 0})} onClick={this.navClick.bind(this, 0)}><Link to={match.url + "/signup"}>注册</Link></div>
                        <div className={cs({nav: true, active: this.state.curNav === 1})} onClick={this.navClick.bind(this, 1)}><Link to={match.url + "/signin"}>登录</Link></div>
                        <p className="content"/>
                        <div className="clear"></div>
                    </div>
                    <Route path={match.url + "/signup"} component={Signup}/>
                    <Route path={match.url + "/signin"} component={Signin}/>
                </div>
                <Footer/>

            </div>
        )
    }
}

Sign.contextTypes = {
    router: PropTypes.object
}

export default Sign;