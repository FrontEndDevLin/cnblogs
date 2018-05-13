import React, { Component } from 'react';

class EditControlComponent extends Component{
    constructor(){
        super();
        this.state = {
            serverUrl: "http://127.0.0.1:8080",
            current: "#essay",
            title: "",
            subTitle: "",
            tags: [],
            showEditer: false,
            showParHead: false,
            showBodyEditer: false,
            showEditTags: false,
            curTagName: "",
            curTagMsg:[]
        }
    }
    componentWillMount(){
        this._isMounted = true;
        fetch(this.state.serverUrl+"/set/getTitle")
        .then(function(res){
            return res.json();
        }).then(function(data){
            if(this._isMounted){
                this.setState({
                    title: data.data.title,
                    subTitle: data.data.sub_title
                });
                this.refs.title.value = data.data.title;
                this.refs.subTitle.value = data.data.sub_title;
            }
        }.bind(this)).catch(function(){
            alert("网络错误");
        });

        //保存标签名
        // fetch(this.state.serverUrl+"/set/getTag")
        // .then(function(res){
        //     return res.json();
        // }).then(function(data){
        //     this.setState({tags:data});
        // }.bind(this));
    }
    componentDidMount(){
        this.addEventListeners();
    }
    componentWillUnmount(){
        this._isMounted = false;
    }

    /*refs*/
    changeContent=(id,data)=>{
        if(data){
            //{tid: "5", tName: "JavaScript"}
            this.setState({
                curTagName: data.tName
            });
            fetch(this.state.serverUrl+"/blog/blogsMsg?tagId="+data.tid)
            .then(function(res){
                return res.json();
            }).then(function(data){
                if(data.code==1){
                    this.setState({curTagMsg:data.data});
                }
            }.bind(this))
        }
        this.setState({
            current: id
        });
    }
    saveTags=(data)=>{
        this.setState({tags:data});
    }
    /*refs end*/

    saveTitle=()=>{
        var newTitle = this.refs.title.value,
            newSubTitle = this.refs.subTitle.value;
        // console.log(newTitle+","+newSubTitle);
        if(newTitle==this.state.title && newSubTitle==this.state.subTitle){
            return;
        }
        fetch(this.state.serverUrl+"/set/changeTitle?newTitle="+newTitle+"&newSubTitle="+newSubTitle)
        .then(function(res){
            return res.json();
        }).then(function(data){
            if(data.code==1){
                alert("修改成功");
            }else{
                alert("修改失败");
            }
        }).catch(function(){
            alert("网络错误");
        })
    }
    
    showCodeEdit=()=>{
        this.setState({showEditer:true});
    }
    showParHead=()=>{
        this.setState({showParHead:true});
    }
    showBody=()=>{
        this.setState({showBodyEditer:true});
    }
    hideEdit=()=>{
        this.setState({
            showEditer:false,
            showParHead:false,
            showBodyEditer:false,
            showEditTags:false
        });
    }
    addPragTit=()=>{
        var title = this.refs.pragTitle.innerHTML;
        this.refs.content.innerHTML += "<h2 class='step abstract'>"+title+"</h2>";
        this.refs.pragTitle.innerHTML = "";
        this.hideEdit();
    }
    addCodePra=()=>{
        // console.log(this.refs.codePra.value);
        // console.log(this.refs.codePra.value.split("\n"));
        this.refs.content.innerHTML += "<div class='code'><pre>"+this.refs.codePra.value+"</pre></div>";
        this.hideEdit();
    }
    addBody=()=>{
        this.refs.content.innerHTML += "<div class='normal abstract'>"+this.refs.bodyPra.innerHTML+"</div>";
        this.hideEdit();
    }
    //发布
    publish=()=>{
        var content = this.refs.content.innerHTML;
        //构造摘要
        var abstractArr = this.refs.content.getElementsByClassName('abstract');
        var abstract = "";
        for(var i=0;i<abstractArr.length;i++){
            abstract += abstractArr[i].innerHTML+" ";
        }

        var title = this.refs.blog_tit.value;

        var tags = document.getElementsByName("tag");
        var tagId;
        for(var i=0;i<tags.length;i++){
            if(tags[i].checked){
                tagId = tags[i].value;
            }
        }
        if(!content.trim() || !title.trim()){
            alert("请填写完整信息");
            return;
        }
        if(!tagId){
            alert("请选择标签");
            return;
        }
        var isOnTop = this.refs.onTop.checked?1:0;
        var isOnIndex = isOnTop?1:this.refs.onIndex.checked?1:0;
        fetch(this.state.serverUrl+"/blog/publish",{
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "title="+title+"&content="+content+"&abstract="+abstract+"&tagId="+tagId+"&isOnTop="+isOnTop+"&isOnIndex="+isOnIndex
        }).then(function(res){
            return res.json();
        }).then(function(data){
            if(data.code==1){
                alert("发布成功");
                window.location.reload();
            }
        }.bind(this))
    }

