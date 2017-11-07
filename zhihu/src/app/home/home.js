/**
 * Created by lzc on 2017/10/27.
 */
import React, {Component} from 'react';
import Navigation from 'component/Navigation';
import NavigationPartingLine from 'component/NavigationPartingLine';
import './Home.css';
import cs from 'classnames';

class Home extends Component {
    render () {
        var mainListData = [
            {
                id: 1,
                from: '来自话题‘音乐’',
                title: '网易云音乐的歌单推荐算法是什么',
                answerUser: {
                    id: 1,
                    name: '王子赢',
                    word: '纯天然段子手',
                    headshot: require('resource/img/test/head-shot.jpg')
                },
                answerImg: require('resource/img/test/answer-img2.jpg'),
                answerText: '本人男，只想说下我身边的外国人对中国女生的评论。1.一位埃及人，四五十岁，有段时间一直缠着我给他介绍中国女朋友，我说你都结婚了为什么还要找女朋友，“因为你们中国女人喜欢外国人呀？”WTF......2.一位苏格兰人，他有次去大连出差，酒吧泡了个姑娘吧大概，于是在办公室跟同事分享，意思是去中国吧，中国女孩会主动接近你跟你回酒店哦....3.一位威尔士人，跟我说你们中国女生什么毛病，为什么XX前一定要洗澡.4.一位美国人，跟我分享他和不同女生在一起的照片，说去过那么多国家，中国女生最容易跟他回酒店，还跟我分享detail，我觉得一阵脸红加恶心，一向性格温和的我硬是翻脸了……。当然也有真爱的，同样是有位美国的同事，人很绅士，跟我说他女朋友是中国人，他很爱她，交谈的时候也能感觉到那种真诚。我只想说，中国女孩子们，被外国人搭讪的时候头脑清醒些，不要成为他们在你的中国男同胞们面前炫耀和调侃的内容.',
                approveCount: 379,
                commentCount: 157
            },
            {
                id: 2,
                from: '来自话题‘音乐’',
                title: '网易云音乐的歌单推荐算法是什么',
                answerUser: {
                    id: 1,
                    name: '王子赢',
                    word: '纯天然段子手',
                    headshot: require('resource/img/test/head-shot.jpg')
                },
                answerImg: '',
                answerText: '反正我是服气的。 在私人 FM 里，听到一首很喜欢的歌，只有几个人评论，打开就看到了前男友的评论，以及…… 私信发现真的是同一个前男友！ 真的是相似的人会喜欢同样的歌呢。 同时也挺感慨，虽然有的感情会让你哭',
                approveCount: 379,
                commentCount: 157
            }
        ];
        var buildMainListDom =  (mainListData) => {
            var mainListDom = [];
            for(let data of mainListData) {
                mainListDom.push((
                    <div className="home-list" key={data.id}>
                        <div className="card">
                            <div className="gray topic">{data.from}</div>
                            <div className="title">{data.title}</div>
                            <div className="user">
                                <img src={data.answerUser.headshot}/>
                                <span className="user-name">{data.answerUser.name}</span>
                                <span className="user-word">{data.answerUser.word}</span>
                            </div>
                            <div className="content">
                                <div className={cs({'content-img': true, disable: data.answerImg == ''})} style={{backgroundImage: 'url(' + data.answerImg + ')'}}></div>
                                <div className="text">{data.answerText.length > 80 ? data.answerText.substr(0, 80) + '...' : data.answerText}
                                    <span className={cs({'read-all': true, disable: data.answerText.length <= 80})}>阅读全文</span>
                                </div>
                            </div>
                            <div className="action">
                                <div className="approve"><div className="triangle-up"></div>{data.approveCount}</div>
                                <div className="disapprove"><div className="triangle-down"></div></div>
                                <div className="comment">{data.commentCount}人评论</div>
                                <div className="share">分享</div>
                                <div className="collect">收藏</div>
                                <div className="thank">感谢</div>
                                <svg className="more" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em" data-reactid="312"><path d="M5 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fillRule="evenodd" data-reactid="313"></path></svg>
                            </div>
                        </div>
                    </div>
                ));
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