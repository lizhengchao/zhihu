/**
 * Created by lzc on 2017/10/27.
 */
import React, {Component} from 'react';
import Navigation from 'component/Navigation';
import StoryCard from 'app/answer/StoryCard';
import NavigationPartingLine from 'component/NavigationPartingLine';
import './Home.css';
import cs from 'classnames';

class Home extends Component {
    componentDidMount () {
        
    }

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
                answerText: '<span><p>这两天出差沪上，和客人朋友们见面。</p><p>客人A和B是一对闺蜜，以前都是一起出现，</p><p>后来A常一个人来，</p><p>今天两个人又都一起来了，我看到很开心。</p><p><br/></p><p>于是三人又像往常一样出去喝了个下午茶，</p></span>' +
                '<span><p>这两天出差沪上，和客人朋友们见面。</p><p>客人A和B是一对闺蜜，以前都是一起出现，</p><p>后来A常一个人来，</p><p>今天两个人又都一起来了，我看到很开心。</p><p><br/></p><p>于是三人又像往常一样出去喝了个下午茶，</p></span>' +
                '<span><p>这两天出差沪上，和客人朋友们见面。</p><p>客人A和B是一对闺蜜，以前都是一起出现，</p><p>后来A常一个人来，</p><p>今天两个人又都一起来了，我看到很开心。</p><p><br/></p><p>于是三人又像往常一样出去喝了个下午茶，</p></span>' +
                '<span><p>这两天出差沪上，和客人朋友们见面。</p><p>客人A和B是一对闺蜜，以前都是一起出现，</p><p>后来A常一个人来，</p><p>今天两个人又都一起来了，我看到很开心。</p><p><br/></p><p>于是三人又像往常一样出去喝了个下午茶，</p></span>' +
                '<span><p>这两天出差沪上，和客人朋友们见面。</p><p>客人A和B是一对闺蜜，以前都是一起出现，</p><p>后来A常一个人来，</p><p>今天两个人又都一起来了，我看到很开心。</p><p><br/></p><p>于是三人又像往常一样出去喝了个下午茶，</p></span>',
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
                // answerText: '123',
                approveCount: 379,
                commentCount: 157
            },
            {
                id: 3,
                from: '来自话题‘音乐’',
                title: '网易云音乐的歌单推荐算法是什么',
                answerUser: {
                    id: 1,
                    name: '王子赢',
                    word: '纯天然段子手',
                    headshot: require('resource/img/test/head-shot.jpg')
                },
                answerImg: '',
                answerText: '<span><p>这两天出差沪上，和客人朋友们见面。</p><p>客人A和B是一对闺蜜，以前都是一起出现，</p><p>后来A常一个人来，</p><p>今天两个人又都一起来了，我看到很开心。</p><p><br/></p><p>于是三人又像往常一样出去喝了个下午茶，</p></span>' +
                '<span><p>这两天出差沪上，和客人朋友们见面。</p><p>客人A和B是一对闺蜜，以前都是一起出现，</p><p>后来A常一个人来，</p><p>今天两个人又都一起来了，我看到很开心。</p><p><br/></p><p>于是三人又像往常一样出去喝了个下午茶，</p></span>' +
                '<span><p>这两天出差沪上，和客人朋友们见面。</p><p>客人A和B是一对闺蜜，以前都是一起出现，</p><p>后来A常一个人来，</p><p>今天两个人又都一起来了，我看到很开心。</p><p><br/></p><p>于是三人又像往常一样出去喝了个下午茶，</p></span>' +
                '<span><p>这两天出差沪上，和客人朋友们见面。</p><p>客人A和B是一对闺蜜，以前都是一起出现，</p><p>后来A常一个人来，</p><p>今天两个人又都一起来了，我看到很开心。</p><p><br/></p><p>于是三人又像往常一样出去喝了个下午茶，</p></span>' +
                '<span><p>这两天出差沪上，和客人朋友们见面。</p><p>客人A和B是一对闺蜜，以前都是一起出现，</p><p>后来A常一个人来，</p><p>今天两个人又都一起来了，我看到很开心。</p><p><br/></p><p>于是三人又像往常一样出去喝了个下午茶，</p></span>',
                approveCount: 379,
                commentCount: 157
            },
            {
                id: 4,
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
                // answerText: '123',
                approveCount: 379,
                commentCount: 157
            }
        ];
        var buildMainListDom =  (mainListData) => {
            var mainListDom = [];
            for(let data of mainListData) {
                mainListDom.push((
                    <StoryCard key={data.id} data={data} />
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
                                <a className="top-item" href=""><img src={require('resource/img/question-logo.jpg')} alt=""/>提问</a>
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
}

export default Home