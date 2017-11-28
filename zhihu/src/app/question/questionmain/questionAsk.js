/**
 * Created by lzc on 2017/11/24.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './style/QuestionAsk.css';
import Modal from 'component/modal/Modal';
import QuestionAskList from './QuestionAskList';
import QuestionTopicList from './QuestionTopicList';

class QuestionAsk extends Component {
    constructor (props) {
        super(props);

        this.state = {
            questionTitle: '',
            questionTopic: ''
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
                        <input placeholder="添加话题" onInput={(e)=>{this.setState({questionTopic: e.target.value})}}/>
                        <QuestionTopicList className={style.topicList} text={this.state.questionTopic}/>
                    </div>
                    <div className={style.questionDesContent}>问题描述（可选）：</div>
                    <textarea className={style.questionDes} placeholder="问题背景、条件等详细信息"/>
                    <div>
                        <input className={style.anonymous} type="checkbox"/><span>匿名提问</span>
                    </div>
                </div>
            </Modal>
        )
    }
}

QuestionAsk.propTypes = {
    onCloseClick: PropTypes.func
}

export default QuestionAsk;