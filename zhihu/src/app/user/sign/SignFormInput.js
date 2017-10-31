/**
 * Created by lzc on 2017/10/31.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SignFormInput extends  Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className={this.props.className+' input-container'}>
                <input type={this.props.type} placeholder={this.props.placeholder} onChange={(e) => {this.props.onChange(e.target.value);}}
                       onFocus={this.props.onFocus}/>
                <span>{this.props.errmsg}</span>
            </div>
        )
    }
}

SignFormInput.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    errmsg: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    className: PropTypes.string
}

export default SignFormInput;