/**
 * Created by lzc on 2017/11/24.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './style/Modal.css';
import Dialog from '../dialog/Dialog';
import TransitionGroup from 'react-addons-css-transition-group';

class Modal extends Component {
    constructor (props) {
        super(props);

        this.onCloseClick = this.onCloseClick.bind(this);
        this.onBackgroundClick = this.onBackgroundClick.bind(this);

        this.state = {
            showModalMain: false
        }
    }

    componentDidMount () {
        var me = this;
        setTimeout(()=>{
            me.setState({
                showModalMain: true
            })
        }, 0);
    }

    componentWillReceiveProps (nextProps) {

    }

    render () {
        var {width, height, children} = this.props;
        return (
            <Dialog>
                <div className={style.background} onClick={this.onBackgroundClick} ref="background">
                    <TransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                        {
                            this.state.showModalMain ?
                                (<div className={style.modal} style={{width, height}}>
                                    {children}
                                    <div className={style.close} style={{left: width+50}} onClick={this.onCloseClick}>关闭</div>
                                </div>) : null
                        }
                    </TransitionGroup>
                </div>
            </Dialog>
        )
    }

    onCloseClick () {
        this.setState({
            showModalMain: false
        });
        setTimeout(() => {
            this.props.onCloseClick();
        }, 500)
    }

    onBackgroundClick (e) {
        if(e.target === this.refs['background'] || e.target === this.refs['background'].children[0]) {
            this.onCloseClick();
        }
    }
}

Modal.propTypes = {
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) ,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onCloseClick: PropTypes.func
}

Modal.defaultProps = {
    height: 550,
    width: 600
}

export default Modal;