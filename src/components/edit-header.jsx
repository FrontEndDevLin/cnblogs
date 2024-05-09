import React, { Component, useState, useEffect } from 'react';
import { Link,Redirect } from 'react-router-dom';
import request from '../utils/request';

function EditHeaderComponent() {
    let [isLogin, setIsLogin] = useState(false);
    let [isAdmin, setIsAdmin] = useState(void(0));
    let [level, setLevel] = useState(0);
    let [adminName, setAdminName] = useState("");

    useEffect(() => {
        request.get({
            url: "user/checkLogin",
            config: {
                credentials: true
            }
        }).then(res => {
            if(res.code==1&&res.data.level==99){
                setIsLogin(true);
                setIsAdmin(true);
                setLevel(res.data.level);
                setAdminName(res.data.uname);
            }else{
                setIsAdmin(false);
            }
        })
    }, []);

    function logout() {
        request.get({
            url: "user/logout",
            config: {
                credentials: true
            }
        }).then(res => {
            if(res.code==1){
                setIsAdmin(false);
            }
        });
    }


    if(isAdmin === false){
        return <Redirect push to="/index" />
    }

    return (
        <div className="header">
            <div className="header-content clear">
                <ul className="head-lf lf clear">
                    <li><Link to="/index">网站首页</Link></li>
                </ul>
                <div className="head-rt rt">
                    <a>{adminName}</a>
                    <a onClick={logout}>退出</a>
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
    )
}

// class EditHeaderComponent extends Component{
//     constructor(){
//         super();
//         this.state = {
//             serverUrl: "http://127.0.0.1:8080",
//             isLogin: false,
//             isAdmin: "",
//             level: "",
//             adminName : "",
//         }
//     }
//     componentDidMount(){
//         request.get({
//             url: "user/checkLogin",
//             config: {
//                 credentials: true
//             }
//         }).then(res => {
//             if(res.code==1&&res.data.level==99){
//                 this.setState({
//                     isLogin:true,
//                     isAdmin:true,
//                     level:res.data.level,
//                     adminName:res.data.uname
//                 });
//             }else{
//                 this.setState({
//                     isAdmin: false
//                 });
//             }
//         })
//     }
//     logout=()=>{
//         request.get({
//             url: "user/logout",
//             config: {
//                 credentials: true
//             }
//         }).then(res => {
//             if(res.code==1){
//                 this.setState({
//                     isAdmin:false
//                 })
//             }
//         });
//     }
//     render(){
//         if(this.state.isAdmin===false){
//             return <Redirect push to="/index" />
//         }
//         return <div className="header">
//             <div className="header-content clear">
//                 <ul className="head-lf lf clear">
//                     <li><Link to="/index">网站首页</Link></li>
//                 </ul>
//                 <div className="head-rt rt">
//                     <a>{this.state.adminName}</a>
//                     <a onClick={this.logout}>退出</a>
//                 </div>
//             </div>
//             <div className="logoLine">
//                 <div className="logoLine-sub clear">
//                     <Link to="/index" className="lf">
//                         <img src={require('../static/images/adminlogo.gif')} alt="" />
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     }
// }

export default EditHeaderComponent;