import React, { useState, useEffect, useRef } from 'react';
import request from '../utils/request';

function MainBodyComponent(props) {
    let [ detail, setDetail ] = useState(null);
    let [ blogsId, setBlogsId ] = useState(void(0));
    
    let content = useRef();

    let { tid } = props.sendBid;

    useEffect(() => {
        if (!tid) {
            return;
        }
        setBlogsId(tid);

        request.get({
            url: "blog/detail",
            params: {
                blogsId: tid
            }
        }).then(res => {
            if(res.code==1){
                // console.log(data.data);
                setDetail(res.data);

                let reg = /<pre>.*?<\/pre>/ig;
                console.log(res.data.content.match(reg));

                content.current.innerHTML = res.data.content;
            }
        })
    }, []);

    useEffect(() => {
        if (!blogsId) {
            // 防止首次渲染调用
            return;
        }
        if (!tid || blogsId == tid) {
            return;
        }

        request.get({
            url: "blog/detail",
            params: {
                blogsId: tid
            }
        }).then(res => {
            if(res.code==1){
                setDetail(res.data);
            }
        })
    }, [tid])

    return (
        <div className="content-item">
            <div className="article">
                <h2 className="c-title">{detail?detail.title:""}</h2>
                <div className="c-content" ref={ content }>
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
                    <p className="c-footer-type"><b>标签:</b><span>{detail?detail.tagName:""}</span></p>
                    <div className="c-footer-page">
                        {/*<p>上一篇：<a href="#">Windows Java环境变量配置</a></p>
                        <p>下一篇：<a href="#">Windows Java环境变量配置</a></p>*/}
                    </div>
                    <p className="c-footer-msg">
                        <span>阅读({detail?detail.readCount:""})</span>
                        <span>评论({detail?detail.comCount:""})</span>
                        <span>{detail?new Date(detail.createTime).toLocaleString():""}</span>&nbsp;
                        <span>{detail?detail.author:""}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MainBodyComponent;