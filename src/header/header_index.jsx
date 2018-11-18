import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import asyncComponent from '../AsyncComponent';
const Login = asyncComponent(() => import('./login'));
class HeaderIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {loginshow: true};
    }
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    loginclick() {
        this.setState((prevState) => ({
            loginshow: !prevState.loginshow
        }));
    }
    loginout= () =>{
        sessionStorage.setItem('state', 'false');
        // if (sessionStorage.state === 'false'){
        //     this.context.router.history.push('/');
        // }
        this.setState({loginshow: true});
    };
    WriteArticle(){
        if (sessionStorage.state === 'true'){
            this.context.router.history.push('/users/WriteArticle');
        } else {
            this.setState((prevState) => ({
                loginshow: !prevState.loginshow
            }));
        }
    }
    onChangeState(stateName){
        this.setState(stateName);
    }
    render() {
        let logins;
        if (sessionStorage.state !== 'true'){
            logins = (
                <ul className="nav ml-auto align-items-center">
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:void(0)" onClick={this.loginclick.bind(this)}>登录</a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Register"><span className="btn btn-outline-success btn-sm badge-pill d-inline">注册</span></Link>
                    </li>
                    <li className="nav-item nav-link">
                    <span className="badge-pill btn btn-danger btn-sm icon-pencil cursor-p quiver" onClick={this.WriteArticle.bind(this)}> 写文章</span>
                    </li>
                </ul>
            );
        } else {
            logins = (
                <ul className="nav ml-auto align-items-center">
                    <li className="nav-item">
                        <Link className="nav-link" to="/users">{sessionStorage.name ? sessionStorage.name : '新用户'}</Link>
                    </li>
                    <li className="nav-item nav-link">
                        <span className="cursor-p btn btn-outline-secondary btn-sm badge-pill d-inline" onClick={this.loginout.bind(this)}>退出</span>
                    </li>
                    <li className="nav-item nav-link">
                        <span className="badge-pill btn btn-danger btn-sm icon-pencil cursor-p quiver" onClick={this.WriteArticle.bind(this)}> 写文章</span>
                    </li>
                </ul>
            );
        }
        return (
            <div className="nav header align-items-center bg-white border-bottomt">
                <Link className="nav-link active" to="/"><img src="/logo.png"/></Link>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/">首页</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">发现</Link>
                    </li>
                    <li className="nav-item">
                        <form className="" style={{marginTop: '8px'}}>
                            <div className="input-group">
                                <input type="text" className="form-control badge-pill form-control-sm" style={{lineHeight: '1.5'}} placeholder="搜索"/>
                                <span className="input-group-btn">
                                   <button className="btn btn-secondary badge-pill icon-search btn-sm" type="button"> </button>
                                </span>
                            </div>
                        </form>
                    </li>
                </ul>
                {logins}
                <Login loginshow={this.state.loginshow} changeState={this.onChangeState.bind(this)} />
            </div>
        );
    }
}
export default HeaderIndex;
