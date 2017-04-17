import React, { Component } from 'react';
import './style.css';
import { browserHistory } from 'react-router';

import NavBar from '../../components/nav-bar';
import Localize from '../../services/localize-service';

export default class EditAppLocalizePage extends Component {
  constructor(props){
    super(props);
    this.state = {applocalize: [], appwords:[], inputs:{}, language:"", selectedLocId:""};
  }

  componentDidMount(){
    this.getAllAppWords();
  }

  getAllAppWords(){
    let self = this;
    Localize.getAppWords().then((data)=>{
      data.json().then((json_data)=>{
        self.setState({appwords:json_data['data']});
        self.getAllAppLocalize();
      });
    });
  }

  getAllAppLocalize(){
    let self = this;
    Localize.getAllAppLocalize().then((data)=>{
      data.json().then((json_data)=>{
        let localize = json_data['data'];
        let selectedLoc = localize.filter((data)=>{
            return data._id === this.props.location.query.id;
        });

        let locs = [];
        let selLoc = selectedLoc[0]['localize'];
        let appWords = self.state.appwords;

        function getFilterAppWord(key){
          let appWord = appWords.filter((data)=>{
                return data._id === key;
          });
          return appWord;
        }

        for (var key in selLoc) {
          if(selLoc.hasOwnProperty(key)) {
            let loc = {};
            let appWord = getFilterAppWord(key);
            if(appWord.length > 0){
                loc['id'] = key;
                loc['value'] = selLoc[key];
                locs.push(loc);
            }
          }
        }

        for(var j = 0; j < appWords.length; j++){
          let appWord = appWords[j]._id;
          if(!selLoc.hasOwnProperty(appWord)){
            let loc = {};
            loc['id'] = appWord;
            loc['value'] = "";
            locs.push(loc);
          }
        }

        var inputs = {};
        for(var i = 0 ; i < locs.length ; i++){
            inputs[i] = locs[i]['value'];
        }
        self.setState({
            selectedLocId: selectedLoc[0]['_id'],
            applocalize:locs,
            language: selectedLoc[0].language,
            inputs:inputs
        });
      });
    });
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let inputs = this.state.inputs;
    inputs[name]  = value;
    this.setState({
        inputs
    });
  }

  renderAppWords(){
    var returnVals = [];
    let applocalize = this.state.applocalize;
    for (var i = 0; i < applocalize.length; i++) {
      var loc = applocalize[i];
      returnVals.push(
          <tr key={i}>
            <th scope="row">{i+1}</th>
            <td>
                {this.getWordName(loc.id).word}
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
    let locs = this.state.applocalize;
    let loc_data = {};

    let localize = {};
    for (var i = 0; i < locs.length; i++) {
        var loc = locs[i];
        localize[loc['id']] = inputs[i];
    }

    loc_data['id'] = this.state.selectedLocId;
    loc_data['language'] = this.state.language;
    loc_data['localize'] = localize;

    let send_data = {"localize":loc_data};

    Localize.editAppLocalize(send_data).then((data)=>{
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

  getWordName(id){
      let word = this.state.appwords.filter((data)=>{
        return data._id === id;
      });
      return word[0];
  }

  render() {
    return (
      <div className="container">
          <NavBar pageName="addlocalize"/>
          <div style={{marginTop:40}}>
            {this.renderErrors()}
            {this.state.appwords.length > 1 &&
                <div className="form-group col-sm-4">
                    <button className="btn btn-info" onClick={this.onPressSave.bind(this)} style={{marginRight:40}}>Update</button>
                    <button className="btn btn-info" onClick={this.onPressCancel.bind(this)}>Cancel</button>
                </div>
            }
            {this.state.appwords.length > 1 &&
                <div>
                    <div className="form-group col-sm-4">
                        <label htmlFor="language">Language</label>
                        <select className="form-control" name="language" disabled id="language">
                            <option value="0">{this.state.language}</option>
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

