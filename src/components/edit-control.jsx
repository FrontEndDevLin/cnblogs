import React, { Component, useState, useEffect, useRef } from 'react';
import request from '../utils/request';

function EditControlComponent({ saveTags, changeContent }) {
    let [current, setCurrent] = useState("#essay");
    let [title, setTitle] = useState("");
    let [subTitle, setSubTitle] = useState("");
    let [tags, setTags] = useState([]);
    let [showEditer, setShowEditer] = useState(false);
    let [isShowParHead, setIsShowParHead] = useState(false);
    let [showBodyEditer, setShowBodyEditer] = useState(false);
    let [showEditTags, setShowEditTags] = useState(false);
    let [curTagName, setCurTagName] = useState("");
    let [curTagMsg, setCurTagMsg] = useState([]);

    let r_title = useRef();
    let r_subTitle = useRef();
    let r_pragTitle = useRef();
    let r_content = useRef();
    let r_codePra = useRef();
    let r_bodyPra = useRef();
    let r_blog_tit = useRef();
    let r_onTop = useRef();
    let r_onIndex = useRef();
    let r_editTypeOldTag = useRef();
    let r_editTypeId = useRef();
    let r_addTagIpt = useRef();

    useEffect(() => {
        request.get({
            url: "set/getTitle"
        }).then(res => {
            // if(this._isMounted){
                let { data } = res;
                setTitle(data.title);
                setSubTitle(data.sub_title);
                r_title.current.value = data.title;
                r_subTitle.current.value = data.sub_title;
            // }
        });

        addEventListeners();
    }, []);
    useEffect(() => {
        setTags(saveTags);
    }, [saveTags]);
    useEffect(() => {
        let { id, obj } = changeContent;
        if(obj){
            //{tid: "5", tName: "JavaScript"}
            setCurTagName(obj.tName);

            request.get({
                url: "blog/blogsMsg",
                params: {
                    tagId: obj.tid
                }
            }).then(res => {
                if(res.code==1){
                    setCurTagMsg(res.data);
                }
            })
        }
        if (id) {
            setCurrent(id);
        }
    }, [changeContent]);


    function saveTitle() {
        var newTitle = r_title.current.value,
            newSubTitle = r_subTitle.current.value;
        // console.log(newTitle+","+newSubTitle);
        if(newTitle==title && newSubTitle==subTitle){
            return;
        }

        request.get({
            url: "set/changeTitle",
            params: {
                newTitle,
                newSubTitle
            }
        }).then(res => {
            if(res.code==1){
                alert("修改成功");
            }else{
                alert("修改失败");
            }
        })
    }

    function showCodeEdit() {
        setShowEditer(true);
    }
    function showParHead() {
        setIsShowParHead(true);
    }
    function showBody() {
        setShowBodyEditer(true);
    }
    function hideEdit() {
        setShowEditer(false);
        setIsShowParHead(false);
        setShowBodyEditer(false);
        setShowEditTags(false);
    }

    function addPragTit() {
        var title = r_pragTitle.current.innerHTML;
        r_content.current.innerHTML += "<h2 class='step abstract'>"+title+"</h2>";
        r_pragTitle.current.innerHTML = "";
        hideEdit();
    }
    function addCodePra() {
        r_content.current.innerHTML += "<div class='code'><pre>"+r_codePra.current.value+"</pre></div>";
        hideEdit();
    }
    function addBody() {
        r_content.current.innerHTML += "<div class='normal abstract'>"+r_bodyPra.current.innerHTML+"</div>";
        hideEdit();
    }

    //发布
    function publish() {
        var content = r_content.current.innerHTML;
        //构造摘要
        var abstractArr = r_content.current.getElementsByClassName('abstract');
        var abstract = "";
        for(var i=0;i<abstractArr.length;i++){
            abstract += abstractArr[i].innerHTML+" ";
        }

        var title = r_blog_tit.current.value;

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
        var isOnTop = r_onTop.current.checked?1:0;
        var isOnIndex = isOnTop?1:r_onIndex.current.checked?1:0;

        request.post({
            url: "blog/publish",
            data: {
                title,
                content,
                abstract,
                tagId,
                isOnTop,
                isOnIndex
            }
        }).then(res => {
            if(res.code==1){
                alert("发布成功");
                window.location.reload();
            }
        });
    }

    //删除
    function delBlog(id) {
        var bool = window.confirm("确定要删除吗?");
        if(bool){
            request.post({
                url: "blog/delBlog",
                data: {
                    blogsId: id
                }
            }).then(res => {
                if ( res.code == 1 ){
                    alert("删除成功");
                    window.location.reload();
                } else {
                    alert("删除失败");
                }
            })
        }
    }

    //加载分类操作
    function loadCurTagMsg(data) {
        var jsxHtml = [];
        for(var i=0;i<data.length;i++){
            (function(i){
                jsxHtml.push(<tr key={i}>
                    <th className="table-title"><a>{data[i].title+"（"+new Date(data[i].createTime).toLocaleString()+"）"}</a></th>
                    <th>{data[i].commentCount}</th>
                    <th>{data[i].readCount}</th>
                    <th>
                        <a className="btn-edit" onClick={()=>{alert("暂未开放")}}>编辑</a>&nbsp;
                        <a className="btn-del" onClick={()=>{delBlog(data[i].blogsId)}}>删除</a>
                    </th>
                </tr>);
            })(i)
        }
        return jsxHtml;
    }

    //标签名
    function loadTags(tags) {
        var jsxHtml = [];
        for(var i=0;i<tags.length;i++){
            jsxHtml.push(<li key={i}>{tags[i].tagName}&nbsp;<input className="ed-checkbox" type="radio" name="tag" value={tags[i].tagId}/></li>);
        }
        return jsxHtml;
    }

    //编辑页面的tags
    function loadEditTags(tags) {
        var jsxHtml = [];
        for(var i=0;i<tags.length;i++){
            (function(i){
                jsxHtml.push(
                <li key={i}><a>{tags[i].tagName+"("+tags[i].count+")"}</a>&nbsp;
                <a onClick={()=>{editTag(tags[i].tagName,tags[i].tagId)}}>编辑</a>&nbsp;
                <a onClick={()=>{delTag(tags[i].tagName,tags[i].tagId)}}>删除</a></li>);
            })(i)
        }
        return jsxHtml;
    }

    //编辑标题窗口
    function editTag(tagName,tagId) {
        setShowEditTags(true);

        r_editTypeOldTag.current.value = tagName;
        r_editTypeId.current.value = tagId;
    }
    function delTag(tagName, tagId) {
        var bool = window.confirm("确定要删除标签 "+tagName+" 吗？属于该标签下的所有文章将被删除");
        if(bool){
            request.post({
                url: "set/delTName",
                data: {
                    tagId
                }
            }).then(res => {
                if (res.code == 1) {
                    window.location.reload();
                } else {
                    alert("删除失败");
                }
            });
        }
    }
    function addTag() {
        var newTag = r_addTagIpt.current.value.trim();
        if(!newTag) return;
        //检查重复
        var tagArr = tags;
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

        request.get({
            url: "set/addTag",
            params: {
                tagName: newTag
            }
        }).then(res => {
            if(res.code == 1){
                alert("添加成功");
                window.location.reload();
            }else{
                alert("添加失败");
            }
        })
    }
    function changeTagName() {
        var newTag = r_editTypeOldTag.current.value;
        var tagId = r_editTypeId.current.value;
        if(!newTag || !tagId){
            return;
        }

        request.get({
            url: "set/changeTName",
            params: {
                newTName: newTag,
                tagId
            }
        }).then(res => {
            if(res.code == 1){
                alert("修改成功");
                window.location.reload();
            }else{
                alert("修改失败");
            }
        })
    }

    function addEventListeners() {
        r_codePra.current.onkeydown = function(e){
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

    return (
        <div className="right-content rt">
            {/*<!-- 添加随笔 -->*/}
            <div className="essay" id="essay" style={{'display':current=="#essay"?'block':'none'}}>
                <h3 className="right-title">========= 添加新随笔 =========</h3>
                <div className="ed-item">
                    <p className="ed-title">标题</p>
                    <div className="ed-input-box">
                        <input type="text" ref={ r_blog_tit } />
                    </div>
                </div>
                <div className="ed-item">
                    <p className="ed-title">分类</p>
                    <ul className="ed-type-box clear">
                        {loadTags(tags)}
                    </ul>
                </div>
                <div className="ed-item">
                    <p className="ed-title">高级选项</p>
                    <p className="ed-high-rank">
                        <span>置顶
                            <input className="ed-checkbox" type="checkbox" ref={ r_onTop }/>
                        </span>
                        <span>显示在博客首页
                            <input className="ed-checkbox" type="checkbox" ref={ r_onIndex } />
                        </span>
                    </p>
                </div>
                <div className="ed-item">
                    <p className="ed-title">内容</p>
                    <div className="ed-editor-input">
                        <div>
                            <div className="text-area" contentEditable="true" ref={ r_content }></div>
                        </div>
                    </div>
                </div>
                <div className="clear">
                    <p className="lf">
                        <input type="button" value="添加代码片段" onClick={showCodeEdit}/>&nbsp;
                        <input type="button" value="添加段落标题" onClick={showParHead}/>&nbsp;
                        <input type="button" value="编辑正文" onClick={showBody}/>
                    </p>
                    <p className="rt">
                        <input type="button" value="发布" onClick={publish}/>
                    </p>
                </div>
            </div>

            {/*<!-- 设置页 -->*/}
            <div className="setting" id="setting" style={{'display':current=="#setting"?'block':'none'}}>
                <h3 className="right-title">========= 修改设置 =========</h3>
                <div className="ed-item">
                    <p className="ed-title">标题</p>
                    <div className="ed-input-box">
                        <input type="text" ref={ r_title } />
                    </div>
                </div>
                <div className="ed-item">
                    <p className="ed-title">子标题</p>
                    <div className="ed-input-box">
                        <input type="text" ref={ r_subTitle } />
                    </div>
                </div>
                <div className="ed-item clear"> 
                    <p className="rt">
                        <input type="button" value="保存" onClick={saveTitle}/>
                    </p>
                </div>
            </div>

            {/*<!-- 编辑分类页 -->*/}
            <div className="editTypePage" id="editTypePage" style={{'display':current=="#editTypePage"?'block':'none'}}>
                <h3 className="right-title">========= 编辑分类 =========</h3>
                <div className="ed-item">
                    <p className="ed-title">已有分类</p>
                    <ul className="ed-typelist clear">
                        {loadEditTags(tags)}
                    </ul>
                </div>
                <div className="ed-item">
                    <p className="ed-title">添加分类</p>
                    <div style={{"marginBottom": "10px"}}>
                        <input type="text" ref={ r_addTagIpt }/>
                    </div>
                    <p>
                        <input type="button" value="添加" onClick={addTag}/>
                    </p>
                </div>
                <div className="prompt" style={{'display':showEditTags?'block':'none'}}>
                    <input type="text" ref={ r_editTypeOldTag }/>
                    <input type="hidden" ref={ r_editTypeId } />
                    <p>
                        <button onClick={changeTagName}>确定</button>&nbsp;&nbsp;
                        <button onClick={hideEdit}>取消</button>
                    </p>
                </div>
            </div>

            {/*<!-- 分类页 -->*/}
            <div className="typePage" id="typePage" style={{'display':current=="#typePage"?'block':'none'}}>
                <h3 className="right-title">========= 当前分类: <span>{curTagName}</span> =========</h3>
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
                            {loadCurTagMsg(curTagMsg)}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="codeEditer" style={{'display':showEditer?'block':'none'}}>
                <textarea className="codeEditerInput" ref={r_codePra}></textarea>
                <p>
                    <input type="button" value="确定" onClick={addCodePra}/>&nbsp;
                    <input type="button" value="取消" onClick={hideEdit}/>
                </p>
            </div>

            <div className="parHead" style={{'display':isShowParHead?'block':'none'}}>
                <div className="parHeadInput" contentEditable="true" ref={ r_pragTitle }></div>
                <p>
                    <input type="button" value="确定" onClick={addPragTit}/>&nbsp;
                    <input type="button" value="取消" onClick={hideEdit}/>
                </p>
            </div>

            <div className="bodyEditer" style={{'display':showBodyEditer?'block':'none'}}>
                <div className="bodyEditerInput" contentEditable="true" ref={r_bodyPra}></div>
                <p>
                    <input type="button" value="确定" onClick={addBody}/>&nbsp;
                    <input type="button" value="取消" onClick={hideEdit}/>
                </p>
            </div>
        </div>
    )
}

export default EditControlComponent;