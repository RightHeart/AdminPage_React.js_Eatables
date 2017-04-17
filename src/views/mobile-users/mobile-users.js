import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router';

import NavBar from '../../components/nav-bar';
import MobileUser from '../../services/mobile-users-service';

export default class MobileUsersPage extends Component {
  constructor(props){
    super(props);
    this.state = {mobileusers:[]};
  }

  componentDidMount(){
    this.getAllMobileUsers();
  }

  getAllMobileUsers(){
    let self = this;
    MobileUser.getMobileUsers().then((data)=>{
      data.json().then((json_data)=>{
        self.setState({mobileusers:json_data['data']});
      });
    });
  }

  formatDate(date){
    let da = new Date(date);
    return da.toString();
  }

  renderMobileUsers(){
    var returnVals = [];
    let users = this.state.mobileusers;
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      returnVals.push(
          <tr key={i}>
            <th scope="row">{i+1}</th>
            <td>{user.mobile_number}</td>
            <td>{this.formatDate(user.created_at)}</td>
            <td>
              <Link style={{marginRight:10}} to={{ pathname: '/deleteitem', query: {  type:'mobileuser', id: user._id } }}>Delete</Link>
            </td>
          </tr>
      );
    }
    return returnVals;
  }

  render() {
    return (
      <div className="container">
          <NavBar pageName="mobileusers"/>
          <div style={{marginTop:20}}>
            <div className="form-group col-sm-4">
                <label htmlFor="title"><h5><b>Mobile Users</b></h5></label>
            </div>
            {this.state.mobileusers.length > 0 &&
                <table className="table table-bordered table-responsive" style={{marginTop:20}}>
                <thead className="thead-default">
                    <tr>
                    <th>#</th>
                    <th>Mobile Number</th>
                    <th>Register Date</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderMobileUsers()}
                </tbody>
                </table>
            }
            {this.state.mobileusers.length === 0 &&
                <div style={{marginTop:20}}>
                    <h6>There are no any mobile users.</h6>
                </div>
            }
          </div>
      </div>
    );
  }
}

