import React, { Component } from 'react';
import '../layout/init.css';
import '../layout/login-reg.css';
import { Link,Redirect } from 'react-router-dom';

class RegComponent extends Component{
    constructor(){
        super();
        this.state = {
            serverUrl: "http://127.0.0.1:8080",
            title: "",
            namePass: false,
            nameWord: "",
            uname:"",
            pwdPass: false,
            pwdWord: "",
            password: "",
            rPwdPass: false,
            rPwdWord: "",
            regSucc: false
        }
    }
    componentWillMount(){
        fetch(this.state.serverUrl+"/set/getTitle")
        .then(function(res){
            return res.json();
        }).then(function(data){
            this.setState({title:data.data.title});
        }.bind(this))
    }
    checkName=()=>{
        var regName = this.refs.r_name.value;
        if(regName.trim()!=""){
            fetch(this.state.serverUrl+"/user/checkName?name="+regName,{
            }).then(function(res){
                return res.json();
            }).then(function(data){
                if(data.code == 1){
                    this.setState({
                        namePass: true,
                        nameWord: "该用户名可注册",
                        uname: regName
                    })
                }else{
                    this.setState({
                        namePass: false,
                        nameWord: "该用户名已被注册"
                    })
                }
            }.bind(this));

        }else{
            this.setState({
                namePass: false,
                nameWord: "请输入用户名"
            })
        }
    }
    checkPwd=()=>{
        var regPwd = this.refs.r_pwd.value;
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        if(reg.test(regPwd)){
            this.setState({
                pwdPass:true,
                pwdWord:"该密码可用",
                password: regPwd
            });
        }else{
            this.setState({
                pwdPass:false,
                pwdWord:"密码格式不正确"
            });
        }
    }
    checkRPwd=()=>{
        if(!this.state.pwdPass){
            this.setState({
                rPwdPass: false,
                rPwdWord: "密码不合法"
            });
            return;
        }
        var rePwd = this.refs.r_rpwd.value;
        if(rePwd == this.state.password){
            this.setState({
                rPwdPass: true,
                rPwdWord: "密码一致"
            });
        }else{
            this.setState({
                rPwdPass: false,
                rPwdWord: "密码不一致"
            });
        }
    }
    clearWord=(stateKey)=>{
        switch (stateKey){
            case "nameWord":{
                this.setState({nameWord:""});
            }break;
            case "pwdWord":{
                this.setState({pwdWord:""});
            }break;
            case "rPwdWord":{
                this.setState({rPwdWord:""});
            }break;
            default :{
                this.setState({
                    nameWord:"",
                    pwdWord:"",
                    rPwdWord:""
                })
            }
        }
    }
    doReg=()=>{
        if(this.state.namePass&&this.state.pwdPass&&this.state.rPwdPass){
            var name = this.state.uname,
                pwd = this.state.password;
            fetch(this.state.serverUrl+"/user/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: "uname="+name+"&upwd="+pwd
            }).then(function(res){
                return res.json();
            }).then(function(data){
                if(data.code == 1){
                    this.setState({
                        namePass:false,
                        uname:"",
                        password:"",
                        regSucc: true
                    })
                }else{
                    //fail
                    alert("未知错误");
                }
            }.bind(this)).catch(function(){
                alert("网络错误");
            })
        }
    }
    handleReset=()=>{
        this.refs.r_name.value = "";
        this.refs.r_pwd.value = "";
        this.refs.r_rpwd.value = "";
        this.clearWord();
    }
    render(){
        if(this.state.regSucc){
            return <Redirect push to="/login" />
        }
        return <div className="login-reg">
            <div className="header clBor">
                <div className="header-content">
                    <div className="state">
                        <p><Link to="/login">去登录</Link></p>
                    </div>
                    <h2>
                        <Link to="/index">{this.state.title}</Link>
                    </h2>
                </div>
            </div>
            <div className="container">
                <div className="form">
                    <div className="form-cover">
                        <h3 className="title">用户注册</h3>
                        <div className="label">
                            <span>注册昵称：</span>
                            <input type="text" ref="r_name" onFocus={()=>{this.clearWord("nameWord")}} onBlur={this.checkName}/>
                        </div>
                        <p className={this.state.namePass?"tip success":"tip fail"}>{this.state.nameWord}</p>
                        <div className="label">
                            <span>注册密码：</span>
                            <input type="password" ref="r_pwd" onFocus={()=>{this.clearWord("pwdWord")}} onBlur={this.checkPwd}/>
                        </div>
                        <p className={this.state.pwdPass?"tip success":"tip fail"}>{this.state.pwdWord}</p>
                        <div className="label">
                            <span>重复密码：</span>
                            <input type="password" ref="r_rpwd" onFocus={()=>{this.clearWord("rPwdWord")}} onBlur={this.checkRPwd}/>
                        </div>
                        <p className={this.state.rPwdPass?"tip success":"tip fail"}>{this.state.rPwdWord}</p>
                        <div className="button">
                            <a href="javascript:;" onClick={this.doReg}>注册</a>&nbsp;&nbsp;&nbsp;
                            <a href="javascript:;" onClick={this.handleReset}>重置</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lr-footer">
                <p>Copyright ©2018 林浩杰</p>
            </div>
        </div>
    }
}

export default RegComponent;