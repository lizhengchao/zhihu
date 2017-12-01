/**
 * Created by lzc on 2017/11/7.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './StoryCard.css';
import Action from './Action';
import Comment from './Comment';
import cs from 'classnames';
import {Link} from 'react-router-dom';

class StoryCard extends React.Component {
    constructor (props) {
        super(props);

        this.contentOnClick = this.contentOnClick.bind(this);

        var matchDom = /<[\s\S]*?>/g;
        
        this.state = {
            from: props.data.topicContent,
            title: props.data.title,
            headshot: props.data.answerUser.headshot,
            name: props.data.answerUser.name,
            word: props.data.answerUser.word,
            answerImg: props.data.answerImg,
            answerText: props.data.answerText,
            approveCount: props.data.approveCount,
            commentCount: props.data.commentCount,
            answerTextNoDom: props.data.answerText.replace(matchDom, ''),
            detail: false, //当前块显示的是详细内容还是大体内容
            fixedBottom: false, //是否需要将Action固定在屏幕下方
            commentOpen: false //评论模块是否打开
        }
    }

    componentDidMount () {
        this.scrollEvent = (e)=>{
            var storyCard = this.refs['storyCard'];
            let scrollTop = window.$(window).scrollTop(),
                clientHeight = document.documentElement.clientHeight,
                storyCardOffsetTop = storyCard.offsetTop,
                storyCardOffsetHeight = storyCard.offsetHeight;

            if(storyCardOffsetTop - scrollTop <= clientHeight*0.5
                && storyCardOffsetTop - scrollTop + storyCardOffsetHeight >= clientHeight) {
                if(!this.state.fixedBottom) {
                    this.setState({fixedBottom: true});
                }
            }  else {
                if(this.state.fixedBottom) {
                    this.setState({fixedBottom: false});
                }
            }
        }
        window.addEventListener('scroll', this.scrollEvent);
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.scrollEvent);
    }
    
    render () {
        return (
            <div className="card story-card">
                <div ref="storyCard">
                    <div className="gray topic">{this.state.from}<img className="fork" src={require('resource/img/fork.jpg')} alt=""/></div>
                    <div className="title"><Link to="/questionMain">{this.state.title}</Link></div>
                    <div className="user">
                        <img src={this.state.headshot} alt=""/>
                        <span className="user-name">{this.state.name}</span>
                        <span className="user-word">{this.state.word}</span>
                    </div>
                    <div className="content" onClick={this.contentOnClick}>
                        <div className={cs({'no-dom-text': true, disable: this.state.detail})}>
                            <div className={cs({'content-img': true, disable: this.state.answerImg == ''})} style={{backgroundImage: 'url(' + this.state.answerImg + ')'}}></div>
                            <div className="text">
                                {this.state.answerTextNoDom.length <=80 ? this.state.answerTextNoDom : this.state.answerTextNoDom.substr(0, 80) + '...'}
                                <span className={cs({'read-all': true, disable: this.state.answerTextNoDom.length <= 80})}>阅读全文</span>
                            </div>
                        </div>
                        <div className={cs({'text': true, disable: !this.state.detail})} dangerouslySetInnerHTML={{__html: this.state.answerText}}></div>
                    </div>
                    <Action approveCount={this.state.approveCount} commentCount={this.state.commentCount} showClose={this.state.detail}
                            closeClick={()=>{this.setState({detail: false})}} fixedBottom={this.state.fixedBottom} commentOpen={this.state.commentOpen}
                            commentClick={()=> {this.setState({commentOpen: !this.state.commentOpen})}}/>
                </div>
                {this.state.commentOpen ? <Comment answerId={this.props.data.id} closeBtnTap={()=>{this.setState({commentOpen: false})}}/> : ''}
            </div>
        );
    }

    contentOnClick () {
        if(this.state.answerTextNoDom.length > 80) {
            this.setState({detail: true});
        }
    }
}

StoryCard.propTypes = {
    data: PropTypes.object,
}

export default StoryCard;