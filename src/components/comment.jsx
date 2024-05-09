import React, { Component, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import request from '../utils/request';

function CommentComponent({ sendBid }) {
    let [isLogin, setIsLogin] = useState(false);
    let [ uid, setUid ] = useState("");
    let [ commList, setCommList ] = useState([]);

    let commInput = useRef();

    useEffect(() => {
        request.get({
            url: "user/checkLogin",
            config: {
                credentials: true
            }
        }).then(res => {
            if (res.code == 1) {
                setIsLogin(true);
                setUid(res.data.uid);
            }
        });

        getComm();
    }, []);

    function getComm() {
        if(sendBid.tid){
            request.get({
                url: "comm/getComm",
                params: {
                    bid: sendBid.tid
                }
            }).then(res => {
                setCommList(res.data)
            })
        }
    }

    function loadComm(data) {
        var jsxHtml = [];
        for(var i=0;i<data.length;i++){
            jsxHtml.push(<div className="comment-one" key={i}>
                <p><a>#{i+1}楼</a>&nbsp;&nbsp; <span className="comment-time">{new Date(data[i].cTime).toLocaleString()}</span>&nbsp;&nbsp; 
                <a className="comment-user">{data[i].cname}</a></p>
                <div className="comment-content">
                    {data[i].content}
                </div>
            </div>)
        }
        return jsxHtml;
    }

    function pubComm() {
        var content = commInput.current.value;
        var bid = sendBid.tid;
        if(uid && content.trim()){
            request.get({
                url: "comm/pubComm",
                params: {
                    bid,
                    cuid: uid,
                    content
                }
            }).then(res => {
                if(res.code == 1){
                    commInput.current.value = "";
                    getComm();
                }
            })
        }
    }

    return (
        <>
            <div className="content-item">
                <div className="comment-box">
                    <p className="comment-name">评论列表</p>
                    <div className="comment-list">
                        {loadComm(commList)}
                        {/*<div className="comment-one">
                            <p><a href="javascript:;">#1楼</a>&nbsp;&nbsp; <span className="comment-time">2017-07-06 10:29</span>&nbsp;&nbsp; <a href="javascript:;" className="comment-user">Lin_HR</a></p>
                            <div className="comment-content">
                                这句时，会不会报错？是.map报错还是i.setId()报错？
                            </div>
                        </div>*/}
                    </div>
                </div>
            </div>
            <div className="content-item">
                <div className="comment-input-box">
                    {/*<!-- 已登录 -->*/}
                    <div className="comment clear" style={{'display':isLogin?'block' : 'none'}}>
                        <textarea cols="30" rows="5" placeholder="想说点什么..." ref={ commInput }></textarea>
                        <button className="report rt" onClick={pubComm}>发表</button>
                    </div>
                    {/*<!-- 未登录 -->*/}
                    <div className="cover" style={{'display':isLogin?'none' : 'block'}}>
                        <p>
                            <i className="cover-icon"></i>注册用户登录后才能发表评论，请&nbsp;
                            <Link to="/login">登录</Link>&nbsp;
                            或&nbsp;
                            <Link to="/register">注册</Link>&nbsp;，访问&nbsp;<Link to="/index">网站首页</Link>&nbsp;。
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommentComponent;