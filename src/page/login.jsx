import React, { useState, useEffect, useRef } from 'react';
import '../layout/init.css';
import '../layout/login-reg.css';
import { Link, Redirect } from 'react-router-dom';
import MainFooterComponent from '../components/main-footer';

import request from "../utils/request";

function LoginComponent() {
    let [title, setTitle] = useState("");
    let [loginSuc, setLoginSuc] = useState(false);
    let [tip, setTip] = useState("");

    let my_name = useRef();
    let my_pwd = useRef();

    useEffect(() => {
        request.get({ url: "set/getTitle" }).then(res => {
            if (res.code == 1) {
                let { title: tit } = res.data;
                setTitle(tit);
            }
        }).catch(err => {
            console.log(err)
        })
    }, []);

    function doLogin() {
        let userName = my_name.current.value;
        let upwd = my_pwd.current.value;
        if(userName.trim() == "" || upwd.trim() == ""){
            return;
        }

        request.post({
            url: "user/login",
            config: {
                credentials: true
            },
            data: {
                name: userName,
                pwd: upwd
            }
        }).then(res => {
            if (res.code == 1) {
                setLoginSuc(true);
            } else {
                setTip("用户名或密码错误");
            }
        })
    }
    function handleReset() {
        my_name.current.value = "";
        my_pwd.current.value = "";
    }

    if(loginSuc){
        return <Redirect push to="/index" />
    }
    return (
        <div className="login-reg">
            <div className="header clBor">
                <div className="header-content">
                    <div className="state">
                        <p><Link to="/register">去注册</Link></p>
                    </div>
                    <h2>
                        <Link to="/index">{title}</Link>
                    </h2>
                </div>
            </div>
            <div className="container">
                <div className="form">
                    <div className="form-cover">
                        <h3 className="title">登录博客园</h3>
                        <div className="label">
                            <span>用户名：</span>
                            <input type="text" ref={ my_name } />
                        </div>
                        <p className="tip"></p>
                        <div className="label">
                            <span>密&nbsp;&nbsp;&nbsp;码：</span>
                            <input type="password" ref={ my_pwd } />
                        </div>
                        <p className="tip fail">{tip}</p>
                        <div className="button">
                            <span onClick={doLogin}>登录</span>&nbsp;&nbsp;&nbsp;
                            <span onClick={handleReset}>重置</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lr-footer">
                <MainFooterComponent />
            </div>
        </div>
    )
}

export default LoginComponent;