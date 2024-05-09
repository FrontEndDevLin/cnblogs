import React, { useState, useEffect } from 'react';
import request from '../utils/request';

function EditSideComponent(props) {
    let [tags, setTags] = useState([]);


    useEffect(() => {
        request.get({
            url: "set/getTag"
        }).then(res => {
            setTags(res);

            props.rcvTags(res);
        })
    }, []);

    function loadTags(data) {
        var jsxHtml = [];
        for(var i=0;i<data.length;i++){
            jsxHtml.push(
                <li key={i}><a data-tagname={data[i].tagName} data-tid={data[i].tagId} 
                data-target="#typePage" onClick={handleClick}>{data[i].tagName+"("+data[i].count+")"}</a></li>
            )
        }
        return jsxHtml;
    }
    function handleClick(e) {
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
            props.toSider(tar,{"tid":tagId,"tName":tagName});
        }else{
            props.toSider(tar);
        }
    }

    return (
        <div className="left-list lf" id="leftList">
            <div className="oper-content">
                <h3 className="oper-title">操作</h3>
                <ul>
                    <li><a className="active" data-target="#essay" onClick={handleClick}>添加新随笔</a></li>
                    <li><a data-target="#setting" onClick={handleClick}>设置</a></li>
                </ul>
            </div>
            <div className="oper-content">
                <h3 className="oper-title">分类</h3>
                <ul>
                    <li><a data-target="#editTypePage" onClick={handleClick}>编辑分类</a></li>
                    {/*<li><a data-target="#typePage" onClick={handleClick}>JavaScript(1)</a></li>*/}
                    {loadTags(tags)}
                </ul>
            </div>
        </div>
    )
}

export default EditSideComponent;