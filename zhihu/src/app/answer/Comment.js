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
        this.pageClick = this.pageClick.bind(this);
        this.sortClick = this.sortClick.bind(this);
        this.getComments = this.getComments.bind(this);
        
        this.answerId = props.answerId;
        this.pageSize = 5;
        this.curPageIndex = 0;

        this.state = {
            comments: {comment: []},
            sortType: 0, //0:默认排序，1:时间排序
            inputing: false,
            showCloseBtn: false,
            closeBtnLeft: 0
        }

    }

    componentDidMount () {
        this.getComments((comments) => {
            this.setState({comments: comments})
        });

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
                    <div className={style.sortType} onClick={this.sortClick}>{this.state.sortType === 0 ? '按默认排序' : '按时间排序'}</div>
                </div>
                {this.state.comments.comment.length === 0 ?
                    (<div className={style.loadingContainer}>
                        <div className={style.loading} style={{animation:'moreBottom 0.4s linear 0s infinite alternate'}}></div>
                        <div className={style.loading} style={{animation:'moreBottom 0.4s linear 0.1s infinite alternate'}}></div>
                        <div className={style.loading} style={{animation:'moreBottom 0.4s linear 0.2s infinite alternate'}}></div>
                        <div className={style.loading} style={{animation:'moreBottom 0.4s linear 0.3s infinite alternate'}}></div>
                        <div className={style.loading} style={{animation:'moreBottom 0.4s linear 0.4s infinite alternate'}}></div>
                    </div>) :
                    (<div>
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
                    </div>)
                }
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
        var pages = [],
            totalCount = this.state.comments.totalCount,
            curPageIndex = this.curPageIndex,
            pushList = (start, count) => {
                for(let i=start; i<count; i++) {
                    pages.push(<div key={i} className={style.pageItem+ ' ' + (this.curPageIndex === i ? style.currPage: '')} onClick={this.pageClick.bind(this, i)}>{i + 1}</div>)
                }
            }
        if(totalCount > 6) {
            if(curPageIndex < 3) {
                pushList(0, 4);
                pages.push(<div key={'more'} className={style.pageItem}>...</div>);
                pages.push(<div key={totalCount} className={style.pageItem} onClick={this.pageClick.bind(this, totalCount)}>{totalCount}</div>);
            } else if (curPageIndex > totalCount-4) {
                pages.push(<div key={0} className={style.pageItem} onClick={this.pageClick.bind(this, 0)}>{1}</div>);
                pages.push(<div key={'more'} className={style.pageItem}>...</div>);
                pushList(totalCount-4, totalCount);
            } else {
                pages.push(<div key={0} className={style.pageItem} onClick={this.pageClick.bind(this, 0)}>{1}</div>);
                pages.push(<div key={'more'} className={style.pageItem}>...</div>);
                pushList(curPageIndex-1, curPageIndex+2);
                pages.push(<div key={'more1'} className={style.pageItem}>...</div>);
                pages.push(<div key={totalCount} className={style.pageItem} onClick={this.pageClick.bind(this, totalCount)}>{totalCount}</div>);
            }
        } else {
            pushList(0, totalCount);
        }
        pages.push(<div key={'next'} className={style.pageItem} onClick={this.pageClick.bind(this, curPageIndex+1)}>下一页</div>);
        return pages;
    }

    pageClick (pageIndex) {
        this.curPageIndex = pageIndex;
        this.getComments((comments)=>{
            this.setState({comments: comments});
        })
    }

    sortClick () {
        this.state.sortType = this.state.sortType === 0 ? 1:0;
        this.getComments((comments) => {
            this.setState({
                comments: comments,
                sortType: this.state.sortType
            })
        })
    }

    getComments (callback) {
        window.$.get({
            url: serverUrl + '/comment/getCommentsDataByAnswerId',
            data: {
                id: this.answerId,
                pageSize: this.pageSize,
                pageIndex: this.curPageIndex,
                order: this.state.sortType === 0 ? '' : 'time'
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
        });
    }
}

Comment.propTypes = {
    answerId: PropTypes.number,
    closeBtnTap: PropTypes.func
};

export default Comment;