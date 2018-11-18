/**
 * Created by mdz on 2017/8/19.
 */

import React, { Component,PropTypes } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import submit from './InfoSubmit';
import Breadcrumb from '../common/breadcrumb';

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = '不能空！';
    } else if (values.title.length < 2) {
        errors.title = '字数太少！';
    }
    return errors;
}
const renderField = ({
    input,
    label,
    type,
    id,
    meta: { touched, error, warning }
    }) =>
    <div className="form-group row">
        <label htmlFor={id} className="col-sm-2 col-form-label text-right">
            {label}
        </label>
        <div className="col-sm-7">
            <input {...input} id={id} className="form-control" placeholder={label} type={type} />
        </div>
        {touched && ((error &&  <div className="col-sm-3 text-danger">  {error} </div>) ||  (warning && <div className="col-sm-3 text-warning">  {warning} </div>))}
    </div>

class Info extends Component {
    constructor(props) {
        super(props);
    };

    proptype(){
        router: PropTypes.object.isRequired;
    };
    render(){
        const { error,handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <div>
                <div>
                    <Breadcrumb/>
                </div>
                <div className="col-sm-12">
                    <form onSubmit={handleSubmit(submit)}>
                        <Field type="text" component={renderField} name="title" id="inputtitle" label="网站名称" />
                        <Field type="text" component={renderField} name="introduce" id="inputintroduce" label="网站简介" />
                        <Field type="text" component={renderField} name="introduce" id="inputintroduce" label="网址" />
                        {error && <div className="bg-warning"> {error} </div>}
                        <br/>
                        <div className="text-center">
                            <button className="btn btn-primary" type="submit" >提交</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'Info',
    validate
})(Info);
