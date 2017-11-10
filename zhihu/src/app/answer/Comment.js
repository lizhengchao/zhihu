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

        this.buildPage = this.buildPage.bind(this);
        
        this.answerId = props.answerId;
        let comments = this.getCommentsByAnswerId(this.answerId);
        this.comments = comments;

        this.state = {
            count: comments.count,
            sortType: 0, //0:默认排序，1:时间排序
            pageNumber: comments.pageNumber,
            totalCount: comments.totalCount,
            inputing: false,
            showCloseBtn: false,
            closeBtnLeft: 0
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
                    content: '你是怎么知道月入5万的人只赚不花？<br/><br/><br/>123',
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
                },
                {
                    id: 3,
                    answerPerson: {
                        id: 2,
                        name: '逗比',
                        headShot: 'https://pic1.zhimg.com/af56f94d6c039369595a1a111b689b08_is.jpg'

                    },
                    content: '五万还不够花',
                    createTime: '1506816000',
                    approveCount: 0,
                    hasReply: false
                },
                {
                    id: 4,
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
            ],
            pageSize: 20,
            pageNumber:0,
            totalCount: 5
        }
        return comments;
    }

    componentDidMount () {
        this.scrollEvent = (e) => {
            let commentDom = this.refs['comment'],
                commentOffsetTop = commentDom.offsetTop,
                commentHeight = commentDom.offsetHeight,
                scrollTop = window.$(window).scrollTop(),
                clientHeight = document.documentElement.clientHeight;

            if(commentOffsetTop - scrollTop <= clientHeight * 0.5
                && commentOffsetTop - scrollTop + commentHeight >= clientHeight) {
                if(!this.state.showCloseBtn) {
                    this.setState({showCloseBtn: true});
                }
            } else {
                if(this.state.showCloseBtn) {
                    this.setState({showCloseBtn: false});
                }
            }
        };
        window.addEventListener('scroll', this.scrollEvent);

        var commentDom = this.refs['comment'];
        this.setState({closeBtnLeft: commentDom.offsetLeft + commentDom.offsetWidth - 100});
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.scrollEvent);
    }
    
    componentWillReceiveProps (newProps) {
    }

    render () {
        console.info('render comment');

        return (
            <div className={style.comment} ref="comment">
                {this.state.showCloseBtn ? (<div className={style.closeBtn} style={{left: this.state.closeBtnLeft + 'px'}} onClick={this.props.closeBtnTap}>收起评论</div>) : ''}
                <div className={style.top}>
                    <div className={style.commentCount}>{this.state.count}条评论</div>
                    <div className={style.sortType}>{this.state.sortType === 0 ? '按时间排序' : '按默认排序'}</div>
                </div>
                <div className={style.comments}>
                    {this.buildComments(this.comments)}
                </div>
                <div className={style.page}>
                    {this.buildPage()}
                </div>
                <div className={style.commentInputContainer + ' ' + (this.state.inputing ? style.inputing : '')}>
                    <input className={style.commentInput} placeholder="写下你的评论..." onFocus={()=>{this.setState({inputing: true})}}
                           onBlur={()=>{this.setState({inputing: false})}}/>
                    <button className={style.submitBtn}>评论</button>
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
    
    buildPage () {
        var pages = [];
        for(let i=0; i<this.state.totalCount; i++) {
            pages.push(<div key={i} className={style.pageItem+ ' ' + (this.state.pageNumber === i ? style.currPage: '')}>{i}</div>)
        }
        pages.push(<div key={this.state.totalCount} className={style.pageItem}>下一页</div>);
        return pages;
    }
}

Comment.propTypes = {
    answerId: PropTypes.number,
    closeBtnTap: PropTypes.func
};

export default Comment;