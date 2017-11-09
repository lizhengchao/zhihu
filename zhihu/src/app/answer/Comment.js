/**
 * Created by lzc on 2017/11/8.
 */
import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import style from './Commoent.css';

class Comment extends React.Component {
    constructor (props) {
        super(props);

        this.answerId = props.answerId;
        let comments = this.getCommentsByAnswerId(this.answerId);
        this.comments = comments;

        this.state = {
            count: comments.count,
            sortType: 0, //0:默认排序，1:时间排序
            open: this.props.open
        }

    }

    getCommentsByAnswerId (answerId) {
        //TODO
        var comments = {
            count: 74,
            comment: [
                {
                    id: 1,
                    answerPerson: {
                        id: 1,
                        name: '圣堂后街',
                        headShot: 'https://pic1.zhimg.com/af56f94d6c039369595a1a111b689b08_is.jpg'

                    },
                    content: '你是怎么知道月入5万的人只赚不花？',
                    createTime: '1509513858',
                    approveCount: 30,
                    hasReply: true,
                    replyPerson: {
                        id: 2,
                        name: '逗比',
                        headShot: 'https://pic3.zhimg.com/bb9387206adeb837055b0c8506ddcbfe_is.jpg'
                    }
                },
                {
                    id: 2,
                    answerPerson: {
                        id: 2,
                        name: '逗比',
                        headShot: 'https://pic1.zhimg.com/af56f94d6c039369595a1a111b689b08_is.jpg'

                    },
                    content: '五万还不够花',
                    createTime: '1506816000',
                    approveCount: 0,
                    hasReply: false
                }
            ],
            excellentCommentsId: [
                1
            ]
        }
        return comments;
    }
    
    componentWillReceiveProps (newProps) {
        this.setState({open: newProps.open});
    }

    render () {
        console.info('render comment');

        return (
            <div className={style.comment + ' ' + (this.state.open ? '' : 'disable')}>
                <div className={style.top}>
                    <div className={style.commentCount}>{this.state.count}条评论</div>
                    <div className={style.sortType}>{this.state.sortType === 0 ? '按时间排序' : '按默认排序'}</div>
                </div>
                <div className={style.comments}>
                    {this.buildComments(this.comments)}
                </div>
            </div>
        );
    }

    buildComments (comments) {
        var comment = comments.comment,
            commentDoms = [],
            buildTimeText = (timeStamp) => {
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
            };
        for(let item of comment) {
            commentDoms.push((
                <div className={style.commentItem} key={item.id}>
                    <div className={style.userContainer}>
                        <div className={style.user}>
                            <img src={item.answerPerson.headShot}/>
                            <span>{item.answerPerson.name}</span>
                            {
                                item.hasReply ? (
                                    <div className={style.reply}>
                                        <span className={style.to}>回复</span>
                                        <span>{item.replyPerson.name}</span>
                                    </div>) : ''
                            }
                        </div>
                        <div className={style.time}>{buildTimeText(item.createTime)}</div>
                    </div>
                    <div className={style.content} dangerouslySetInnerHTML={{__html: item.content}}></div>
                    <div className={style.commentAction}>
                        <div className={style.actionItem}>
                            <img src={require('resource/img/vote.jpg')}/>
                            <span>赞</span>
                        </div>
                        <div className={style.actionItem + ' ' + (item.hasReply ? '' : 'disable')}>
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
            ))
        }

        return commentDoms;
    }
}

Comment.propTypes = {
    answerId: PropTypes.number,
    open: PropTypes.bool
};

export default Comment;