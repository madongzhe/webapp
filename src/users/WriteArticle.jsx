import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError, change, initialize } from 'redux-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import E from 'wangeditor';
import configs from '../config';

class UsersWriteArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intro: '',
            content: '',
            titleImg: null
        };
    }
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    delimg(){
        this.setState({
            titleImg: null
        });
    }
    upimgs(e){
        var that = this;
        let file = e.target.files[0];
        if (file){
            let param = new FormData(); //  创建form对象
            param.append('file', file, file.name);//  通过append向form对象添加数据
            //  param.append('chunk', '0');//    添加form表单中其他数据
            // console.log(param.get('file')); //  FormData私有类对象，访问不到，可以通过get判断值是否传进去
            if (param.get('file').name === ''){
                return;
            }
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            };
            axios.post(configs.serverHttpPath + '/upload?token=' + sessionStorage.token, param, config)
            .then(function(response) {
                if (response.data.errno === 0){
                    that.setState({
                        titleImg: response.data.data[0]
                    });
                    that.props.dispatch(change('UsersWriteArticle', 'titleImg', response.data.data[0]));
                }
            })
            .catch(function(error) {
                alert('上传图片发生错误！');
            });
        }
    }
    render() {
        let upimg;
        const { error, handleSubmit, pristine, reset, submitting } = this.props;
        if (typeof this.state.titleImg !== 'string'){
            upimg = (<div className="title-img title-img-up d-flex">
                        <span className="icon-picture m-auto icon-2x"></span>
                        <input type="file" onChange={this.upimgs.bind(this)} className="HWcenter opacity-0" />
                    </div>);
        } else {
            upimg = (<div className="title-img title-img-del text-center">
                        <img src={this.state.titleImg} className="m-auto mw-100"/>
                        <div className="icon-remove HWcenter img-del icon-2x" onClick={this.delimg.bind(this)}></div>
                    </div>);
        }
        return (
                <div className="w-100">
                    <div className="nav p-3 bg-light align-items-center">
                        <span><Link to="/">首页</Link></span>
                        <span className="ml-auto"><h4>写文章</h4></span>
                        <button onClick={handleSubmit(this.submit)} className="btn btn-outline-primary ml-auto">发布</button>
                    </div>
                    {error && <div className="fixed-top"><div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <button type="button" className="close" onClick={handleSubmit((this.stopsubmit))}>
                        <span>&times;</span>
                    </button>
                    {error}</div></div>}
                    <form >
                        <div className="container pt-3">
                            {upimg}
                            <Field name="title" type="text" maxLength="80" component="input" className="form-control form-control-lg border-0" placeholder="文章标题"/>
                            {/* 将生成编辑器 */}
                            <div ref="editorElem" style={{ textAlign: 'left' }}>
                            {/* <div dangerouslySetInnerHTML={{__html: this.state.content}}></div> */}
                            </div>
                        </div>
                    </form>
                </div>
        );
    }
    componentDidMount() {
        const elem = this.refs.editorElem;
        const editor = new E(elem);
        // 自定义菜单配置
        editor.customConfig.menus = [
            'head',
            'bold',
            'italic',
            'underline',
            'strikeThrough',
            'foreColor',  // 文字颜色
            'backColor',
            'link',
            'list',
            'justify',
            'image',
            'video',
            'code',
            'undo',  // 撤销
            'redo'
        ];
        editor.customConfig.uploadImgParams = {token: sessionStorage.token};
        editor.customConfig.uploadImgMaxLength = 1;
        editor.customConfig.uploadImgServer = configs.serverHttpPath + '/upload';  // 配置服务器端地址
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.setState({
                content: html
            });
            this.props.dispatch(change('UsersWriteArticle', 'content', html));
        };
        // editor.children = this.state.content;
        editor.create();
        let that = this;
        let id = this.props.match.params.id;
        if (id){
            axios.get(configs.serverHttpPath + '/Article/' + id).then(function(response) {
                if (response.data.erron === 0){
                    // alert('提交成功！');
                    var josndata = response.data.data;
                    that.setState({
                        titleImg: josndata.titleImg,
                        intro: josndata.intro,
                        content: josndata.content,
                        title: josndata.title
                    });
                    that.props.dispatch(initialize('UsersWriteArticle', {
                        titleImg: josndata.titleImg,
                        intro: josndata.intro,
                        content: josndata.content,
                        title: josndata.title,
                        id: id
                    }, ['title', 'id', 'intro', 'content']));
                    editor.txt.html(that.state.content);
                } else {
                    alert(response.data.message);
                }
            }).catch(function(error) {
            });
        }
    };

    /**
     * 提交验证
     * @param {any} values 
     * @returns 
     * @memberof UsersWriteArticle
     */
    submit(values, dispatch, props) {
        let that = this;
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        return sleep(100).then(() => {
        //  simulate server latency
            if (!values.title) {
                throw new SubmissionError({
                    title: '必须填写文章标题',
                    _error: '必须填写文章标题'
                });
            } else if (!values.content || values.content.length < 20) {
                throw new SubmissionError({
                    content: '文章内容不能少于20字',
                    _error: '文章内容不能少于20字'
                });
            } else {
                values.intro = values.content.replace(/(<[^>]+>|&nbsp;)/g, '').substring(0, 120);
                return new Promise(function(resolve, reject){
                    if (!values.id){
                        axios.post(configs.serverHttpPath + '/Article?token=' + sessionStorage.token, {'data': values}).then(function(response) {
                            if (response.data.erron === 0){
                                alert('提交成功！');
                                that.context.router.push('/users/ArticleList');
                            } else {
                                throw new SubmissionError({
                                    _error: response.data.message
                                });
                            }
                            resolve();
                        }).catch(function(error) {
                            reject(error);
                        });
                    } else {
                        axios.put(configs.serverHttpPath + '/Article/' + values.id + '?token=' + sessionStorage.token, {'data': values}).then(function(response) {
                            if (response.data.erron === 0){
                                alert('修改成功！');
                                that.context.router.push('/users/ArticleList');
                            } else {
                                throw new SubmissionError({
                                    _error: response.data.message
                                });
                            }
                            resolve();
                        }).catch(function(error) {
                            reject(error);
                        });
                    }
                });
            }
        });
    };
    /**
     * 清除错误提示
     * @param {any} values 
     * @returns 
     * @memberof UsersWriteArticle
     */
    stopsubmit(values){
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        return sleep(100).then(() => {
        });
    };
}
const mapState = (state) => {
    return {
        todos: state
    };
};
export default reduxForm({
    form: 'UsersWriteArticle'
})(UsersWriteArticle);
