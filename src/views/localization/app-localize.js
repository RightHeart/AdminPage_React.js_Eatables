import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router';

import NavBar from '../../components/nav-bar';
import Localize from '../../services/localize-service';

export default class AppLocalizePage extends Component {
  constructor(props){
    super(props);
    this.state = { applocalize:[], appwords:[] };
  }

  componentDidMount(){
    this.getAllAppLocalize();
  }

  getAllAppLocalize(){
    let self = this;
    Localize.getAllAppLocalize().then((data)=>{
      data.json().then((json_data)=>{
        self.setState({applocalize:json_data['data']});
      });
    });
  }

  renderAppLocalize(){
    var returnVals = [];
    let locs = this.state.applocalize;
    for (var i = 0; i < locs.length; i++) {
      var loc = locs[i];
      returnVals.push(
          <tr key={i}>
            <th scope="row">{i+1}</th>
            <td style={{textAlign:'left'}}>{loc.language}</td>
            <td>
              <Link style={{marginRight:10}} to={{ pathname: '/editapplocalize', query: {  type:'applocalize', id: loc._id } }}>Edit</Link>
              <Link style={{marginRight:10}} to={{ pathname: '/deleteitem', query: {  type:'applocalize', id: loc._id } }}>Delete</Link>
            </td>
          </tr>
      );
    }
    return returnVals;
  }

  render() {
    return (
      <div className="container">
          <NavBar pageName="appwords"/>
          <div style={{marginTop:20}}>
            <Link className="btn btn-info" style={{marginTop:20}} to="/addapplocalize">Add New App Localize</Link>
            <Link className="btn btn-info" style={{marginTop:20, marginLeft:20}} to="/appwords">List Of App Words</Link>
            {this.state.applocalize.length > 0 &&
                <table className="table table-bordered table-responsive" style={{marginTop:20}}>
                <thead className="thead-default">
                    <tr>
                    <th>#</th>
                    <th>Language</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderAppLocalize()}
                </tbody>
                </table>
            }
            {this.state.applocalize.length === 0 &&
                <div style={{marginTop:20}}>
                    <h6>There are no any localization available for app words/labels.</h6>
                </div>
            }
          </div>
      </div>
    );
  }
}

