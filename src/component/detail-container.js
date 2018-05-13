import React, { Component } from 'react';
import DetailContentComponent from './detail-content';
import AsideComponent  from './aside';

class DetailContainerComponent extends Component {
    componentWillMount(){
        // console.log(this.props.sendBid)
    }
    componentDidMount(){
        // console.log();
    }
    render(){
        return <div className="container clear">
            <DetailContentComponent sendBid={this.props.sendBid}/>
            <AsideComponent />
        </div>
    }
}

export default DetailContainerComponent;