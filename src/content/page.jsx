import React, { Component } from 'react';
import configs from '../config';
import axios from 'axios';
import dateFormat from 'dateformat';

class Pages extends Component {
    constructor(props) {
        super(props);
        this.state = { ArticleData: '' };
    };
    componentWillMount(){
        let that = this;
        let id = this.props.match.params.id;
        axios.get(configs.serverHttpPath + '/Article/' + id).then(function(response) {
            if (response.data.erron === 0){
                that.setState({
                    ArticleData: response.data.data
                });
            } else {
                alert(response.data.message);
            }
        }).catch(function(error) {
        });
    }
    render() {
        document.title = this.state.ArticleData.title + '- 心得';
        return (
            <div className="article pt-5">
                <h1>{this.state.ArticleData.title}</h1>
                <div className="pt-3 pb-4">
                    <span className="pr-3">作者：{this.state.ArticleData.Username}</span>
                    <span className="pr-3 icon-time"> 时间：{dateFormat(this.state.ArticleData.creationTime, 'yyyy-mm-dd')}</span>
                </div>
                <div>
                    <img src={this.state.ArticleData.titleImg} alt="" className="mw-100 pb-5"/>
                    <div dangerouslySetInnerHTML={{__html: this.state.ArticleData.content}}></div>
                </div>
            </div>
        );
    }
}

export default Pages;
