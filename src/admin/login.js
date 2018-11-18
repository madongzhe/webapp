import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import logo from '../logo.svg';
import './login.css';
import submit from './submit';

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
    }) =>
        <input {...input} placeholder={label} type={type} className="form-control" />

class App extends Component {
    componentDidUpdate(){
        if(sessionStorage.adminlogin=='true'){
            this.props.history.push('/admin/index');
        }
    }
    render() {
        const { error,handleSubmit, pristine, reset, submitting } = this.props;
        document.title = '后台登录';
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} className="login-logo" alt="logo" />
                    <h2>后台登录</h2>
                    <form onSubmit={handleSubmit(submit)}>
                        {error && <div className="bg-warning"> {error} </div>}
                        <div className="padding">
                            <div className="input-group">
                            <span className="input-group-addon icon-user icon-width icon-large">

                            </span>
                                <Field name="inputName" component={renderField} type="text" label="用户名" />
                            </div>
                            <br/>
                            <div className="input-group">
                            <span className="input-group-addon icon-lock icon-width icon-large">

                            </span>
                                <Field name="paw" component={renderField} type="password" label="密码" />
                            </div>
                            <br/>
                        </div>
                        <button className="btn btn-blue btn-xm" type="submit" >登录</button>
                    </form>
                </div>
            </div>
        );
    }
}
    export default reduxForm({
        form: 'simple'
    })(App);
