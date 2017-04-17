import React, { Component } from 'react';
import './style.css';
import { browserHistory } from 'react-router';

import NavBar from '../../components/nav-bar';
import Setting from '../../services/settings-service';

export default class EditConfigPage extends Component {

  constructor(props){
    super(props);
    let id = this.props.location.query.id;
    this.state = {id: id, item:"", cvalue:"", is_error:false, error_msg:""}
  }

  componentDidMount(){
      this.getConfigById(this.state.id);
  }

  getConfigById(id){
    let self = this;
    let send_data = {id:id};
    Setting.getConfigById(send_data).then((data)=>{
      data.json().then((json_data) => {
          let config = json_data['data'];
          self.setState({
                id: config._id,
                item: config.item,
                cvalue: config.cvalue,
          });
      });
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onPressUpdateConfig(){
    var self = this;
    var config_data = {};
    config_data['item'] = this.state.item;
    config_data['id'] = this.state.id;
    config_data['cvalue'] = this.state.cvalue;

    let send_data = {"config":config_data};

    Setting.editConfig(send_data).then((data)=>{
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
                <label htmlFor="title"><h5><b>Edit Config</b></h5></label>
            </div>
            <div className="form-group col-sm-4">
                <label htmlFor="name">Item</label>
                <input disabled type="text" name="item" id="item" value={this.state.item} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Item" aria-describedby="sizing-addon2" />
            </div>
            <div className="form-group col-sm-4">
                <label htmlFor="name">Config Value</label>
                <input type="text" name="cvalue" id="cvalue" value={this.state.cvalue} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Config Value" aria-describedby="sizing-addon2" />
            </div>
            <div className="form-group col-sm-3">
                <button className="btn btn-info" onClick={this.onPressUpdateConfig.bind(this)} style={{marginRight:40}}>Update</button>
                <button className="btn btn-info" onClick={this.onPressCancel.bind(this)}>Cancel</button>
            </div>
        </div>
      </div>
    );
  }
}

