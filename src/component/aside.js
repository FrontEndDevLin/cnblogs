import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class AsideComponent extends Component {
    constructor(){
        super();
        this.state = {
            serverUrl: "http://127.0.0.1:8080",
            getNotice: false,
            admin : {},
            activeForm : [],
            years: "",
            level: 0,
            uid: "",
            isAdmin: false,
            isActive: "",
            tagsArr:[],
            readTopArr:[]
        }
    }
    componentWillMount(){
        fetch(this.state.serverUrl+"/user/adminMsg")
        .then(function(res){
            return res.json();
        }).then(function(data){
            this.setState({
                admin: data.admin,
                activeForm: data.activeForm,
                getNotice: true
            });
            this.getDates(data.admin.regTime);
            this.showAddActive();
        }.bind(this));

        fetch(this.state.serverUrl+"/set/getTag")
        .then(function(res){
            return res.json();
        }).then(function(data){
            this.setState({tagsArr:data})
        }.bind(this));

        fetch(this.state.serverUrl+"/blog/readTop")
        .then(function(res){
            return res.json(res);
        }).then(function(data){
            if(data.code==1){
                this.setState({readTopArr:data.data});
            }
        }.bind(this))
    }
    getDates=(time)=>{
        if(!this.state.getNotice){return};
        var between = new Date().getTime()-time;
        this.setState({
            years: parseInt(between/(1000*60*60*24))+"天"
        });
    }
    showAddActive=()=>{
        fetch(this.state.serverUrl+"/user/checkLogin",{
            credentials:'include'
        })
        .then(function(res){
            return res.json();
        }).then(function(data){
            if(data.code==1){
                if(data.data.level==99){
                    this.setState({
                        level : data.data.level,
                        isAdmin : true
                    })
                }else{
                    this.setState({
                        level : data.data.level,
                        uid: data.data.uid,
                        isAdmin: false
                    });
                    var atList = this.state.activeForm; //关注列表
                    var isActive = false;
                    for(var i=0;i<atList.length;i++){
                        if(data.data.uid==atList[i].uid){
                            isActive = true;
                        }
                    }
                    if(isActive){
                        this.setState({
                            isActive : true
                        })
                    }else{
                        this.setState({
                            isActive : false
                        })
                    }
                }
            }
        }.bind(this));
    }
    addActive=()=>{
        if(this.state.isActive === false && this.state.level == 1){
            fetch(this.state.serverUrl+"/user/active?uid="+this.state.uid)
            .then(function(res){
                return res.json();
            }).then(function(data){
                if(data.code==1){
                    this.setState({
                        isActive: true
                    })
                }else{
                    this.setState({
                        isActive: false
                    })
                }
            }.bind(this))
        }
    }
    loadTags=(data)=>{
        var jsxHtml = [];
        for(var i=0;i<data.length;i++){
            jsxHtml.push(<p key={i}><a href="javascript:;">{data[i].tagName+"("+data[i].count+")"}</a></p>);
        }
        return jsxHtml;
    }
    loadReadTop=(data)=>{
        var jsxHtml = [];
        for(var i=0;i<data.length;i++){
            jsxHtml.push(<p key={i}><Link to={{pathname:'/detail',state:{tid:data[i].blogsId}}}>{(i+1)+". "+data[i].title}</Link></p>)
        }
        return jsxHtml;
    }
    render(){
        return <div className="aside rt">
            <div className="aside-item">
                <p className="title"><span>公告</span></p>
                <div className="item-content">
                    <p>昵称：<span>{this.state.getNotice?this.state.admin.uname:''}</span></p>
                    <p>圆龄：<span>{this.state.getNotice?this.state.years:''}</span></p>
                    <p>关注：<span><a href="javascript:;">{this.state.getNotice?this.state.activeForm.length:''}</a></span></p>
                    <p className="clear"><a onClick={this.addActive} className="add-follow rt" href="javascript:;">{this.state.isAdmin?'':this.state.isActive===true?'已关注':'+加关注'}</a></p>
                </div>
            </div>
            
            <div className="aside-item">
                <p className="title"><span>我的标签</span></p>
                <div className="item-tab-content">
                    <div>
                        {/*<p><a href="#">HTML(3)</a></p>
                        <p><a href="#">CSS(3)</a></p>
                        <p><a href="#">JavaScript(3)</a></p>
                        <p><a href="#">Vue(3)</a></p>                        
                        <p><a href="#">React(3)</a></p>                        */}
                        {this.loadTags(this.state.tagsArr)}
                    </div>
                </div>
            </div>
            {/*<div className="aside-item">
                <p className="title"><span>随笔档案</span></p>
                <div className="item-tab-content">
                    <div>
                        <p><a href="#">2017年8月（1）</a></p>
                        <p><a href="#">2017年8月（1）</a></p>
                        <p><a href="#">2017年8月（1）</a></p>
                        <p><a href="#">2017年8月（1）</a></p>
                    </div>
                </div>
            </div>*/}

            <div className="aside-item">
                <p className="title"><span>阅读排行榜</span></p>
                <div className="item-tab-content">
                    <div>
                        {/*<p><a href="#">1. HTML的技巧</a></p>
                        <p><a href="#">1. HTML的技巧</a></p>
                        <p><a href="#">1. HTML的技巧</a></p>
                        <p><a href="#">1. HTML的技巧</a></p>
                        <p><a href="#">1. HTML的技巧</a></p>*/}
                        {this.loadReadTop(this.state.readTopArr)}
                    </div>
                </div>
            </div>
        </div>
    }
}

export default AsideComponent;