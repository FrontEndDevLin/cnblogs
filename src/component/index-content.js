import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class IndexContentComponent extends Component {
    constructor(){
        super();
        this.state = {
            serverUrl: "http://127.0.0.1:8080",
            abstract: []
        }
    }
    componentWillMount(){
        fetch(this.state.serverUrl+"/blog/abstract")
        .then(function(res){
            return res.json();
        }).then(function(data){
            var obj = data.data;
            for(var i=0;i<obj.length;i++){
                var newDate = new Date(obj[i].createTime).toLocaleDateString();
                var arr = newDate.split("/");
                obj[i].createTime = arr[0]+"年"+arr[1]+"月"+arr[2]+"日";
            }
            this.setState({abstract:obj});
        }.bind(this))
    }
    loadAbstract=(data)=>{
        var jsxHtml = [];
        for(var i=0;i<data.length;i++){
            jsxHtml.push(<div className="item" key={i}>
                <p className="title">
                    <span className="time">{data[i].isOnTop?"置顶随笔":data[i].createTime}</span>
                    <span className="title-content">
                        <Link to={{pathname:'/detail',state:{tid:data[i].blogsId}}}>{(data[i].isOnTop?"[置顶]":"")+data[i].title}</Link>
                    </span>
                </p>
                <p className="text">
                    {"摘要: "+data[i].abstract.slice(0,155)}&nbsp;
                    <Link to={{pathname:'/detail',state:{tid:data[i].blogsId}}}>阅读全文</Link>
                </p>
                <p className="detail">
                    <span>{"阅读("+ data[i].readCount +")"}</span>
                    <span>{"评论("+ data[i].comCount +")"}</span>
                    <span>{new Date(data[i].lastEditTime).toLocaleString()}</span>
                    <span>{data[i].author}</span>
                    <a className="edit" href="javascript:;">编辑</a>
                </p>
            </div>)
        }
        return jsxHtml;
    }
    render(){
        return <div className="content lf">
            {/*<!-- 盒子 -->*/}
            <div>
                {this.loadAbstract(this.state.abstract)}
                {/*<div className="item">
                    <p className="title">
                        <span className="time">置顶随笔</span>
                        <span className="title-content">
                            <Link to="/detail">[置顶]java8--List转为Map、分组、过滤、求和等操作</Link>
                        </span>
                    </p>
                    <p className="text">
                        摘要: 利用java8新特性，可以用简洁高效的代码来实现一些数据处理~ 定义1个Apple对象：
                        添加一些测试数据： 1. List转Map id为key，apple对象为value，可以这么做： 打印appleMap：
                        2. 分组 List里面的对象元素，以某个属性来分组，例如，以id分组，将id相同的放
                        <a href="#">阅读全文</a>
                    </p>
                    <p className="detail">
                        <span>阅读(14646)</span>
                        <span>评论(5)</span>
                        <span>2017-06-02 18:26</span>
                        <span>Lin_HR</span>
                        <a className="edit" href="javascript:;">编辑</a>
                    </p>
                </div>*/}
            </div>
        </div>
    }
}

export default IndexContentComponent;