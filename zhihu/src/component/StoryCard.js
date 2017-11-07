/**
 * Created by lzc on 2017/11/7.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './StoryCard.css';
import Action from 'component/Action';
import cs from 'classnames';

class StoryCard extends React.Component {
    constructor (props) {
        super(props);

        var matchDom = /<[\s\S]*?>/g;
        
        this.state = {
            from: props.data.from,
            title: props.data.title,
            headshot: props.data.answerUser.headshot,
            name: props.data.answerUser.name,
            word: props.data.answerUser.word,
            answerImg: props.data.answerImg,
            answerText: props.data.answerText,
            approveCount: props.data.approveCount,
            commentCount: props.data.commentCount,
            answerTextNoDom: props.data.answerText.replace(matchDom, ''),
            detail: false //当前块显示的是详细内容还是大体内容
        }
    }
    
    render () {
        return (
            <div className="card story-card">
                <div className="gray topic">{this.state.from}<img className="fork" src={require('resource/img/fork.jpg')}/></div>
                <div className="title">{this.state.title}</div>
                <div className="user">
                    <img src={this.state.headshot}/>
                    <span className="user-name">{this.state.name}</span>
                    <span className="user-word">{this.state.word}</span>
                </div>
                <div className="content" onClick={()=>{this.setState({detail: true})}}>
                    <div className={cs({'no-dom-text': true, disable: this.state.detail})}>
                        <div className={cs({'content-img': true, disable: this.state.answerImg == ''})} style={{backgroundImage: 'url(' + this.state.answerImg + ')'}}></div>
                        <div className="text">
                            {this.state.answerTextNoDom.length <=80 ? this.state.answerTextNoDom : this.state.answerTextNoDom.substr(0, 80) + '...'}
                            <span className={cs({'read-all': true, disable: this.state.answerTextNoDom.length <= 80})}>阅读全文<div className="down"></div></span>
                        </div>
                    </div>
                    <div className={cs({'text': true, disable: !this.state.detail})} dangerouslySetInnerHTML={{__html: this.state.answerText}}></div>
                </div>
                <Action approveCount={this.state.approveCount} commentCount={this.state.commentCount} closeClick={()=>{this.setState({detail: false})}}/>
            </div>
        );
    }
}

StoryCard.propTypes = {
    data: PropTypes.object,
}

export default StoryCard;