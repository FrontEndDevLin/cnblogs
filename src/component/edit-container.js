import React, { Component } from 'react';
import EditSideComponent from './edit-side';
import EditControlComponent from './edit-control'

class EditContainerComponent extends Component{
    recive=(id,obj)=>{
        if(obj){
            this.refs.control.changeContent(id,obj);
        }else{
            this.refs.control.changeContent(id);
        }
    }
    reciveTags=(data)=>{
        this.refs.control.saveTags(data);
    }
    render(){
        return <div className="container clear">
            <EditSideComponent toSider={this.recive} rcvTags={this.reciveTags}></EditSideComponent>
            <EditControlComponent ref="control"></EditControlComponent>
        </div>
    }
}

export default EditContainerComponent;