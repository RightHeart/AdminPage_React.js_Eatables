import React, { Component } from 'react';
import './style.css';
import { browserHistory } from 'react-router';

import NavBar from '../../components/nav-bar';
import Setting from '../../services/settings-service';

export default class AddConfigPage extends Component {

  constructor(props){
    super(props);
    this.state = {item:"",cvalue:"",is_error:false,error_msg:""}
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onPressAddConfig(){
    var self = this;
    var config_data = {};
    config_data['item'] = this.state.item;
    config_data['cvalue'] = this.state.cvalue;

    let send_data = {config:config_data};

    Setting.addConfig(send_data).then((data)=>{
      data.json().then((json_data)=>{
        if(json_data['status']){
          self.setState({is_error:false});
          browserHistory.goBack();
        }else{
          self.setState({is_error:true,error_msg:json_data['message']});
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
                <label htmlFor="title"><h5><b>Add Config Item</b></h5></label>
            </div>
            <div className="form-group col-sm-4">
                <label htmlFor="item">Item</label>
                <input type="text" name="item" id="item" value={this.state.item} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Item" aria-describedby="sizing-addon2" />
            </div>
            <div className="form-group col-sm-4">
                <label htmlFor="cvalue">Value</label>
                <input type="text" name="cvalue" id="cvalue" value={this.state.cvalue} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Config Value" aria-describedby="sizing-addon2" />
            </div>
            <div className="form-group col-sm-3">
                <button className="btn btn-info" onClick={this.onPressAddConfig.bind(this)} style={{marginRight:40}}>Add</button>
                <button className="btn btn-info" onClick={this.onPressCancel.bind(this)}>Cancel</button>
            </div>
        </div>
      </div>
    );
  }
}

