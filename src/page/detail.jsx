import React from 'react';
import MainHeaderComponent from '../components/main-header';
import DetailContainerComponent from '../components/detail-container';
import MainFooterComponent from '../components/main-footer';

function DetailComponent(props) {
    // TODO: sendBid不用props传，使用context
    return (
        <div className="main clear">
            <MainHeaderComponent></MainHeaderComponent>
            <DetailContainerComponent sendBid={props.location.state}></DetailContainerComponent>
            <MainFooterComponent></MainFooterComponent>
        </div>
    )
}

export default DetailComponent;