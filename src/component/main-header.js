import React, { Component } from 'react';
import '../layout/header.css';
import { Link }from 'react-router-dom';

class MainHeaderComponent extends Component{
    constructor(){
        super();
        this.state = {
            serverUrl: "http://127.0.0.1:8080",
            isLogin: false,
            level: 0,
            userName: "",
            uid: "",
            title: "",
            subTitle: ""
        }
    }
    componentDidMount(){
        fetch(this.state.serverUrl+"/user/checkLogin",{
            credentials : "include"
        }).then(function(res){
            return res.json();
        }).then((data)=>{
            // console.log(data);
            if(data.code==1){
                this.setState({
                    isLogin:true,
                    level:data.data.level,
                    userName:data.data.uname,
                    uid: data.data.uid
                });
            }
        });

        fetch(this.state.serverUrl+"/set/getTitle")
        .then(function(res){
            return res.json();
        }).then((data)=>{
            this.setState({
                title: data.data.title,
                subTitle: data.data.sub_title
            })
        })
    }
    logout=()=>{
        fetch(this.state.serverUrl+"/user/logout",{
            credentials : "include"
        }).then(function(res){
            return res.json();
        }).then((data)=>{
            if(data.code == 1){
                this.setState({
                    isLogin: false,
                    level: 0,
                    userName: ""
                })
            }
        }).catch(function(){
            alert("网络错误");
        })
    }
    render(){
        return <div className="header">
            <div className="header-content">
                <div className="state clear">
                    <p className="user rt" style={{display:this.state.isLogin?'none':'block'}}>
                        <Link to="/login">登录</Link>&nbsp;&nbsp;<Link to="/register">注册</Link>
                    </p>
                    <p className="user rt" style={{display:this.state.isLogin&&this.state.level==1?'block':'none'}}>
                        欢迎回来：<a href="javascript:;" className="uname">{this.state.userName}</a>&nbsp;&nbsp;
                        <a href="javascript:;" onClick={this.logout}>注销</a>
                    </p>
                    <p className="user rt" style={{display:this.state.isLogin&&this.state.level==99?'block':'none'}}>
                        欢迎博主：<a href="javascript:;" className="uname">{this.state.userName}</a>&nbsp;&nbsp;
                        <a href="javascript:;" onClick={this.logout}>注销</a>
                    </p>
                </div>
                <h2><Link className="logo" to="/index">{this.state.title}</Link></h2>
                <h3 className="words">{this.state.subTitle}</h3>
                <div className="nav">
                    <ul className="nav-bar clear">
                        <li><Link to="/index">首页</Link></li>
                        <li style={{'display':this.state.level!=99?'none':'block'}}><Link to="/edit-center">新随笔</Link></li>
                        <li style={{'display':this.state.level!=99?'none':'block'}}><Link to="/edit-center">管理</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    }
}

export default MainHeaderComponent;