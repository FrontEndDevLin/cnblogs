import React, { useState, useEffect, useRef } from 'react';
import '../layout/init.css';
import '../layout/login-reg.css';
import { Link,Redirect } from 'react-router-dom';
import request from '../utils/request';
import MainFooterComponent from '../components/main-footer';

function RegComponent() {
    let [title, setTitle] = useState("");
    let [namePass, setNamePass] = useState(false);
    let [nameWord, setNameWord] = useState("");
    let [uname, setUname] = useState("");
    let [pwdPass, setPwdPass] = useState(false);
    let [pwdWord, setPwdWord] = useState("");
    let [password, setPassword] = useState("");
    let [rPwdPass, setRPwdPass] = useState(false);
    let [rPwdWord, setRPwdWord] = useState("");
    let [regSucc, setRegSucc] = useState(false);

    let r_name = useRef();
    let r_pwd = useRef();
    let r_rpwd = useRef();

    useEffect(() => {
        request.get({
            url: "set/getTitle"
        }).then(res => {
            if (res.code == 1) {
                setTitle(res.data.title)
            }
        })
    }, []);

    function checkName() {
        var regName = r_name.current.value;
        if(regName.trim()!=""){
            request.get({
                url: "user/checkName",
                params: {
                    name: regName
                }
            }).then(res => {
                if(res.code == 1){
                    setNamePass(true);
                    setNameWord("该用户名可注册");
                    setUname(regName);
                }else{
                    setNamePass(false);
                    setNameWord("该用户名已被注册")
                }
            })
        }else{
            setNamePass(false);
            setNameWord("请输入用户名");
        }
    }

    function checkPwd() {
        var regPwd = r_pwd.current.value;
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        if(reg.test(regPwd)){
            setPwdPass(true);
            setPwdWord("该密码可用");
            setPassword(regPwd);
        }else{
            setPwdPass(false);
            setPwdWord("密码格式不正确");
        }
    }

    function checkRPwd() {
        if(!pwdPass){
            setRPwdPass(false);
            setRPwdWord("密码格式不正确")
            return;
        }
        let rePwd = r_rpwd.current.value;
        if(rePwd == password){
            setRPwdPass(true);
            setRPwdWord("密码一致");
        }else{
            setRPwdPass(false);
            setRPwdWord("密码不一致");
        }
    }

    function clearWord(stateKey) {
        switch (stateKey){
            case "nameWord":{
                setNameWord("");
            }break;
            case "pwdWord":{
                setPwdWord("");
            }break;
            case "rPwdWord":{
                setRPwdWord("");
            }break;
            default: {
                setNameWord("");
                setPwdWord("");
                setRPwdWord("");
            }
        }
    }

    function doReg() {
        if( namePass && pwdPass && rPwdPass ) {
            request.post({
                url: "user/register",
                data: {
                    uname: uname,
                    upwd: password
                }
            }).then(res => {
                if(res.code == 1){
                    setNamePass(false);
                    setUname("");
                    setPassword("");
                    setRegSucc(true);
                }else{
                    alert("未知错误");
                }
            })
        }
    }

    function handleReset() {
        r_name.current.value = "";
        r_pwd.current.value = "";
        r_rpwd.current.value = "";
        clearWord();
    }

    if(regSucc){
        return <Redirect push to="/login" />
    }
    return (
        <div className="login-reg">
            <div className="header clBor">
                <div className="header-content">
                    <div className="state">
                        <p><Link to="/login">去登录</Link></p>
                    </div>
                    <h2>
                        <Link to="/index">{title}</Link>
                    </h2>
                </div>
            </div>
            <div className="container">
                <div className="form">
                    <div className="form-cover">
                        <h3 className="title">用户注册</h3>
                        <div className="label">
                            <span>注册昵称：</span>
                            <input type="text" ref={ r_name } onFocus={()=>{clearWord("nameWord")}} onBlur={checkName}/>
                        </div>
                        <p className={namePass?"tip success":"tip fail"}>{nameWord}</p>
                        <div className="label">
                            <span>注册密码：</span>
                            <input type="password" ref={ r_pwd } onFocus={()=>{clearWord("pwdWord")}} onBlur={checkPwd}/>
                        </div>
                        <p className={pwdPass?"tip success":"tip fail"}>{pwdWord}</p>
                        <div className="label">
                            <span>重复密码：</span>
                            <input type="password" ref={ r_rpwd } onFocus={()=>{clearWord("rPwdWord")}} onBlur={checkRPwd}/>
                        </div>
                        <p className={rPwdPass?"tip success":"tip fail"}>{rPwdWord}</p>
                        <div className="button">
                            <span onClick={doReg}>注册</span>&nbsp;&nbsp;&nbsp;
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

export default RegComponent;