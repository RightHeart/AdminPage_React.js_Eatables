import React, { Component } from 'react';
import './style.css';
import { browserHistory } from 'react-router';

import NavBar from '../../components/nav-bar';
import Localize from '../../services/localize-service';

export default class AddAppWordPage extends Component {

  constructor(props){
    super(props);
    this.state = {word:"", is_error:false, error_msg:""}
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onPressAddAppWord(){
    var self = this;
    var send_data = {};
    send_data['word'] = this.state.word;

    Localize.addAppWord(send_data).then((data)=>{
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
                <label htmlFor="title"><h5><b>Add App Word</b></h5></label>
            </div>
            <div className="form-group col-sm-8">
                <label htmlFor="word">Word</label>
                <input type="text" name="word" id="word" value={this.state.word} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Name" aria-describedby="sizing-addon2" />
                <p className="help-block"><br/>Add word that will be use in mobile app for wording. </p>
                <p className="help-block">You can add localize for this wording from listing page.</p>
            </div>
            <div className="form-group col-sm-3">
                <button className="btn btn-info" onClick={this.onPressAddAppWord.bind(this)} style={{marginRight:40}}>Add</button>
                <button className="btn btn-info" onClick={this.onPressCancel.bind(this)}>Cancel</button>
            </div>
        </div>
      </div>
    );
  }
}

