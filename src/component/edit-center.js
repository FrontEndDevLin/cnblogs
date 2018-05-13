import React, { Component } from 'react';
import EditHeaderComponent from './edit-header';
import EditContainerComponent from './edit-container';
import '../layout/editcenter.css';
import '../layout/init.css';

class EditCenterComponent extends Component{
    render(){
        return <div className="edit-center">
            <EditHeaderComponent />
            <EditContainerComponent />
        </div>
    }
}

export default EditCenterComponent;