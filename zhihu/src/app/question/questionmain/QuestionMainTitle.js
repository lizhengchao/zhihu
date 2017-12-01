/**
 * Created by lzc on 2017/12/1.
 */
import React, {Component} from "react";
import style from './style/QuestionMainTitle.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class QuestionMainTitle extends Component {
    render () {
        return (
            <div className={style.main}>
                <div className={style.leftPart}>
                    <div className={style.topicContainer}>
                        {this.buildTopicList(this.props.questionData.topics)}
                    </div>
                </div>
                <div className={style.rightPart}></div>
            </div>
        )
    }

    buildTopicList (topics) {
        var topicDoms = [];
        for (let topic of topics) {
            topicDoms.push(<div key={topic.id} className={style.topic}><Link to={this.buildTopicLocation(topic.id)}>{topic.content}</Link></div>)
        }
        return topicDoms;
    }

    //TODO: to build topic location
    buildTopicLocation (id) {
        return "/home";
    }
}

QuestionMainTitle.propTypes = {
    questionData: PropTypes.object
}

export default QuestionMainTitle;