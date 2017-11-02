/**
 * Created by lzc on 2017/10/27.
 */
import React, {Component} from 'react';
import Navigation from 'component/Navigation';
import NavigationPartingLine from 'component/NavigationPartingLine';
import './Home.css';

class Home extends Component {
    render () {
        var mainListData = {
                from: '来自话题‘音乐’',
                title: '网易云音乐的歌单推荐算法是什么',
                answerUser: {
                    id: 1,
                    name: '王子赢',
                    word: '纯天然段子手',
                    headshot: require('resource/img/test/head-shot.jpg')
                },
                answerImg: require('resource/img/test/answer-img.jpg'),
                answerText: '反正我是服气的。 在私人 FM 里，听到一首很喜欢的歌，只有几个人评论，打开就看到了前男友的评论，以及…… 私信发现真的是同一个前男友！ 真的是相似的人会喜欢同样的歌呢。 同时也挺感慨，虽然有的感情会让你哭，…',
                approveCount: 379,
                commentCount: 157
            };
        var buildMainListDom =  (mainListData) => {
            return (
                <div className="home-list">
                    <div className="card">
                        <div className="gray">{mainListData.from}</div>
                        <div className="title">{mainListData.title}</div>
                        <div className="user">
                            <img src={mainListData.answerUser.headshot}/>
                            <span className="user-name">{mainListData.answerUser.name}</span>
                            <span className="user-word">{mainListData.answerUser.word}</span>
                        </div>
                    </div>
                </div>
            )
        };

        return (
            <div>
                <Navigation selectItemNumber={0}/>
                <NavigationPartingLine/>
                <div className="home-main">
                    <div className="left-part">
                        <div className="card top-part">
                            <div className="top-item-container">
                                <a className="top-item" href=""><img src={require('resource/img/question-logo.jpg')}/>提问</a>
                                <a className="top-item"><img src={require('resource/img/answer-logo.jpg')}/>回答</a>
                                <a className="top-item"><img src={require('resource/img/article-logo.jpg')}/>写文章</a>
                                <a className="top-item"><img src={require('resource/img/idea-logo.jpg')}/>写想法</a>
                            </div>
                            <div className="gray">草稿</div>
                        </div>
                        {buildMainListDom(mainListData)}
                    </div>
                    <div className="right-part">
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Home