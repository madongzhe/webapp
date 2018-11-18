import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
    }) =>
    <input {...input} placeholder={label} type={type} className="form-control" />;
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { loginshow: props.loginshow, addResponseFlagHas: false };
    };
    // proptype() {
    //     loginshow: PropTypes.bool.isRequired;
    // };

    loginclick() {
        this.setState((prevState) => ({
            loginshow: !prevState.loginshow
        }));
    };

    componentDidUpdate() {
        let addResponseFlagHas = this.state.addResponseFlagHas; //  防止多次执行
        if (sessionStorage.state === 'true' && !addResponseFlagHas) {
            this.props.changeState({ loginshow: true });
            this.setState({ addResponseFlagHas: true });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.loginshow !== nextProps.loginshow) {
            this.setState((prevState) => ({
                loginshow: !prevState.loginshow,
                addResponseFlagHas: false
            }));
        }
    }

    render() {
        const { error, handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <div className="wrapper" hidden={this.state.loginshow}>
                <div className="login">
                    <div className="login-content rounded">
                        <h2>登录</h2>
                        <br />
                        <br />
                        <form onSubmit={handleSubmit(submit)} autoComplete="off">
                            {error && <div className="bg-warning"> {error} </div>}
                            <div className="padding">
                                <div className="input-group">
                                    <span className="input-group-addon icon-user icon-width icon-large">
                                    </span>
                                    <Field name="LoginName" component={renderField} type="text" label="用户名" />
                                </div>
                                <br />
                                <div className="input-group">
                                    <span className="input-group-addon icon-lock icon-width icon-large">
                                    </span>
                                    <Field name="LoginPaw" component={renderField} type="password" label="密码" />
                                </div>
                                <br />
                            </div>
                            <button className="btn btn-primary btn-xm mr-xl-3" type="submit" role="button">登录</button>
                            <button className="btn  btn-xm" onClick={this.loginclick.bind(this)} type="button" role="button">取消</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'Login'
})(Login);
