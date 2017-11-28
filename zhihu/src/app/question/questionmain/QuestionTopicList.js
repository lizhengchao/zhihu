/**
 * Created by lzc on 2017/11/27.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './style/QuestionTopicList.css';
import TransitionGroup from 'react-addons-css-transition-group';
import {isParentNodeOf} from 'extra/utils';

class QuestionTopicList extends Component {

    constructor (props) {
        super(props);

        this.state = {
            topicList: []
        }
    }

    componentDidMount () {
        this.getData(this.props.text, (data) => {
            this.setState({
                topicList: data
            })
        });
        
        this.clickEvent = (e) => {
            if(!isParentNodeOf(this.refs['questionTopic'], e.target)) {
                this.setState({topicList: []});
            } else {

            }
        };
        window.document.body.addEventListener('click', this.clickEvent);
    }

    componentWillReceiveProps (nextProps) {
        if(this.props.text !== nextProps.text) {
            this.getData(nextProps.text, (data) => {
                this.setState({
                    topicList: data
                })
            });
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        if(this.state.topicList === nextState.topicList) {
            return false;
        } else {
            return true;
        }
    }
    
    componentWillUnmount () {
        window.document.body.removeEventListener('click', this.clickEvent);
    }

    render () {
        var topicList = this.state.topicList;
        return (
            <div className={this.props.className} ref="questionTopic">
                <TransitionGroup transitionName="opacity" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {topicList.length !== 0 ? (
                        <div className={style.topicList}>
                            {this.buildList(topicList)}
                        </div>
                    ) : null}
                </TransitionGroup>
            </div>
        )
    }

    getData (text, callback) {
        if(text == '') {
            callback([]);
        } else {
            callback( [
                {
                    id: 1,
                    content: '文化11111'
                },
                {
                    id: 2,
                    content: '科技'
                },
                {
                    id: 3,
                    content: '政治'
                },
                {
                    id: 4,
                    content: '宗教'
                },
                {
                    id: 5,
                    content: '经济'
                }
            ]);    
        }
    }

    buildList (topicList) {
        var list = [];
        for (var topic of topicList) {
            list.push(
                <div className={style.item} key={topic.id}>
                    {topic.content}
                </div>
            )
        }
        return list;
    }
}

QuestionTopicList.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string
}

export default QuestionTopicList;