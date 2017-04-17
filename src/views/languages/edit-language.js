import React, { Component } from 'react';
import './style.css';
import { browserHistory } from 'react-router';

import NavBar from '../../components/nav-bar';
import Language from '../../services/languages-service';

export default class EditLanguagePage extends Component {

  constructor(props){
    super(props);
    let id = this.props.location.query.id;
    let name = this.props.location.query.name;
    let active = this.props.location.query.active;
    let is_active = "no";
    if(active === "true"){
        is_active = "yes";
    }
    this.state = {id: id, name:name, active:is_active, is_error:false, error_msg:""}
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onPressUpdateLanguage(){
    var self = this;
    var lang_data = {};
    lang_data['name'] = this.state.name;
    lang_data['id'] = this.state.id;
    lang_data['is_active'] = this.state.active === "yes"? true:false;

    let send_data = {"language":lang_data};

    Language.editLanguage(send_data).then((data)=>{
      data.json().then((json_data)=>{
        if(json_data['status']){
          self.setState({is_error:false});
          browserHistory.goBack();
        }else{
          self.setState({is_error:true ,error_msg:json_data['message']});
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
                <label htmlFor="title"><h5><b>Edit Language</b></h5></label>
            </div>
            <div className="form-group col-sm-4">
                <label htmlFor="name">Language</label>
                <input disabled type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Name" aria-describedby="sizing-addon2" />
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="exampleSelect1">Active</label>
              <select className="form-control" name="active" onChange={this.handleInputChange.bind(this)} id="exampleSelect1">
                <option value="yes" selected={this.state.active === "yes"}>Yes</option>
                <option value="no" selected={this.state.active === "no"}>No</option>
              </select>
            </div>
            <div className="form-group col-sm-3">
                <button className="btn btn-info" onClick={this.onPressUpdateLanguage.bind(this)} style={{marginRight:40}}>Update</button>
                <button className="btn btn-info" onClick={this.onPressCancel.bind(this)}>Cancel</button>
            </div>
        </div>
      </div>
    );
  }
}

