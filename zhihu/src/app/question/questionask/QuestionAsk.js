/**
 * Created by lzc on 2017/11/24.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './style/QuestionAsk.css';
import Modal from 'component/modal/Modal';
import QuestionAskList from './QuestionAskList';
import QuestionTopicList from './QuestionTopicList';
import TopicContainer from './TopicContainer';

class QuestionAsk extends Component {
    constructor (props) {
        super(props);

        this.questionTopicClick = this.questionTopicClick.bind(this);
        this.topicContainerCloseClick = this.topicContainerCloseClick.bind(this);

        this.state = {
            questionTitle: '',
            questionTopic: '',
            topicList: []
        }

        this.questionDes = '';
        this.questionAnonymous = false;
    }

    render () {
        return (
            <Modal onCloseClick={this.props.onCloseClick}>
                <div className={style.main}>
                    <div className={style.title}>写下你的问题</div>
                    <div className={style.titleDes}>描述精确的问题更易得到解答</div>
                    <div className={style.questionTitle}>
                        <textarea placeholder="问题标题" onInput={(e)=>{this.setState({questionTitle: e.target.value})}}/>
                        <QuestionAskList className={style.questionList} text={this.state.questionTitle} itemClick={(id)=>{console.info('questionList item tap, id:' + id)}}/>
                    </div>
                    {!this.state.questionTitle.endsWith('?') && this.state.questionTitle !== '' ? <div className={style.titleLabel}>你还没有加上？</div> : null}
                    <div className={style.questionTopic}>
                        <TopicContainer items={this.state.topicList} onCloseClick={this.topicContainerCloseClick}/>
                        <input placeholder="添加话题" onInput={(e)=>{this.setState({questionTopic: e.target.value})}}/>
                        <QuestionTopicList className={style.topicList} text={this.state.questionTopic} itemClick={this.questionTopicClick}/>
                    </div>
                    <div className={style.questionDesContent}>问题描述（可选）：</div>
                    <textarea className={style.questionDes} placeholder="问题背景、条件等详细信息"/>
                    <div>
                        <input className={style.anonymous} type="checkbox"/><span>匿名提问</span>
                    </div>
                    <div><button className={style.subBtn}>提交问题</button></div>
                </div>
            </Modal>
        )
    }

    questionTopicClick (id, content) {
        var newTopicList = this.state.topicList.slice(0, this.state.topicList.length);
        newTopicList.push({id, content});
        this.setState({topicList: newTopicList});
    }

    topicContainerCloseClick (id) {
        var newTopicList = this.state.topicList.slice(0, this.state.topicList.length);
        newTopicList.forEach((topic, number) => {
            if(topic.id === id) {
                newTopicList.splice(number, 1);
                this.setState({topicList: newTopicList});
            }
        })
    }
}

QuestionAsk.propTypes = {
    onCloseClick: PropTypes.func
}

export default QuestionAsk;