    //删除
    delBlog=(id)=>{
        var bool = window.confirm("确定要删除吗?");
        if(bool){
            fetch(this.state.serverUrl+"/blog/delBlog",{
                method: "post",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: "blogsId="+id
            }).then(function(res){
                return res.json();
            }).then(function(data){
                if(data.code==1){
                    alert("删除成功");
                    window.location.reload();
                }else{
                    alert("删除失败");
                }
            }).catch(function(){
                alert("网络错误");
            })
        }
    }

    //加载分类操作
    loadCurTagMsg=(data)=>{
        var jsxHtml = [];
        var _this = this;
        for(var i=0;i<data.length;i++){
            (function(i){
                jsxHtml.push(<tr key={i}>
                    <th className="table-title"><a href="#">{data[i].title+"（"+new Date(data[i].createTime).toLocaleString()+"）"}</a></th>
                    <th>{data[i].commentCount}</th>
                    <th>{data[i].readCount}</th>
                    <th>
                        <a className="btn-edit" href="javascript:;" onClick={()=>{alert("暂未开放")}}>编辑</a>&nbsp;
                        <a className="btn-del" href="javascript:;" onClick={()=>{_this.delBlog(data[i].blogsId)}}>删除</a>
                    </th>
                </tr>);
            })(i)
        }
        return jsxHtml;
    }

    //标签名
    loadTags=(tags)=>{
        var jsxHtml = [];
        for(var i=0;i<tags.length;i++){
            jsxHtml.push(<li key={i}>{tags[i].tagName}&nbsp;<input className="ed-checkbox" type="radio" name="tag" value={tags[i].tagId}/></li>);
        }
        return jsxHtml;
    }
    //编辑页面的tags
    loadEditTags=(tags)=>{
        var jsxHtml = [];
        var _this = this;
        for(var i=0;i<tags.length;i++){
            (function(i){
                jsxHtml.push(
                <li key={i}><a>{tags[i].tagName+"("+tags[i].count+")"}</a>&nbsp;
                <a onClick={()=>{_this.editTag(tags[i].tagName,tags[i].tagId)}} href="javascript:;">编辑</a>&nbsp;
                <a href="javascript:;" onClick={()=>{_this.delTag(tags[i].tagName,tags[i].tagId)}}>删除</a></li>);
            })(i)
        }
        return jsxHtml;
    }

