import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router';

import NavBar from '../../components/nav-bar';
import SiteUser from '../../services/site-users-service';

export default class SiteUsersPage extends Component {
  constructor(props){
    super(props);
    this.state = {siteusers:[]};
  }

  componentDidMount(){
    this.getAllSiteUsers();
  }

  getAllSiteUsers(){
    let self = this;
    SiteUser.getSiteUsers().then((data)=>{
      data.json().then((json_data)=>{
        self.setState({siteusers:json_data['data']});
      });
    });
  }

  renderSiteUsers(){
    var returnVals = [];
    let siteUsers = this.state.siteusers;
    for (var i = 0; i < siteUsers.length; i++) {
      var siteuser = siteUsers[i];
      let loginUser = JSON.parse(localStorage.getItem("loginUser"));
      let id = loginUser['_id'];
      if(id === siteuser._id){
        continue;
      }
      returnVals.push(
          <tr key={i}>
            <th scope="row">{i+1}</th>
            <td>{siteuser.name}</td>
            <td>{siteuser.email}</td>
            <td>{siteuser.username}</td>
            <td>{siteuser.is_active ? 'Yes': 'No'}</td>
            <td>{siteuser.type}</td>
            <td>
              <Link style={{marginRight:10}} to={{ pathname: '/editsiteuser', query: { id: siteuser._id, name: siteuser.name, type: siteuser.type, active: siteuser.is_active } }}>Edit</Link>
              <Link style={{marginRight:10}} to={{ pathname: '/deleteitem', query: {  type:'siteuser', id: siteuser._id } }}>Delete</Link>
            </td>
          </tr>
      );
    }
    return returnVals;
  }

  render() {
    return (
      <div className="container">
          <NavBar pageName="siteuser"/>
          <div style={{marginTop:20}}>
            <Link className="btn btn-info" style={{marginTop:20}} to="/addsiteuser">Add New Site User</Link>
            <div className="table-responsive">
              <table className="table table-bordered" style={{marginTop:20}}>
                <thead className="thead-default">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Active</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderSiteUsers()}
                </tbody>
              </table>
            </div>
          </div>
      </div>
    );
  }
}

