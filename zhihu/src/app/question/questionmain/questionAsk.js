/**
 * Created by lzc on 2017/11/24.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'component/modal/Modal';

class QuestionAsk extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <Modal onCloseClick={this.props.onCloseClick}>
                <div>123</div>
            </Modal>
        )
    }
}

QuestionAsk.propTypes = {
    onCloseClick: PropTypes.func
}

export default QuestionAsk;