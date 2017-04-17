import React, { Component } from 'react';
import './style.css';
import { browserHistory } from 'react-router';

import NavBar from '../../components/nav-bar';
import SiteUser from '../../services/site-users-service';

export default class AddSiteUserPage extends Component {

  constructor(props){
    super(props);
    this.state = {username:"",password:"",name:"",
    emailaddress:"",utype:"Admin",active:"yes",is_error:false,error_msg:""}
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onPressAddSiteUser(){
    var self = this;
    var send_data = {};
    send_data['name'] = this.state.name;
    send_data['username'] = this.state.username;
    send_data['password'] = this.state.password;
    send_data['email'] = this.state.emailaddress;
    send_data['is_active'] = this.state.active === "yes"? true:false;
    send_data['type'] = this.state.utype;

    SiteUser.addSiteUser(send_data).then((data)=>{
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
                <label htmlFor="title"><h5><b>Add Site User</b></h5></label>
            </div>
            <div className="form-group col-sm-4">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Name" aria-describedby="sizing-addon2" />
            </div>
            <div className="form-group col-sm-4">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" value={this.state.username} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Username" aria-describedby="sizing-addon2" />
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Password" aria-describedby="sizing-addon2" />
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" id="exampleInputEmail1"  name="emailaddress" value={this.state.emailaddress} onChange={this.handleInputChange.bind(this)} className="form-control" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="exampleSelect1">Active</label>
              <select className="form-control" name="active" onChange={this.handleInputChange.bind(this)} id="exampleSelect1">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="exampleSelect2">Type</label>
              <select className="form-control" name="utype"  onChange={this.handleInputChange.bind(this)} id="exampleSelect2">
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
              </select>
            </div>
            <div className="form-group col-sm-3">
                <button className="btn btn-info" onClick={this.onPressAddSiteUser.bind(this)} style={{marginRight:40}}>Add</button>
                <button className="btn btn-info" onClick={this.onPressCancel.bind(this)}>Cancel</button>
            </div>
        </div>
      </div>
    );
  }
}

