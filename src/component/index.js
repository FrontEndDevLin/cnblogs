import React, { Component } from 'react';
import MainHeaderComponent from './main-header';
import IndexContainerComponent from './index-container';
import MainFooterComponent from './main-footer';

class IndexComponent extends Component {
    render() {
        return <div className="main clear">
            <MainHeaderComponent />
            <IndexContainerComponent />
            <MainFooterComponent />
        </div>
    }
}

export default IndexComponent;