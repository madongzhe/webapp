import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class IndexSlide extends Component {
    render() {
        return (
            <div className="slide row">
                <img src={require('../../public/image/banner.jpg')} style={{width: '100%'}}/>
            </div>
        );
    }
}

export default IndexSlide;
