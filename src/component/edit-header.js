import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';

class EditHeaderComponent extends Component{
    constructor(){
        super();
        this.state = {
            serverUrl: "http://127.0.0.1:8080",
            isLogin: false,
            isAdmin: "",
            level: "",
            adminName : "",
        }
    }
    componentWillMount(){
        fetch(this.state.serverUrl+"/user/checkLogin",{
            credentials : "include"
        }).then(function(res){
            return res.json();
        }).then((data)=>{
            // console.log(data);
            if(data.code==1&&data.data.level==99){
                this.setState({
                    isLogin:true,
                    isAdmin:true,
                    level:data.data.level,
                    adminName:data.data.uname
                });
            }else{
                this.setState({
                    isAdmin: false
                });
            }
        });
    }
    logout=()=>{
        fetch(this.state.serverUrl+"/user/logout",{
            credentials: "include"
        }).then(function(res){
            return res.json();
        }).then(function(data){
            if(data.code==1){
                this.setState({
                    isAdmin:false
                })
            }
        }.bind(this)).catch(function(){
            alert("网络错误");
        })
    }
    render(){
        if(this.state.isAdmin===false){
            return <Redirect push to="/index" />
        }
        return <div className="header">
            <div className="header-content clear">
                <ul className="head-lf lf clear">
                    <li><Link to="/index">网站首页</Link></li>
                </ul>
                <div className="head-rt rt">
                    <a href="javascript:;">{this.state.adminName}</a>
                    <a href="javascript:;" onClick={this.logout}>退出</a>
                </div>
            </div>
            <div className="logoLine">
                <div className="logoLine-sub clear">
                    <Link to="/index" className="lf">
                        <img src={require('../static/images/adminlogo.gif')} alt="" />
                    </Link>
                </div>
            </div>
        </div>
    }
}

export default EditHeaderComponent;