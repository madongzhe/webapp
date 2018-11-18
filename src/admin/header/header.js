/**
 * Created by mdz on 2017/8/16.
 */
import React, { Component,PropTypes } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {liked: false};
    }
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    loginout= () =>{
        sessionStorage.setItem("adminlogin", false);
        if(sessionStorage.adminlogin=='false'){
            //console.log(this.context.router);
            this.context.router.history.push('/admin');
        }
    };
    tick() {
        this.setState((prevState) => ({
            liked: !prevState.liked
        }));
    }
    render(){
        return (
            <div className="d-flex flex-row">
                <img src={require('../../logo.svg')} className="rounded-circle" style={{height:'3rem'}} />
                <span>后台管理</span>
                <div className="ml-auto bg-primary">
                    <div className={this.state.liked ? 'dropdown show' : 'dropdown'}>
                        <spam className="dropdown-toggle" onClick={this.tick.bind(this)}>
                            管理员
                        </spam>

                        <div className="dropdown-menu">
                            <a className="dropdown-item icon-user" > 个人中心</a>
                            <a className="dropdown-item icon-off" onClick={this.loginout.bind(this)}> 退出</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
