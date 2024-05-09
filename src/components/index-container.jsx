import React from 'react';
import IndexContentComponent from './index-content';
import AsideComponent  from './aside';

function IndexContainerComponent() {
    return (
        <div className="container clear">
            <IndexContentComponent />
            <AsideComponent />
        </div>
    )
}

export default IndexContainerComponent;