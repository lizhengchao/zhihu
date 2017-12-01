/**
 * Created by lzc on 2017/10/27.
 */
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Navigation from 'component/Navigation';
import StoryCard from 'app/answer/StoryCard';
import NavigationPartingLine from 'component/NavigationPartingLine';
import QuestionAsk from '../question/questionask/QuestionAsk';
import './Home.css';
import {serverUrl} from 'extra/config';
import {getUserId} from 'extra/utils';
import TransitionGroup from 'react-addons-css-transition-group';

class Home extends Component {
    constructor (props) {
        super(props);

        this.questionAsk = this.questionAsk.bind(this);

        this.state = {
            homeList: [],
            showQuestionAsk: false
        }
    }


    componentDidMount () {
        //页面初始化时获取数据
        this.getHomeList((homeList)=>{
            this.setState({homeList: homeList});
        });
    }

    render () {
        var mainListData = this.state.homeList;
        var buildMainListDom =  (mainListData) => {
            var mainListDom = [];
            for(let data of mainListData) {
                mainListDom.push((
                    <StoryCard key={data.id} data={data} />
                ));
            }
            if(mainListDom.length === 0) {
                mainListDom = (<div className="no-data">没有更多数据...</div>);
            }
            return mainListDom;
        };

        return (
            <div>
                <Navigation selectItemNumber={0}/>
                <NavigationPartingLine/>
                <div className="home-main">
                    <div className="left-part">
                        <div className="card top-part">
                            <div className="top-item-container">
                                <a className="top-item" href="" onClick={this.questionAsk}>
                                    <img src={require('resource/img/question-logo.jpg')} alt=""/>提问
                                    {this.state.showQuestionAsk ? <QuestionAsk onCloseClick={()=>{this.setState({showQuestionAsk: false})}}/> : null}
                                </a>
                                <a className="top-item"><img src={require('resource/img/answer-logo.jpg')} alt=""/>回答</a>
                                <a className="top-item"><img src={require('resource/img/article-logo.jpg')} alt=""/>写文章</a>
                                <a className="top-item"><img src={require('resource/img/idea-logo.jpg')} alt=""/>写想法</a>
                            </div>
                            <div className="gray">草稿</div>
                        </div>
                        <div className="home-list" >
                            {buildMainListDom(mainListData)}
                        </div>
                    </div>
                    <div className="right-part">
                        <div className="card category-list">
                            <div className="category live"><div className="img" style={{backgroundImage: 'url('+require('resource/img/live.jpg')+')'}}></div>Live</div>
                            <div className="category book"><div className="img" style={{backgroundImage: 'url('+require('resource/img/book.jpg')+')'}}></div>书店</div>
                            <div className="category desk"><div className="img" style={{backgroundImage: 'url('+require('resource/img/desk.jpg')+')'}}></div>圆桌</div>
                            <div className="category pan"><div className="img" style={{backgroundImage: 'url('+require('resource/img/pan.jpg')+')'}}></div>专栏</div>
                            <div className="category money"><div className="img" style={{backgroundImage: 'url('+require('resource/img/money.jpg')+')'}}></div>付费资讯</div>
                        </div>
                        <div className="card side-bar">
                            <div className="item">我的收藏</div>
                            <div className="item">我关注的问题</div>
                            <div className="item">我的邀请</div>
                            <div className="item">我的礼券</div>
                            <div className="item">社区服务中心</div>
                            <div className="item">版权服务中心</div>
                            <div className="item">公共编辑动态</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getHomeList (callback) {
        var userId = getUserId();
        window.$.get({
            url: serverUrl + '/home/getHomeList',
            data: {
                userId: userId
            },
            success (res) {
                res = JSON.parse(res);
                if(res.errcode !== 0) {
                    console.error('获取主页信息失败，错误信息：' + res.msg);
                } else {
                    callback(res.data);
                }
            },
            error (xmlHttpRequest, textStatus, errorThrown) {
                console.error('获取主页信息失败，服务异常, 错误信息：' + xmlHttpRequest.responseText);    
            }
        })
    }

    questionAsk (e) {
        e.preventDefault();
        this.setState({
            showQuestionAsk: true
        })
    }
}

export default Home