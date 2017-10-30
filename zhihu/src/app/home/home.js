/**
 * Created by lzc on 2017/10/27.
 */
import React, {Component} from 'react'

class Home extends Component {
    render () {
        return (<div>this is home {this.props.children}</div>)
    }
}

export default Home