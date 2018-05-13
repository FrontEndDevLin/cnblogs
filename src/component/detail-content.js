import React, { Component } from 'react';
import MainBodyComponent from './main-body';
import CommentComponent from './comment';
import '../layout/code.css';

class DetailContentComponent extends Component {
    constructor(){
        super();
        this.state = {
            // blogsId: NaN
        }
    }
    componentWillMount(){
        // this.setState({blogsId:this.props.sendBid});
    }
    componentDidUpdate(){
        console.log(this.props.sendBid);
    }
    render(){
        return <div className="content lf">
            <MainBodyComponent sendBid={this.props.sendBid}/>
            <CommentComponent sendBid={this.props.sendBid}/>
        </div>
    }
}

export default DetailContentComponent;