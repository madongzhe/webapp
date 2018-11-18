/**
 * Created by mdz on 2017/8/20.
 */
import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router-dom';

class Breadcrumb extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <nav className="breadcrumb">
                <Link to="/index/info" className="breadcrumb-item icon-home"> 首页</Link>
                <span className="breadcrumb-item active">Bootstrap</span>
            </nav>
        );
    }
}

export default Breadcrumb;