/**
 * Created by lzc on 2017/10/27.
 */
import React from 'react';
import Home from 'app/home/Home';
import Sign from 'app/user/sign/Sign';
import QuestionMain from 'app/question/questionmain/QuestionMain';
import {Redirect} from 'react-router';
import {BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const globalFilter = (match) => {
    function getCookie(c_name) {
        var c_start, c_end;
        if (document.cookie.length>0)
        {
            c_start=document.cookie.indexOf(c_name + "=")
            if (c_start!=-1)
            {
                c_start=c_start + c_name.length+1
                c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return decodeURI(document.cookie.substring(c_start,c_end))
            }
        }
        return ""
    }

    if(typeof getCookie('userId') != 'undefined' && getCookie('userId') != '') {
        return null;
    } else if(match.location.pathname.startsWith('/sign')){
        return null;
    } else {
        return (<Redirect to="/sign"/>);
    }
}

const router = () => (
    <Router>
        <div>
            <Route path="/" render={globalFilter}/>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/sign" component={Sign}/>
                <Route path="/questionMain" component={QuestionMain}/>
                <Route render={()=>{return <Redirect to="/home"/>}}/>
            </Switch>

        </div>
    </Router>
);

export default router;