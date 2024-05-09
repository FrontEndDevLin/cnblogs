import React, { useState } from 'react';
import EditSideComponent from './edit-side';
import EditControlComponent from './edit-control'

function EditContainerComponent() {
    let [tags, setTags] = useState([]);
    let [contentData, setContentData] = useState({ id: void(0), obj: null });

    function recive(id, obj){
        setContentData({ id, obj });
    }
    function reciveTags(data) {
        setTags(data);
    }
    
    return (
        <div className="container clear">
            <EditSideComponent toSider={recive} rcvTags={reciveTags}></EditSideComponent>
            <EditControlComponent saveTags={ tags } changeContent={ contentData }></EditControlComponent>
        </div>
    )
}

export default EditContainerComponent;