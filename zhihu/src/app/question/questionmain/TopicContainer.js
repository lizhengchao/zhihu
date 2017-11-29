/**
 * Created by lzc on 2017/11/29.
 */
import React, {Component} from 'react';
import style from './style/TopicContainer.css';
import propTypes from 'prop-types';

class TopicContainer extends Component {
    render () {
        return (
            <div className={style.topicContainer}>
                {this.buildItems(this.props.items)}
            </div>
        )
    }
    
    buildItems (items) {
        var list = [];
        for (let item of items) {
            list.push(
                <div className={style.topicItem} key={item.id} onClick={this.props.onCloseClick.bind(this, item.id)}>
                    {item.content}
                    <svg class="Zi Zi--Close" fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em"><path d="M13.486 12l5.208-5.207a1.048 1.048 0 0 0-.006-1.483 1.046 1.046 0 0 0-1.482-.005L12 10.514 6.793 5.305a1.048 1.048 0 0 0-1.483.005 1.046 1.046 0 0 0-.005 1.483L10.514 12l-5.208 5.207a1.048 1.048 0 0 0 .006 1.483 1.046 1.046 0 0 0 1.482.005L12 13.486l5.207 5.208a1.048 1.048 0 0 0 1.483-.006 1.046 1.046 0 0 0 .005-1.482L13.486 12z" fill-rule="evenodd"></path></svg>
                </div>
            )
        }
        return list;
    }
}

TopicContainer.propTypes = {
    items: propTypes.array,
    onCloseClick: propTypes.func
}

export default TopicContainer;