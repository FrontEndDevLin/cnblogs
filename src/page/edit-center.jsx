import React from 'react';
import EditHeaderComponent from '../components/edit-header';
import EditContainerComponent from '../components/edit-container';
import '../layout/editcenter.css';
import '../layout/init.css';

function EditCenterComponent() {
    return (
        <div className="edit-center">
            <EditHeaderComponent />
            <EditContainerComponent />
        </div>
    )
}

export default EditCenterComponent;