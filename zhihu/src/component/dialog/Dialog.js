/**
 * Created by lzc on 2017/11/24.
 */
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import style from './style/Dialog.css';
import PropTypes from 'prop-types';

/*创建一个覆盖整个客户端页面的div, 所有子元素放入该div中*/
 class Dialog extends Component {
    
    componentDidMount () {
        var node = document.createElement('div'),
            reactDom = (this.props.children);

        this.node = node;

        //阻止整个页面滚动
        window.$(document.body).css('overflow', 'hidden');

        window.$(node).css('top', this.props.top);
        window.$(node).css('left', this.props.left);
        window.$(node).height(this.props.height);
        window.$(node).width(this.props.width);

        window.$(node).addClass(style.dialog);
        document.body.appendChild(node);

        ReactDom.render(reactDom, node);
    }
    // componentDidUpdate

    componentWillReceiveProps (nextProps) {
        var reactDom = nextProps.children,
            node = this.node;
        ReactDom.render(reactDom, node);
        window.$(node).css('top', nextProps.top);
        window.$(node).css('left', nextProps.left);
        window.$(node).height(nextProps.height);
        window.$(node).width(nextProps.width);
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

Dialog.propTypes = {
    top: PropTypes.number,
    left: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
}

Dialog.defaultProps = {
     top: 0,
    left: 0,
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
}

export default Dialog;