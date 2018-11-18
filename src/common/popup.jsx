import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Popup(props){
    <div className="modal">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{props.title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-className="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p>弹窗内容！</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary">确定</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">关闭</button>
            </div>
            </div>
        </div>
    </div>;
};

export default Popup;
