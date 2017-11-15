/**
 * Created by lzc on 2017/11/8.
 */
import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import style from './Comment.css';
import CommentItem from './CommentItem';
import {serverUrl} from 'extra/config';

class Comment extends React.Component {
    constructor (props) {
        super(props);

        this.buildPage = this.buildPage.bind(this);
        
        this.answerId = props.answerId;
        this.getCommentsByAnswerId(this.answerId, (comments) => {
            this.setState({comments: comments})
        });

        this.state = {
            comments: {comment: []},
            sortType: 0, //0:默认排序，1:时间排序
            inputing: false,
            showCloseBtn: false,
            closeBtnLeft: 0
        }

    }

    getCommentsByAnswerId (answerId, callback) {
        window.$.get({
            url: serverUrl + '/comment/getCommentsDataByAnswerId',
            data: {
                id: answerId
            },
            success (res) {
                res = JSON.parse(res);
                if(res.errcode !== 0) {
                    console.error('获取评论信息失败，错误信息：' + res.msg);
                } else {
                    callback(res.data);
                }
            },
            error (xhr, textStatus, errorThrow) {
                console.error('获取评论信息失败， 服务异常, 错误信息：' + xhr.responseText);
            }
        })
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
        return (
            <div className={style.comment} ref="comment">
                {this.state.showCloseBtn ? (<div className={style.closeBtn} style={{left: this.state.closeBtnLeft + 'px'}} onClick={this.props.closeBtnTap}>收起评论</div>) : ''}
                <div className={style.top}>
                    <div className={style.commentCount}>{this.state.comments.count}条评论</div>
                    <div className={style.sortType}>{this.state.sortType === 0 ? '按时间排序' : '按默认排序'}</div>
                </div>
                <div className={style.comments}>
                    {this.buildComments(this.state.comments)}
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
            commentDoms = [];
        for(let item of comment) {
            commentDoms.push((
                <CommentItem data={item} key={item.id}/>
            ))
        }

        return commentDoms;
    }
    
    buildPage () {
        var pages = [];
        for(let i=0; i<this.state.comments.totalCount; i++) {
            pages.push(<div key={i} className={style.pageItem+ ' ' + (this.state.comments.pageNumber === i ? style.currPage: '')}>{i}</div>)
        }
        pages.push(<div key={this.state.comments.totalCount} className={style.pageItem}>下一页</div>);
        return pages;
    }
}

Comment.propTypes = {
    answerId: PropTypes.number,
    closeBtnTap: PropTypes.func
};

export default Comment;