    //编辑标题窗口
    editTag=(tagName,tagId)=>{
        this.setState({showEditTags:true});
        this.refs.editTypeOldTag.value = tagName;
        this.refs.editTypeId.value = tagId;
    }
    delTag=(tagName,tagId)=>{
        var bool = window.confirm("确定要删除标签 "+tagName+" 吗？属于该标签下的所有文章将被删除");
        if(bool){
            fetch(this.state.serverUrl+"/set/delTName",{
                method: "POST",
                body: "tagId="+tagId,
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
                }
            }).then(function(res){
                return res.json();
            }).then(function(data){
                if(data.code == 1){
                    window.location.reload();
                }else{
                    alert("删除失败");
                }
            }).catch(function(){
                alert("网络错误");
            })
        }
    }
    addTag=()=>{
        var newTag = this.refs.addTagIpt.value.trim();
        if(!newTag) return;
        //检查重复
        var tagArr = this.state.tags;
        var canUse = true;
        for(var i=0;i<tagArr.length;i++){
            if(tagArr[i].tagName == newTag){
                canUse = false;
                break;
            }
        }
        if(!canUse){
            return alert("标签重复");
        }
        fetch(this.state.serverUrl+"/set/addTag?tagName="+newTag)
        .then(function(res){
            return res.json();
        }).then(function(data){
            if(data.code == 1){
                alert("添加成功");
                window.location.reload();
            }else{
                alert("添加失败");
            }
        }).catch(function(){
            alert("网络错误");
        })
    }
    changeTagName=()=>{
        var newTag = this.refs.editTypeOldTag.value;
        var tagId = this.refs.editTypeId.value;
        if(!newTag || !tagId){
            return;
        }
        fetch(this.state.serverUrl+"/set/changeTName?newTName="+newTag+"&tagId="+tagId)
        .then(function(res){
            return res.json();
        }).then(function(data){
            if(data.code == 1){
                alert("修改成功");
                window.location.reload();
            }else{
                alert("修改失败");
            }
        }).catch(function(){
            alert("网络错误");
        })
    }

    addEventListeners=()=>{
        var _this = this;
        this.refs.codePra.onkeydown = function(e){
            if(e.keyCode == 9){
                var position=this.selectionStart+4;
                this.value=this.value.substr(0,this.selectionStart)+'    '+this.value.substr(this.selectionStart);
                this.selectionStart=position;
                this.selectionEnd=position;
                this.focus();
                e.preventDefault();
            }
        }
    }
    render(){
        return <div className="right-content rt">
            {/*<!-- 添加随笔 -->*/}
            <div className="essay" id="essay" style={{'display':this.state.current=="#essay"?'block':'none'}}>
                <h3 className="right-title">========= 添加新随笔 =========</h3>
                <div className="ed-item">
                    <p className="ed-title">标题</p>
                    <div className="ed-input-box">
                        <input type="text" ref="blog_tit"/>
                    </div>
                </div>
                <div className="ed-item">
                    <p className="ed-title">分类</p>
                    <ul className="ed-type-box clear" ref="tags">
                        {this.loadTags(this.state.tags)}
                    </ul>
                </div>
                <div className="ed-item">
                    <p className="ed-title">高级选项</p>
                    <p className="ed-high-rank">
                        <span>置顶
                            <input className="ed-checkbox" type="checkbox" ref="onTop"/>
                        </span>
                        <span>显示在博客首页
                            <input className="ed-checkbox" type="checkbox" ref="onIndex"/>
                        </span>
                    </p>
                </div>
                <div className="ed-item">
                    <p className="ed-title">内容</p>
                    <div className="ed-editor-input">
                        <div>
                            <div className="text-area" contentEditable="true" ref="content"></div>
                        </div>
                    </div>
                </div>
                <div className="clear">
                    <p className="lf">
                        <input type="button" value="添加代码片段" onClick={this.showCodeEdit}/>&nbsp;
                        <input type="button" value="添加段落标题" onClick={this.showParHead}/>&nbsp;
                        <input type="button" value="编辑正文" onClick={this.showBody}/>
                    </p>
                    <p className="rt">
                        <input type="button" value="发布" onClick={this.publish}/>
                    </p>
                </div>
            </div>

            {/*<!-- 设置页 -->*/}
            <div className="setting" id="setting" style={{'display':this.state.current=="#setting"?'block':'none'}}>
                <h3 className="right-title">========= 修改设置 =========</h3>
                <div className="ed-item">
                    <p className="ed-title">标题</p>
                    <div className="ed-input-box">
                        <input type="text" ref="title" />
                    </div>
                </div>
                <div className="ed-item">
                    <p className="ed-title">子标题</p>
                    <div className="ed-input-box">
                        <input type="text" ref="subTitle"/>
                    </div>
                </div>
                <div className="ed-item clear"> 
                    <p className="rt">
                        <input type="button" value="保存" onClick={this.saveTitle}/>
                    </p>
                </div>
            </div>

            {/*<!-- 编辑分类页 -->*/}
            <div className="editTypePage" id="editTypePage" style={{'display':this.state.current=="#editTypePage"?'block':'none'}}>
                <h3 className="right-title">========= 编辑分类 =========</h3>
                <div className="ed-item">
                    <p className="ed-title">已有分类</p>
                    <ul className="ed-typelist clear">
                        {this.loadEditTags(this.state.tags)}
                    </ul>
                </div>
                <div className="ed-item">
                    <p className="ed-title">添加分类</p>
                    <div style={{"marginBottom": "10px"}}>
                        <input type="text" ref="addTagIpt"/>
                    </div>
                    <p>
                        <input type="button" value="添加" onClick={this.addTag}/>
                    </p>
                </div>
                <div className="prompt" style={{'display':this.state.showEditTags?'block':'none'}}>
                    <input type="text" ref="editTypeOldTag"/>
                    <input type="hidden" ref="editTypeId"/>
                    <p>
                        <button onClick={this.changeTagName}>确定</button>&nbsp;&nbsp;
                        <button onClick={this.hideEdit}>取消</button>
                    </p>
                </div>
            </div>

            {/*<!-- 分类页 -->*/}
            <div className="typePage" id="typePage" style={{'display':this.state.current=="#typePage"?'block':'none'}}>
                <h3 className="right-title">========= 当前分类: <span>{this.state.curTagName}</span> =========</h3>
                <div>
                    <table cellSpacing="0" cellPadding="0" border="0" className="type-table">
                        <thead>
                            <tr>
                                <th className="table-title">标题</th>
                                <th>评论数</th>
                                <th>阅读数</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.loadCurTagMsg(this.state.curTagMsg)}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="codeEditer" style={{'display':this.state.showEditer?'block':'none'}}>
                <textarea className="codeEditerInput" ref="codePra"></textarea>
                <p>
                    <input type="button" value="确定" onClick={this.addCodePra}/>&nbsp;
                    <input type="button" value="取消" onClick={this.hideEdit}/>
                </p>
            </div>

            <div className="parHead" style={{'display':this.state.showParHead?'block':'none'}}>
                <div className="parHeadInput" contentEditable="true" ref="pragTitle"></div>
                <p>
                    <input type="button" value="确定" onClick={this.addPragTit}/>&nbsp;
                    <input type="button" value="取消" onClick={this.hideEdit}/>
                </p>
            </div>

            <div className="bodyEditer" style={{'display':this.state.showBodyEditer?'block':'none'}}>
                <div className="bodyEditerInput" contentEditable="true" ref="bodyPra"></div>
                <p>
                    <input type="button" value="确定" onClick={this.addBody}/>&nbsp;
                    <input type="button" value="取消" onClick={this.hideEdit}/>
                </p>
            </div>
        </div>
    }
}

export default EditControlComponent;