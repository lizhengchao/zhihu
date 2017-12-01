/**
 * Created by lzc on 2017/11/27.
 */
import React, {Component} from 'react';
import style from './style/QuestionAskList.css';
import PropTypes from 'prop-types';
import {isParentNodeOf} from 'extra/utils';
import TransitionGroup from 'react-addons-css-transition-group';

class QuestionAskList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            questionList: []
        }
    }

    componentDidMount () {
        this.getQuestionList(this.props.text, (questionList)=>{
            this.setState({
                questionList: questionList
            })
        });

        this.clickFunc = (e) => {
            if(!isParentNodeOf(this.refs['questionList'], e.target)) {
                this.setState({questionList: []});
            }
        };

        window.document.body.addEventListener('click' , this.clickFunc);
    }

    componentWillReceiveProps (nextProps) {
        if(this.props.text !== nextProps.text) {
            this.getQuestionList(nextProps.text, (questionList)=>{
                this.setState({
                    questionList: questionList
                })
            })    
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        if(this.state.questionList === nextState.questionList) {
            return false;
        } else {
            return true;
        }
    }

    componentWillUnmount () {
        window.document.body.removeEventListener('click', this.clickFunc);
    }

    render () {
        var questionList = this.state.questionList;
        
        return (
            <div className={this.props.className} ref="questionList">
                <TransitionGroup transitionName="opacity" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {this.state.questionList.length !== 0 ?
                        <div className={style.questionList}>
                            <div className={style.listHeader}>你的问题可能已经有答案
                                <span className={style.listClose} onClick={()=>{this.setState({questionList: []})}}>关闭</span>
                            </div>
                            {this.buildItem(questionList)}
                        </div> : null}
                </TransitionGroup>
            </div>
        )
    }

    getQuestionList (text, callback) {
        if(text == '') {
            callback([]);
        } else {
            callback([
                {
                    id: 1,
                    content: '中级口译，CATTI,人事部的123级口译，上海什么口译的详细区别是什么啊，到底有几种口译啊？',
                    answerCount: 5
                },
                {
                    id: 2,
                    content: '编辑123？',
                    answerCount: 3
                },
                {
                    id:3,
                    content: 'null123',
                    answerCount: 100
                }
            ])
        }
    }

    buildItem (questionList) {
        var list = [];
        for(let question of questionList) {
            list.push(
                <div className={style.item} key={question.id} onClick={this.itemClick.bind(this, question.id)}>
                    <div className={style.itemContent}>{question.content}</div>
                    <span className={style.itemSpan}>{question.answerCount}个回答</span>
                </div>)
        }
        return list;
    }
    
    itemClick (id) {
        this.setState({questionList: []});
        this.props.itemClick.bind(this, id)();
    }
}

QuestionAskList.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    itemClick: PropTypes.func
}

export default QuestionAskList;