import React, { Component } from 'react';
import './style.css';
import { browserHistory } from 'react-router';

import NavBar from '../../components/nav-bar';
import Country from '../../services/countries-service';
import config from '../../helpers/config';

export default class AddCountryPage extends Component {

  constructor(props){
    super(props);
    this.state = { country_name: "0", calling_code: "", flag_path: "",
    country_alpha: "", active:"yes", is_error:false, error_msg:"", defaultCountries: []}
  }

  componentDidMount(){
    this.getAllDefaultCountries();
  }

  getAllDefaultCountries(){
    let self = this;
    Country.getDefaultCountries().then((data)=>{
      data.json().then((json_data) => {
        self.setState({defaultCountries: json_data});
      });
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if(name === "country_name"){
        let selCoun = this.state.defaultCountries.filter((data)=>{
            return data.alpha2 === value;
        });
        if(selCoun.length === 1){
            let coun = selCoun[0];
            let flag_path = config.urls.img_country_path +"/"+ coun.alpha2.toLowerCase() + ".png"
            this.setState({country_name:coun.name, calling_code: coun.countryCallingCodes[0],
            country_alpha:coun.alpha2, flag_path:flag_path});
        }else{
            this.setState({country_name:"0", calling_code: "",
            country_alpha:"",flag_path:""});
        }
    }else{
        this.setState({
            [name]: value
        });
    }
  }

  onPressAddCountry(){
    var self = this;
    if(this.state.country_name === "0"){
        this.setState({is_error:true, error_msg: "Please select country first"});
        return;
    }
    this.setState({is_error:false, error_msg: ""});

    var send_data = {};
    send_data['name'] = this.state.country_name;
    send_data['calling_code'] = this.state.calling_code;
    send_data['country_alpha'] = this.state.country_alpha;
    send_data['flag_path'] = this.state.flag_path;
    send_data['is_active'] = this.state.active === "yes"? true:false;

    Country.addCountry(send_data).then((data)=>{
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

  renderDefaultCountries(){
      var returnVals = [];
      let dCouns = this.state.defaultCountries;
      for (var i = 0; i < dCouns.length; i++) {
          var couns = dCouns[i];
          returnVals.push(
            <option key={i} value={couns.alpha2}>{couns.name}</option>
          );
      }
      return returnVals;
  }

  render() {
    return (
      <div className="container">
          <NavBar />
          <div style={{marginTop:30}}>
            {this.renderErrors()}
            <div className="form-group col-sm-4">
                <label htmlFor="title"><h5><b>Add Country</b></h5></label>
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="country">Select Country</label>
              <select className="form-control" name="country_name" onChange={this.handleInputChange.bind(this)} id="country">
                <option value="0">Select country</option>
                {this.renderDefaultCountries()}
              </select>
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="active">Active</label>
              <select className="form-control" name="active" onChange={this.handleInputChange.bind(this)} id="active">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="form-group col-sm-3">
                <button className="btn btn-info" onClick={this.onPressAddCountry.bind(this)} style={{marginRight:40}}>Add</button>
                <button className="btn btn-info" onClick={this.onPressCancel.bind(this)}>Cancel</button>
            </div>
        </div>
      </div>
    );
  }
}

