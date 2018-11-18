/**
 * Created by mdz on 2017/8/28.
 */
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import asyncComponent from '../AsyncComponent';
import configs from '../config';

const IndexSlide = asyncComponent(() => import('./index/slide'));
const IndexLists = asyncComponent(() => import('./index/IndexList'));
class ContentIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: this.props.match.params.id ? this.props.match.params.id : 1,
            indexdata: '',
            datalength: 10
        };
    }
    componentWillMount(){
        this.ajaxlist(1);
    }
    ajaxlist(Counts){
        if (Counts > 0 && (this.state.datalength === 10 || Counts < this.state.page || Counts === 1)) {
            let that = this;
            axios.get(configs.serverHttpPath + '/Article/10/' + Counts + '/0').then(function(response) {
                if (response.data.erron === 0){
                    that.setState({
                        indexdata: response.data.data,
                        page: Counts,
                        datalength: response.data.data.length
                    });
                } else {
                    alert('失败');
                }
            }).catch(function(error) {
            });
        }
    }
    render() {
        var items = [];
        for (let item in this.state.indexdata){
            items.push(<IndexLists key={item} data={this.state.indexdata[item]}/>);
        };
        if (this.state.indexdata === ''){
            items.push(<li key="zj"><h1>加载中。。。</h1></li>);
        };
        return (
            <div>
                <IndexSlide/>
                <ul className='nav flex-column mt-5 w-100'>
                {items}
                </ul>
            <div className='text-center page'><span onClick={this.ajaxlist.bind(this, this.state.page - 1)}>上一页</span> <span onClick={this.ajaxlist.bind(this, this.state.page + 1)}>下一页</span></div>
            </div>
        );
    }
}
export default ContentIndex;
