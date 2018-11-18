
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

function IndexLists(props){
    function delHtmlTag(str) {
        return str.replace(/(<[^>]+>|&nbsp;)/g, ''); // 去掉所有的html标记
    }
    var cls = props.data.titleImg ? 'ml-3 text-center d-none d-md-block' : 'ml-3 text-center d-none';
    return <li className="mb-3 pb-3 border-bottomt border-lightx m-l">
                <div className="media">
                    <div className="media-body">
                        <div></div>
                        <Link to={`/p/${props.data._id}`}><h5 className="mt-0 font-weight-bold text-dark">{props.data.title}</h5></Link>
                        <p dangerouslySetInnerHTML={{__html: delHtmlTag(props.data.intro).substring(0, 120)}}/>
                        {/* <p className="">{delHtmlTag(props.data.content).substring(0, 120)}</p> */}
                        <div></div>
                    </div>
                    <Link to={`/p/${props.data._id}`} className={cls} style={{width: '16rem', height: '6rem'}} hidden={props.data.titleImg ? false : true}>
                        <img src={props.data.titleImg} style={{maxWidth: '16rem', maxHeight: '6rem'}}/>
                    </Link>
                </div>
                <div className="media small text-muted">
                    <span>发布时间：</span>
                    <span className="mr-3">{dateFormat(props.data.creationTime, 'yyyy-mm-dd')}</span>
                    <span>作者：</span>
                    <span className="mr-3">{props.data.Username}</span>
                    <span>热度：</span>
                    <span className="mr-3">{props.data.cmtNum}</span>
                </div>
            </li>;
};

export default IndexLists;
