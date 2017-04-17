import React, { Component } from 'react';
import './style.css';
import { browserHistory } from 'react-router';

import NavBar from '../../components/nav-bar';
import Language from '../../services/languages-service';

export default class AddLanguagePage extends Component {

  constructor(props){
    super(props);
    this.state = {name:"",active:"yes",is_error:false,error_msg:""}
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onPressAddLanguage(){
    var self = this;
    var send_data = {};
    send_data['name'] = this.state.name;
    send_data['is_active'] = this.state.active === "yes"? true:false;

    Language.addLanguage(send_data).then((data)=>{
      data.json().then((json_data)=>{
        if(json_data['status']){
          self.setState({is_error:false});
          browserHistory.goBack();
        }else{
          self.setState({is_error:true,password:"",error_msg:json_data['message']});
        }
      })
    })
  }

  onPressCancel(){
    browserHistory.goBack();
  }

  renderErrors(){
    if(this.state.is_error){
      return(
        <div className="alert alert-danger" role="alert">
          <strong>Oh snap!</strong> {this.state.error_msg}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container">
          <NavBar />
          <div style={{marginTop:30}}>
            {this.renderErrors()}
            <div className="form-group col-sm-4">
                <label htmlFor="title"><h5><b>Add Language</b></h5></label>
            </div>
            <div className="form-group col-sm-4">
                <label htmlFor="name">Language</label>
                <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Name" aria-describedby="sizing-addon2" />
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="exampleSelect1">Active</label>
              <select className="form-control" name="active" onChange={this.handleInputChange.bind(this)} id="exampleSelect1">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="form-group col-sm-3">
                <button className="btn btn-info" onClick={this.onPressAddLanguage.bind(this)} style={{marginRight:40}}>Add</button>
                <button className="btn btn-info" onClick={this.onPressCancel.bind(this)}>Cancel</button>
            </div>
        </div>
      </div>
    );
  }
}

