/**
 * Created by mdz on 2017/8/16.
 */
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Left extends Component {

    render(){
        return (
            <div className="bg-dark text-center index-left">
                <div className="icon-chevron-right text-white bg-success"></div>
                <ul className="nav flex-column nav-left">
                    <li className="nav-item"><Link to="/index/info" className="nav-link active icon-home"></Link></li>
                    <li className="nav-item"><Link to="/index/topics" className="nav-link icon-list-alt"></Link></li>
                    <li className="nav-item"><Link to="/index/topics" className="nav-link icon-comments"></Link></li>
                    <li className="nav-item"><Link to="/index/topics" className="nav-link icon-group"></Link></li>
                </ul>
            </div>
        );
    }
}

export default Left;