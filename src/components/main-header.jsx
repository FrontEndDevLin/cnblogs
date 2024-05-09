import React, { useState, useEffect } from 'react';
import '../layout/header.css';
import { Link }from 'react-router-dom';
import request from '../utils/request';

function MainHeaderComponent() {
    let [isLogin, setIsLogin] = useState(false);
    let [level, setLevel] = useState(0);
    let [userName, setUserName] = useState("");
    let [uid, setUid] = useState("");
    let [title, setTitle] = useState("");
    let [subTitle, setSubTitle] = useState("");

    useEffect(() => {
        request.get({
            url: "user/checkLogin",
            config: {
                credentials: true
            }
        }).then(res => {
            if( res.code == 1 ){
                let { level, uname: userName, uid } = res.data;
                setIsLogin(true);
                setLevel(level);
                setUserName(userName);
                setUid(uid);
            }
        });

        request.get({
            url: "set/getTitle"
        }).then(res => {
            let { title, sub_title: subTitle } = res.data;

            setTitle(title);
            setSubTitle(subTitle);
        });
    }, []);

    function logout() {
        request.get({
            url: "user/logout",
            config: {
                credentials: true
            }
        }).then(res => {
            if( res.code == 1 ) {
                setIsLogin(false);
                setLevel(0);
                setUserName("");
            }
        })
    }

    return (
        <div className="header">
            <div className="header-content">
                <div className="state clear">
                    <p className="user rt" style={{display:isLogin?'none':'block'}}>
                        <Link to="/login">登录</Link>&nbsp;&nbsp;<Link to="/register">注册</Link>
                    </p>
                    <p className="user rt" style={{display:isLogin&&level==1?'block':'none'}}>
                        欢迎回来：<a className="uname">{userName}</a>&nbsp;&nbsp;
                        <a onClick={logout}>注销</a>
                    </p>
                    <p className="user rt" style={{display:isLogin&&level==99?'block':'none'}}>
                        欢迎博主：<a className="uname">{userName}</a>&nbsp;&nbsp;
                        <a onClick={logout}>注销</a>
                    </p>
                </div>
                <h2><Link className="logo" to="/index">{title}</Link></h2>
                <h3 className="words">{subTitle}</h3>
                <div className="nav">
                    <ul className="nav-bar clear">
                        <li><Link to="/index">首页</Link></li>
                        <li style={{'display':level!=99?'none':'block'}}><Link to="/edit-center">新随笔</Link></li>
                        <li style={{'display':level!=99?'none':'block'}}><Link to="/edit-center">管理</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MainHeaderComponent;