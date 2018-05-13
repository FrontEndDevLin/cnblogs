import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CommentComponent extends Component {
    constructor(){
        super();
        this.state = {
            serverUrl: "http://127.0.0.1:8080",
            isLogin: false,
            uid: "",
            commList: []
        }
    }
    componentWillMount(){
        fetch(this.state.serverUrl+"/user/checkLogin",{
            credentials:'include'
        })
        .then(function(res){
            return res.json();
        }).then(function(data){
            // console.log(data);
            if(data.code==1){
                this.setState({
                    isLogin: true,
                    uid: data.data.uid
                })
            }
        }.bind(this));

        this.getComm();
    }
    getComm=()=>{
        if(this.props.sendBid.tid){
            fetch(this.state.serverUrl+"/comm/getComm?bid="+this.props.sendBid.tid)
            .then(function(res){
                return res.json();
            }).then(function(data){
                this.setState({commList:data.data});
            }.bind(this))
        }
    }
    loadComm=(data)=>{
        var jsxHtml = [];
        for(var i=0;i<data.length;i++){
            jsxHtml.push(<div className="comment-one" key={i}>
                <p><a>#{i+1}楼</a>&nbsp;&nbsp; <span className="comment-time">{new Date(data[i].cTime).toLocaleString()}</span>&nbsp;&nbsp; 
                <a href="javascript:;" className="comment-user">{data[i].cname}</a></p>
                <div className="comment-content">
                    {data[i].content}
                </div>
            </div>)
        }
        return jsxHtml;
    }
    pubComm=()=>{
        var content = this.refs.commInput.value;
        var bid = this.props.sendBid.tid;
        if(this.state.uid && content.trim()){
            fetch(this.state.serverUrl+"/comm/pubComm?bid="+bid+"&cuid="+this.state.uid+"&content="+content)
            .then(function(res){
                return res.json();
            }).then(function(data){
                if(data.code == 1){
                    this.refs.commInput.value = "";
                    this.getComm();
                }
            }.bind(this))
        }
    }
    render() {
        return <div>
            <div className="content-item">
                <div className="comment-box">
                    <p className="comment-name">评论列表</p>
                    <div className="comment-list">
                        {this.loadComm(this.state.commList)}
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
                    <div className="comment clear" style={{'display':this.state.isLogin?'block' : 'none'}}>
                        <textarea cols="30" rows="5" placeholder="想说点什么..." ref="commInput"></textarea>
                        <button className="report rt" onClick={this.pubComm}>发表</button>
                    </div>
                    {/*<!-- 未登录 -->*/}
                    <div className="cover" style={{'display':this.state.isLogin?'none' : 'block'}}>
                        <p>
                            <i className="cover-icon"></i>注册用户登录后才能发表评论，请&nbsp;
                            <Link to="/login">登录</Link>&nbsp;
                            或&nbsp;
                            <Link to="/register">注册</Link>&nbsp;，访问&nbsp;<Link to="/index">网站首页</Link>&nbsp;。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default CommentComponent;