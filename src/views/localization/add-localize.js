import React, { Component } from 'react';
import './style.css';
import { browserHistory } from 'react-router';

import NavBar from '../../components/nav-bar';
import Localize from '../../services/localize-service';
import Language from '../../services/languages-service';

export default class AddAppLocalizePage extends Component {
  constructor(props){
    super(props);
    this.state = {appwords:[], inputs:{}, language:"", languages:[]};
  }

  componentDidMount(){
    this.getAllAppWords();
    this.getAllLanguages();
  }

  getAllAppWords(){
    let self = this;
    Localize.getAppWords().then((data)=>{
      data.json().then((json_data)=>{
        var inputs = {}
        for(var i = 0 ; i < json_data['data'].length ; i++){
            inputs[i] = json_data['data'][i]['word'];
        }
        self.setState({appwords:json_data['data'],inputs:inputs});
      });
    });
  }

  getAllLanguages(){
    let self = this;
    Language.getLanguages().then((data)=>{
      data.json().then((json_data) => {
        self.setState({languages: json_data['data'], language:json_data['data'][0]['name']});
      });
    });
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let inputs = this.state.inputs;
    inputs[name]  = value;
    if(name === "language"){
        this.setState({language:value});
    }
    this.setState({
        inputs
    });
  }

  renderLanguages(){
      var returnVals = [];
      let langs = this.state.languages;
      for (var i = 0; i < langs.length; i++) {
          var lang = langs[i];
          returnVals.push(
            <option key={i} value={lang.name}>{lang.name}</option>
          );
      }
      return returnVals;
  }

  renderAppWords(){
    var returnVals = [];
    let appwords = this.state.appwords;
    for (var i = 0; i < appwords.length; i++) {
      var appword = appwords[i];
      returnVals.push(
          <tr key={i}>
            <th scope="row">{i+1}</th>
            <td>
                {appword.word}
            </td>
            <td style={{textAlign:'center'}}>
                <input type="text" name={i} value={this.state.inputs[i]} onChange={this.handleInputChange.bind(this)} className="form-control inputLocal" placeholder="Add Localization Here" aria-describedby="sizing-addon2" />
            </td>
          </tr>
      );
    }
    return returnVals;
  }

  onPressSave(){
    var self = this;
    let inputs = this.state.inputs;
    let words = this.state.appwords;
    let send_data = {};

    let localize = {};
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        localize[word['_id']] = inputs[i];
    }

    send_data['language'] = this.state.language;
    send_data['localize'] = localize;

    Localize.addAppLocalize(send_data).then((data)=>{
      data.json().then((json_data)=>{
        if(json_data['status']){
          self.setState({is_error:false});
          browserHistory.goBack();
        }else{
          self.setState({is_error:true, error_msg:json_data['message']});
        }
      })
    });
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
          <NavBar pageName="addlocalize"/>
          <div style={{marginTop:40}}>
            {this.renderErrors()}
            {this.state.appwords.length > 1 &&
                <div className="form-group col-sm-4">
                    <button className="btn btn-info" onClick={this.onPressSave.bind(this)} style={{marginRight:40}}>Save</button>
                    <button className="btn btn-info" onClick={this.onPressCancel.bind(this)}>Cancel</button>
                </div>
            }
            {this.state.appwords.length > 1 &&
                <div>
                    <div className="form-group col-sm-4">
                        <label htmlFor="language">Select Language</label>
                        <select className="form-control" name="language" onChange={this.handleInputChange.bind(this)} id="language">
                            {this.renderLanguages()}
                        </select>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered" style={{marginTop:20}}>
                        <thead className="thead-default">
                            <tr>
                            <th>#</th>
                            <th>Word</th>
                            <th>Localization - {this.state.language}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderAppWords()}
                        </tbody>
                        </table>
                    </div>
                </div>
            }
            </div>
      </div>
    );
  }
}

