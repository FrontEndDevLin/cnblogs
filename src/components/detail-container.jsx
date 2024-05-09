import React from 'react';
import DetailContentComponent from './detail-content';
import AsideComponent  from './aside';

function DetailContainerComponent({ sendBid }) {
    return (
        <div className="container clear">
            <DetailContentComponent sendBid={ sendBid }/>
            <AsideComponent />
        </div>
    )
}

export default DetailContainerComponent;