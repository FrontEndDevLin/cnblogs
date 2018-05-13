import React, { Component } from 'react';
import MainHeaderComponent from './main-header';
import DetailContainerComponent from './detail-container';
import MainFooterComponent from './main-footer';
 
class DetailComponent extends Component {
    constructor(){
        super();
        // this.state = {
        //     isLogin: false,
        //     uid: ""
        // }
    }
    componentWillMount(){
        // console.log(this.props.location.state);
    }
    componentDidMount(){
        // console.log(this.refs.header.state);
    }
    render(){
        return <div className="main clear">
            <MainHeaderComponent ref="header"></MainHeaderComponent>
            <DetailContainerComponent sendBid={this.props.location.state}></DetailContainerComponent>
            <MainFooterComponent></MainFooterComponent>
        </div>
    }
}

export default DetailComponent;