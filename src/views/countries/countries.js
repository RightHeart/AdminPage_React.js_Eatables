import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router';

import NavBar from '../../components/nav-bar';
import Country from '../../services/countries-service';
import config from '../../helpers/config';

export default class CountriesPage extends Component {
  constructor(props){
    super(props);
    this.state = {countries:[]};
  }

  componentDidMount(){
    this.getAllCountries();
  }

  getAllCountries(){
    let self = this;
    Country.getCountries().then((data)=>{
      data.json().then((json_data)=>{
        self.setState({countries:json_data['data']});
      });
    });
  }

  renderCountries(){
    var returnVals = [];
    let couns = this.state.countries;
    for (var i = 0; i < couns.length; i++) {
      var coun = couns[i];
      returnVals.push(
          <tr key={i}>
            <th scope="row">{i+1}</th>
            <td>
                <img src={config.urls.api_url+coun.flag_path} alt={coun.name} width='40' height='25'/>
            </td>
            <td>{coun.name}</td>
            <td>{coun.calling_code}</td>
            <td>{coun.country_alpha}</td>
            <td>{coun.is_active ? 'Yes': 'No'}</td>
            <td>
              <Link style={{marginRight:10}} to={{ pathname: '/editcountry', query: { id: coun._id, name: coun.name, active:coun.is_active } }}>Edit</Link>
              <Link style={{marginRight:10}} to={{ pathname: '/deleteitem', query: {  type:'country', id: coun._id } }}>Delete</Link>
            </td>
          </tr>
      );
    }
    return returnVals;
  }

  render() {
    return (
      <div className="container">
          <NavBar pageName="country"/>
          <div style={{marginTop:20}}>
            <Link className="btn btn-info" style={{marginTop:20}} to="/addcountry">Add New Country</Link>
            {this.state.countries.length > 0 &&
              <div className="table-responsive">
                <table className="table table-bordered" style={{marginTop:20}}>
                  <thead className="thead-default">
                      <tr>
                      <th>#</th>
                      <th>Flag</th>
                      <th>Country</th>
                      <th>Calling Code</th>
                      <th>Alpha</th>
                      <th>Active</th>
                      <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {this.renderCountries()}
                  </tbody>
                </table>
              </div>   
            }
            {this.state.countries.length === 0 &&
                <div style={{marginTop:20}}>
                    <h6>There are no any countries assigned.</h6>
                </div>
            }
          </div>
      </div>
    );
  }
}

