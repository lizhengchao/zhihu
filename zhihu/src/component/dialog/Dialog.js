/**
 * Created by lzc on 2017/11/24.
 */
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import style from './style/Dialog.css';

/*创建一个覆盖整个客户端页面的div, 所有子元素放入该div中*/
export default class Dialog extends Component {
    
    componentDidMount () {
        var node = document.createElement('div'),
            reactDom = (this.props.children);

        this.node = node;

        //阻止整个页面滚动
        window.$(document.body).css('overflow', 'hidden');

        window.$(node).height(document.documentElement.clientHeight);
        window.$(node).width(document.documentElement.clientWidth);
        window.$(node).addClass(style.dialog);
        document.body.appendChild(node);

        ReactDom.render(reactDom, node);
    }
    // componentDidUpdate

    componentWillReceiveProps (nextProps) {
        var reactDom = nextProps.children;
        ReactDom.render(reactDom, this.node);
    }
    
    componentWillUnmount () {
        ReactDom.unmountComponentAtNode(this.node);
        document.body.removeChild(this.node);
        window.$(document.body).css('overflow', 'initial');
    }
    
    render () {
        return null;
    }
}