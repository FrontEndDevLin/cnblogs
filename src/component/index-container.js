import React, { Component } from 'react';
import IndexContentComponent from './index-content';
import AsideComponent  from './aside';

class IndexContainerComponent extends Component {
    render(){
        return <div className="container clear">
            <IndexContentComponent />
            <AsideComponent />
        </div>
    }
}

export default IndexContainerComponent;