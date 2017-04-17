import React, { Component } from 'react';
import './style.css';
import { browserHistory } from 'react-router';

import NavBar from '../../components/nav-bar';
import Localize from '../../services/localize-service';

export default class EditAppWordPage extends Component {

  constructor(props){
    super(props);
    let word_vals = this.props.location.query;
    this.state = {word:word_vals.word_name, id:word_vals.word_id, is_error:false, error_msg:""}
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onPressUpdateAppWord(){
    var self = this;

    var word_data = {};
    word_data['id'] = this.state.id;
    word_data['value'] = this.state.word;

    let send_data = {};
    send_data['word'] = word_data;

    Localize.editAppWord(send_data).then((data)=>{
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
                <label htmlFor="title"><h5><b>Edit App Word</b></h5></label>
            </div>
            <div className="form-group col-sm-8">
                <label htmlFor="word">Word</label>
                <input type="text" name="word" id="word" value={this.state.word} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Name" aria-describedby="sizing-addon2" />
            </div>
            <div className="form-group col-sm-3">
                <button className="btn btn-info" onClick={this.onPressUpdateAppWord.bind(this)} style={{marginRight:40}}>Update</button>
                <button className="btn btn-info" onClick={this.onPressCancel.bind(this)}>Cancel</button>
            </div>
        </div>
      </div>
    );
  }
}

