import React, { Component } from 'react';
import './style.css';
import { browserHistory } from 'react-router';

import NavBar from '../../components/nav-bar';
import SiteUser from '../../services/site-users-service';

export default class EditSiteUserPage extends Component {

  constructor(props){
    super(props);

    let id = this.props.location.query.id;
    let name = this.props.location.query.name;
    let active = this.props.location.query.active;
    let type = this.props.location.query.type;

    let is_active = "no";
    if(active === "true"){
        is_active = "yes";
    }

    this.state = {
        id: id,
        name:name,
        utype:type,
        active:is_active,
        is_error:false,
        error_msg:""
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onPressUpdateSiteUser(){
    var self = this;
    var user_data = {};
    user_data['id'] = this.state.id;
    user_data['name'] = this.state.name;
    user_data['is_active'] = this.state.active === "yes"? true:false;
    user_data['type'] = this.state.utype;

    let send_data = {"siteuser": user_data};

    SiteUser.editSiteUser(send_data).then((data)=>{
      data.json().then((json_data)=>{
        if(json_data['status']){
          self.setState({is_error:false});
          browserHistory.goBack();
        }else{
          self.setState({is_error:true, error_msg:json_data['message']});
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
                <label htmlFor="title"><h5><b>Edit Site User</b></h5></label>
            </div>
            <div className="form-group col-sm-4">
                <label htmlFor="name">Name</label>
                <input required type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Name" aria-describedby="sizing-addon2" />
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="exampleSelect1">Active</label>
              <select className="form-control" name="active" onChange={this.handleInputChange.bind(this)} id="exampleSelect1">
                <option value="yes" selected={this.state.active === "yes"}>Yes</option>
                <option value="no" selected={this.state.active === "no"}>No</option>
              </select>
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="exampleSelect2">Type</label>
              <select className="form-control" name="utype"  onChange={this.handleInputChange.bind(this)} id="exampleSelect2">
                <option value="Admin" selected={this.state.utype === "Admin"}>Admin</option>
                <option value="Moderator" selected={this.state.utype === "Moderator"}>Moderator</option>
              </select>
            </div>
            <div className="form-group col-sm-3">
                <button className="btn btn-info" onClick={this.onPressUpdateSiteUser.bind(this)} style={{marginRight:40}}>Update</button>
                <button className="btn btn-info" onClick={this.onPressCancel.bind(this)}>Cancel</button>
            </div>
        </div>
      </div>
    );
  }
}

