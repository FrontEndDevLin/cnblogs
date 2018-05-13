import React, { Component } from 'react';

class EditSideComponent extends Component{
    constructor(){
        super();
        this.state = {
            serverUrl: "http://127.0.0.1:8080",
            current : "#essay",
            tags: []
        }
    }
    componentWillMount(){
        fetch(this.state.serverUrl+"/set/getTag")
        .then(function(res){
            return res.json();
        }).then(function(data){
            this.setState({
                tags: data
            });
            this.props.rcvTags(data);
        }.bind(this))
    }
    loadTags(data){
        var jsxHtml = [];
        for(var i=0;i<data.length;i++){
            jsxHtml.push(
            <li key={i}><a href="javascript:;" data-tagname={data[i].tagName} data-tid={data[i].tagId} 
            data-target="#typePage" onClick={this.handleClick}>{data[i].tagName+"("+data[i].count+")"}</a></li>
            )
        }
        return jsxHtml;
    }
    handleClick=(e)=>{
        var tar = e.target.getAttribute("data-target");
        var tabs = document.getElementById("leftList").getElementsByTagName("a");
        for(var i=0;i<tabs.length;i++){
            if(tabs[i].className=="active"){
                tabs[i].className = "";
            }
        }
        e.target.className = "active";
        var tagId = e.target.getAttribute("data-tid");
        var tagName = e.target.getAttribute("data-tagname");
        if(tagId&&tagName){
            this.props.toSider(tar,{"tid":tagId,"tName":tagName});
        }else{
            this.props.toSider(tar);
        }
    }
    render(){
        return <div className="left-list lf" id="leftList">
            <div className="oper-content">
                <h3 className="oper-title">操作</h3>
                <ul>
                    <li><a className="active" href="javascript:;" data-target="#essay" onClick={this.handleClick}>添加新随笔</a></li>
                    <li><a href="javascript:;" data-target="#setting" onClick={this.handleClick}>设置</a></li>
                </ul>
            </div>
            <div className="oper-content">
                <h3 className="oper-title">分类</h3>
                <ul>
                    <li><a href="javascript:;" data-target="#editTypePage" onClick={this.handleClick}>编辑分类</a></li>
                    {/*<li><a href="javascript:;" data-target="#typePage" onClick={this.handleClick}>JavaScript(1)</a></li>*/}
                    {this.loadTags(this.state.tags)}
                </ul>
            </div>
        </div>
    }
}

export default EditSideComponent;