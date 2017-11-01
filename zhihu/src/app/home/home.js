/**
 * Created by lzc on 2017/10/27.
 */
import React, {Component} from 'react';
import Navigation from 'component/Navigation';

class Home extends Component {
    render () {
        return (
            <div>
                <Navigation/>
                this is home {this.props.children}
            </div>
        )
    }
}

export default Home