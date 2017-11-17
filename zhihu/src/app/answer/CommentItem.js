/**
 * Created by lzc on 2017/11/10.
 */
import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import style from './CommentItem.css';

class CommentItem extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className={style.commentItem}>
                <div className={style.userContainer}>
                    <div className={style.user}>
                        <img src={this.props.data.answerPerson.headShot}/>
                        <span>{this.props.data.answerPerson.name}</span>
                        {
                            this.props.data.hasReply ? (
                                <div className={style.reply}>
                                    <span className={style.to}>回复</span>
                                    <span>{this.props.data.replyPerson.name}</span>
                                </div>) : ''
                        }
                    </div>
                    <div className={style.time}>{this.buildTimeText(this.props.data.createTime)}</div>
                </div>
                <div className={style.content} dangerouslySetInnerHTML={{__html: this.props.data.content}}></div>
                <div className={style.commentAction}>
                    <div className={style.actionItem}>
                        <img src={require('resource/img/vote.jpg')}/>
                        <span>{this.props.data.approveCount === 0 ? '赞' : this.props.data.approveCount}</span>
                    </div>
                    <div className={style.actionItem + ' ' + (this.props.data.hasReply ? '' : 'disable')}>
                        <img src={require('resource/img/session.jpg')}/>
                        <span>查看对话</span>
                    </div>
                    <div className={style.actionItem +' '+ style.hoverShow}>
                        <img src={require('resource/img/vote.jpg')}/>
                        <span>回复</span>
                    </div>
                    <div className={style.actionItem +' '+ style.hoverShow}>
                        <img src={require('resource/img/vote.jpg')}/>
                        <span>踩</span>
                    </div>
                    <div className={style.actionItem +' '+ style.hoverShow}>
                        <img src={require('resource/img/vote.jpg')}/>
                        <span>举报</span>
                    </div>
                </div>
            </div>
        )
    }

    buildTimeText (timeStamp) {
        let now = new Date(),
            time = new Date(parseInt(timeStamp + '000'));
        if(now.getFullYear() - time.getFullYear() >= 1) {
            return now.getFullYear() - time.getFullYear() + '年前';
        } else if(now.getMonth() - time.getMonth() >= 1) {
            return now.getMonth() - time.getMonth() + '个月前';
        } else if(now.getDay() - time.getDay() >= 1){
            return now.getDay() - time.getDay() + '天前'
        } else if(now.getHours() - time.getHours() >= 1) {
            return now.getHours() - time.getHours() + '小时前'
        } else if(now.getMinutes() - time.getMinutes() >= 1) {
            return now.getMinutes() - time.getMinutes() + '分钟前'
        } else {
            return '刚刚';
        }
    }
}

CommentItem.propTypes = {
    data: PropTypes.object
}

export default CommentItem;