import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError, change } from 'redux-form';
import {Link} from 'react-router-dom';
import axios from 'axios';
import configs from '../config';
import dateFormat from 'dateformat';

class userIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: 1,
            indexdata: '',
            datalength: 10
        };
    }
    loaddata(page){
        if (page > 0 && (this.state.datalength === 10 || page < this.state.page || page === 1)) {
            let that = this;
            let values = {'page': page, 'count': 10};
            axios.get(configs.serverHttpPath + '/Article/' + values.count + '/' + values.page + '/' + sessionStorage.token, {'data': values}).then(function(response) {
                if (response.data.erron === 0){
                    that.setState({
                        data: response.data.data,
                        pages: page
                    });
                } else {
                    alert('失败');
                }
            }).catch(function(error) {
            });
        }
    }
    componentWillMount(){
        this.loaddata(1);
    }
    render() {
        const lis = [];
        let data = this.state.data;
        for (let items in data){
            lis.push(<tr key={items}>
                        <th scope="row">{Number(items) + 1}</th>
                        <td>{data[items].title}</td>
                        <td>{dateFormat(data[items].creationTime, 'yyyy-mm-dd')}</td>
                        <td>
                            <Link to={'/users/EditArticle/' + data[items]._id}><button type="button" className="btn btn-outline-info btn-sm icon-edit icon-width"> 修改</button></Link> <button type="button" onClick={this.delArtcle.bind(this, (data[items]._id))} className="btn btn-outline-danger btn-sm icon-remove icon-width"> 删除</button>
                        </td>
                    </tr>
                    );
        }
        return (
                <div className="w-100">
                    <div className="nav p-3 bg-light align-items-center">
                    <span><Link to="/">首页</Link></span>
                    <span className="m-auto"><h4>文章列表</h4></span>
                </div>
                    <div className="p-5">
                        <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col" style={{width: '100'}}>序号</th>
                            <th scope="col">文章标题</th>
                            <th scope="col" style={{width: '200'}}>发布时间</th>
                            <th scope="col" style={{width: '200'}}>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                            {lis}
                        </tbody>
                    </table>
                    </div>
                    <div className='text-center page'><span onClick={this.loaddata.bind(this, this.state.pages - 1)}>上一页</span> <span onClick={this.loaddata.bind(this, this.state.pages + 1)}>下一页</span></div>
                </div>
        );
    }

    delArtcle(id){
        let that = this;
        axios.delete (configs.serverHttpPath + '/Article/' + id + '?token=' + sessionStorage.token).then(function(response) {
            if (response.data.erron === 0){
                alert('提交成功！');
                that.loaddata(1);
            } else {
                throw new SubmissionError({
                    _error: response.data.message
                });
            }
        });
    }
}
export default userIndex;
