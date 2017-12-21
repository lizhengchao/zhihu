/**
 * Created by lzc on 2017/12/1.
 */
import React, {Component} from "react";
import style from './style/QuestionMain.css';
import PropTypes from 'prop-types';
import QuestionMainTitle from './QuestionMainTitle';
import Navigation from 'component/Navigation';

class QuestionMain extends Component {
    render () {
        return (
            <div>
                <Navigation/>
                <div className={style.questionMain}>
                    <QuestionMainTitle questionData={this.getQuestionData(null)}/>
                </div>
            </div>
        )
    }

    getQuestionData (id) {
        return {
            id: 1,
            content: '学web前端开发，培训还是自学靠谱？',
            description: '先说明问题：想转行做web前端开发工作，但是无从下手。询问别人有的说是培训比较靠谱，也有说自学也没什么问题。所以想在这请教一下师兄们，集思广益，但求少走弯路。'+
            '还是想询问一下，如果我想做这些究竟是找一份工作一边工作一边自学，还是找一个培训机构学习更靠谱一些。第一次在知乎提问，求大神指点迷津。多谢了。',
            topics: [{id: 1, content: '前端开发'}, {id:2, content: 'html', }, {id: 3, content: 'css'}],
            commentCount: 102,
            followCount: 5000,
            watchCount: 100000
        }
    }
}

export default QuestionMain;