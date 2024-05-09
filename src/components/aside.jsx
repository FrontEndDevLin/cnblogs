import React, { Component, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import request from '../utils/request';

function AsideComponent() {
    let [getNotice, setGetNotice] = useState(false);
    let [admin, setAdmin] = useState({});
    let [activeForm, setActiveForm] = useState([]);
    let [years, setYears] = useState("");
    let [level, setLevel] = useState(0);
    let [uid, setUid] = useState("");
    let [isAdmin, setIsAdmin] = useState(false);
    let [isActive, setIsActive] = useState(false);
    let [tagsArr, setTagsArr] = useState([]);
    let [readTopArr, setReadTopArr] = useState([]);

    useEffect(() => {
        request.get({
            url: "user/adminMsg"
        }).then(res => {
            setAdmin(res.admin);
            setActiveForm(res.activeForm);
            setGetNotice(true);
            getDates(res.admin.regTime);
            showAddActive();
        });

        request.get({
            url: "set/getTag"
        }).then(res => {
            setTagsArr(res);
        });

        request.get({
            url: "blog/readTop"
        }).then(data => {
            if (data.code == 1) {
                setReadTopArr(data.data);
            }
        })
    }, []);

    function getDates(time) {
        var between = new Date().getTime() - time;
        setYears(parseInt(between / (1000 * 60 * 60 * 24)) + "天");
    }

    function showAddActive() {
        request.get({
            url: "user/checkLogin",
            config: {
                credentials: true
            }
        }).then(res => {
            if (res.code == 1) {
                let { data } = res;
                if (data.level == 99) {
                    setLevel(data.level);
                    setIsAdmin(true);
                } else {
                    setLevel(data.level);
                    setUid(data.uid);
                    setIsAdmin(false);
                    var atList = activeForm; //关注列表
                    var isActive = false;
                    for (var i = 0; i < atList.length; i++) {
                        if (data.uid == atList[i].uid) {
                            isActive = true;
                        }
                    }
                    setIsActive(isActive);
                }
            }
        })
    }

    function addActive() {
        if (this.state.isActive === false && this.state.level == 1) {
            request.get({
                url: "user/active",
                params: {
                    uid
                }
            }).then(res => {
                if (res.code == 1) {
                    setIsActive(true);
                } else {
                    setIsActive(false);
                }
            })
        }
    }

    function loadTags(data) {
        var jsxHtml = [];
        for (var i = 0; i < data.length; i++) {
            jsxHtml.push(<p key={i}><a>{data[i].tagName + "(" + data[i].count + ")"}</a></p>);
        }
        return jsxHtml;
    }
    function loadReadTop(data) {
        var jsxHtml = [];
        for (var i = 0; i < data.length; i++) {
            jsxHtml.push(<p key={i}><Link to={{ pathname: '/detail', state: { tid: data[i].blogsId } }}>{(i + 1) + ". " + data[i].title}</Link></p>)
        }
        return jsxHtml;
    }

    return (
        <div className="aside rt">
            <div className="aside-item">
                <p className="title"><span>公告</span></p>
                <div className="item-content">
                    <p>昵称：<span>{getNotice ? admin.uname : ''}</span></p>
                    <p>圆龄：<span>{years}</span></p>
                    <p>关注：<span><a>{getNotice ? activeForm.length : ''}</a></span></p>
                    {/* <p className="clear"><a onClick={this.addActive} className="add-follow rt" href="javascript:;">{this.state.isAdmin ? '' : this.state.isActive === true ? '已关注' : '+加关注'}</a></p> */}
                </div>
            </div>

            <div className="aside-item">
                <p className="title"><span>我的标签</span></p>
                <div className="item-tab-content">
                    <div>
                        {loadTags(tagsArr)}
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
                        {loadReadTop(readTopArr)}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AsideComponent;