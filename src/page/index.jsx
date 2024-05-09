import React from 'react';
import MainHeaderComponent from '../components/main-header';
import IndexContainerComponent from '../components/index-container';
import MainFooterComponent from '../components/main-footer';

function IndexComponent() {
    return (
        <div className="main clear">
            <MainHeaderComponent />
            <IndexContainerComponent />
            <MainFooterComponent />
        </div>
    )
}

export default IndexComponent;