import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router';

import NavBar from '../../components/nav-bar';
import Setting from '../../services/settings-service';

export default class SettingPage extends Component {
  constructor(props){
    super(props);
    this.state = {configs:[]};
  }

  componentDidMount(){
    this.getAllConfig();
  }

  getAllConfig(){
    let self = this;
    Setting.getConfig().then((data)=>{
      data.json().then((json_data)=>{
        self.setState({configs:json_data['data']});
      });
    });
  }

  renderConfigs(){
    var returnVals = [];
    let confs = this.state.configs;
    for (var i = 0; i < confs.length; i++) {
      var config = confs[i];
      returnVals.push(
          <tr key={i}>
            <th scope="row">{i+1}</th>
            <td>{config.item}</td>
            <td>{config.cvalue}</td>
            <td>
              <Link style={{marginRight:10}} to={{ pathname: '/editconfig', query: { id: config._id } }}>Edit</Link>
              <Link style={{marginRight:10}} to={{ pathname: '/deleteitem', query: {  type:'config', id: config._id } }}>Delete</Link>
            </td>
          </tr>
      );
    }
    return returnVals;
  }

  render() {
    return (
      <div className="container">
          <NavBar pageName="config"/>
          <div style={{marginTop:20}}>
            <Link className="btn btn-info" style={{marginTop:20}} to="/addconfig">Add New Config Item</Link>
            {this.state.configs.length > 0 &&
                <table className="table table-bordered table-responsive" style={{marginTop:20}}>
                <thead className="thead-default">
                    <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Value</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderConfigs()}
                </tbody>
                </table>
            }
            {this.state.configs.length === 0 &&
                <div style={{marginTop:20}}>
                    <h6>There are no any configuration available.</h6>
                </div>
            }
          </div>

      </div>
    );
  }
}

