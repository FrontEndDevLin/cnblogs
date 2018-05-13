import React, { Component } from 'react';

class MainBodyComponent extends Component {
    constructor(){
        super();
        this.state = {
            serverUrl: "http://127.0.0.1:8080",
            datail: null,
            blogsId: undefined
        }
    }
    componentWillMount(){
        this.setState({blogsId:this.props.sendBid.tid});
        if(this.props.sendBid.tid){
            fetch(this.state.serverUrl+"/blog/detail?blogsId="+this.props.sendBid.tid)
            .then(function(res){
                return res.json();
            }).then(function(data){
                if(data.code==1){
                    // console.log(data.data);
                    this.setState({detail:data.data});
                    this.refs.content.innerHTML = data.data.content;
                }
            }.bind(this))
        }
    }
    componentWillReceiveProps(){
        if(this.props.sendBid.tid){
            fetch(this.state.serverUrl+"/blog/detail?blogsId="+this.props.sendBid.tid)
            .then(function(res){
                return res.json();
            }).then(function(data){
                if(data.code==1){
                    this.setState({detail:data.data});
                    // console.log(data.data.content);
                    // this.refs.content.innerHTML = data.data.content;
                }
            }.bind(this))
        }
    }
    render(){
        return <div className="content-item">
            <div className="article">
                <h2 className="c-title">{this.state.detail?this.state.detail.title:""}</h2>
                <div className="c-content" ref="content">
                    {/*<div className="normal">定义1个Apple对象：</div>
                    <div className="code">
                        <pre>
                            <span>var a = 12464; {'\n'}
                        </span><span>console.log</span> <span>a;{'\n'}
                        </span><span>function</span> <span>b(){'{'}{'\n'}
                        {'    '}</span><span>console.log("Hello");</span>{'\n'}
                        <span>}</span>
                        </pre>
                    </div>
                    <h2 className="step">1. List转Map</h2>*/}
                </div>
                <div className="c-footer">
                    <p className="c-footer-type"><b>标签:</b><span>{this.state.detail?this.state.detail.tagName:""}</span></p>
                    <div className="c-footer-page">
                        {/*<p>上一篇：<a href="#">Windows Java环境变量配置</a></p>
                        <p>下一篇：<a href="#">Windows Java环境变量配置</a></p>*/}
                    </div>
                    <p className="c-footer-msg">
                        <span>阅读({this.state.detail?this.state.detail.readCount:""})</span>
                        <span>评论({this.state.detail?this.state.detail.comCount:""})</span>
                        <span>{this.state.detail?new Date(this.state.detail.createTime).toLocaleString():""}</span>&nbsp;
                        <span>{this.state.detail?this.state.detail.author:""}</span>
                    </p>
                </div>
            </div>
        </div>
    }
}

export default MainBodyComponent;