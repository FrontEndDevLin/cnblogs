import React from 'react';
import MainBodyComponent from './main-body';
import CommentComponent from './comment';
import '../layout/code.css';

function DetailContentComponent({ sendBid }) {
    return (
        <div className="content lf">
            <MainBodyComponent sendBid={sendBid}/>
            <CommentComponent sendBid={sendBid}/>
        </div>
    )
}

export default DetailContentComponent;