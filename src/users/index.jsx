import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError, change } from 'redux-form';
import {Link} from 'react-router-dom';
import axios from 'axios';
import configs from '../config';
import { Route, Redirect } from 'react-router-dom';
import asyncComponent from '../AsyncComponent';
const WriteArticle = asyncComponent(() => import('./WriteArticle'));
const ArticleList = asyncComponent(() => import('./ArticleList'));
class userIndex extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="App d-flex">
                <div style={{width: '140px', height: '100vh'}} className="bg-dark">
                    <ul className="nav flex-column">
                        <li className="pt-3"><Link to="/users" className="icon-user icon-width text-white m-3"> 个人设置</Link></li>
                        <li className="pt-3"><Link to="/users/Article" className="icon-list-ul icon-width text-white m-3"> 文章列表</Link></li>
                        <li className="pt-3"><Link to="/users/WriteArticle" className="icon-pencil icon-width text-white m-3"> 添加文章</Link></li>
                    </ul>
                </div>
                <Route path="/users/WriteArticle" component={WriteArticle}/>
                <Route path="/users/EditArticle/:id" component={WriteArticle}/>
                <Route path="/users/Article" component={ArticleList}/>
            </div>
        );
    }
}
export default userIndex;
