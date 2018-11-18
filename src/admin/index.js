/**
 * Created by mdz on 2017/8/15.
 */
import React, { Component,PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Header from './header/header';
import Left from './left/index';
import Info from './content/info';
import { HashRouter,BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class Index extends Component {
    constructor(props) {
        super(props);
    }
    proptype(){
        router: PropTypes.object.isRequired;
    };
    render(){
        document.title = '管理中心';
        return (
            <div className="index">
                <div className="index-header bg-primary"><Header/></div>
                <div className="right">
                    <div className="float-left"><Left/></div>
                    <div className="content">
                        <Route path="/index/info" component={Info}/>
                    </div>

                </div>
            </div>
        );
    }
}

export default Index;