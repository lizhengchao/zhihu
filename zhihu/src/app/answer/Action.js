/**
 * Created by lzc on 2017/11/7.
 */
import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import './Action.css';

class Action extends React.Component {

    constructor (props) {
        super(props);


        this.state = {
            actionWidth: '100%'
        }
    }

    componentWillReceiveProps (newProps) {
        if(newProps.fixedBottom) {
            let actionDom = this.refs['action'],
                actionParentWidth = window.$(actionDom.parentNode).width();
            this.setState({actionWidth: actionParentWidth});
        } else {
            this.setState({actionWidth: '100%'});
        }
    }

    render () {
        return (
            <div className={cs({action: true, 'fixed-bottom': this.props.fixedBottom})} style={{width: this.state.actionWidth}} ref="action">
                <div className="approve"><div className="triangle-up"></div>{this.props.approveCount}</div>
                <div className="disapprove"><div className="triangle-down"></div></div>
                <div className="comment">{this.props.commentCount}人评论</div>
                <div className="share">分享</div>
                <div className="collect">收藏</div>
                <div className="thank">感谢</div>
                <svg className="more" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em" data-reactid="312"><path d="M5 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fillRule="evenodd" data-reactid="313"></path></svg>
                <div className={cs({close: true, disable: !this.props.showClose})} onClick={this.props.closeClick}>收起<img src={require('resource/img/up.jpg')}/></div>
            </div>
        );
    }
}

Action.propTypes = {
    approveCount: PropTypes.number,
    commentCount: PropTypes.number,
    showClose: PropTypes.bool,
    closeClick: PropTypes.func,
    fixedBottom: PropTypes.bool
};

Action.defaultProps = {
    fixedBottom: false
}

export default Action;