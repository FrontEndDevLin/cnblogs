import React, { Component } from 'react';
import '../layout/init.css';
import '../layout/login-reg.css';
import { Link,Redirect } from 'react-router-dom';

class LoginComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            serverUrl: "http://127.0.0.1:8080",
            title: "",
            loginSuc:false,
            tip:""
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
    doLogin=()=>{
        var userName = this.refs.my_name.value;
        var upwd = this.refs.my_pwd.value;
        // console.log("用户名是："+userName+",密码是："+upwd);
        if(userName.trim() == "" || upwd.trim() == ""){
            return;
        }
        fetch(this.state.serverUrl+"/user/login",{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "name="+userName+"&pwd="+upwd
        }).then(function(res){
            return res.json();
        }).then((data)=>{
            // console.log(data);
            if(data.code == 1){
                this.setState({loginSuc:true});
            }else{
                this.setState({tip:"用户名或密码错误"});
            }
        }).catch(function(err){
            alert("网络错误！请检查");
        })
    }
    handleReset=()=>{
        this.refs.my_name.value = "";
        this.refs.my_pwd.value = "";
    }
    render(){
        if(this.state.loginSuc){
            return <Redirect push to="/index" />
        }
        return <div className="login-reg">
            <div className="header clBor">
                <div className="header-content">
                    <div className="state">
                        <p><Link to="/register">去注册</Link></p>
                    </div>
                    <h2>
                        <Link to="/index">{this.state.title}</Link>
                    </h2>
                </div>
            </div>
            <div className="container">
                <div className="form">
                    <div className="form-cover">
                        <h3 className="title">登录博客园</h3>
                        <div className="label">
                            <span>用户名：</span>
                            <input type="text" ref="my_name" />
                        </div>
                        <p className="tip"></p>
                        <div className="label">
                            <span>密&nbsp;&nbsp;&nbsp;码：</span>
                            <input type="password" ref="my_pwd" />
                        </div>
                        <p className="tip fail">{this.state.tip}</p>
                        <div className="button">
                            <a href="javascript:;" onClick={this.doLogin}>登录</a>&nbsp;&nbsp;&nbsp;
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

export default LoginComponent;