import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';
import auth from '../helpers/auth';

class NavBar extends Component {

  constructor(props){
      super(props);
      let loginUser = JSON.parse(localStorage.getItem("loginUser"));
      let name = "";
      let type = "";
      let id = "";
      if(loginUser){
        name = loginUser['name'];
        type = loginUser['type'];
        id = loginUser['_id'];
      }
      this.state = {name:name,type:type,id:id}
  }

  onClickLogout(){
    auth.logout();
    browserHistory.replace('/login');
  }

  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">
            Djoli Djolilo
            <span style={{fontSize:12, color:'gray'}}></span>
        </a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link className="nav-link" activeClassName="nav-link active" to="/">Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" activeClassName="nav-link active" to="/products">Products</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" activeClassName="nav-link active" to="/countries">Countries</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" activeClassName="nav-link active" to="/languages">Languages</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" activeClassName="nav-link active" to="/productprices">Prices</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" activeClassName="nav-link active" to="/notificationsubscribe">Notifications</Link>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Settings
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link className="dropdown-item" to="/slideimages">Slide Images</Link>
                    <Link className="dropdown-item" to="/applocalize">App Localization</Link>
                    <Link className="dropdown-item" to="/siteusers">Site Users</Link>
                    <Link className="dropdown-item" to="/mobileusers">Mobile Users</Link>
                    <Link className="dropdown-item" to="/config">Configuration</Link>
                </div>
            </li>
            </ul>
            <ul className="navbar-nav my-2 my-lg-0">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.name} ({this.state.type})
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    {/*<a className="dropdown-item" href="#">Profile</a>*/}
                    <a className="dropdown-item" href="#" onClick={()=>this.onClickLogout()}>Logout</a>
                    </div>
                </li>
            </ul>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  pageName:React.PropTypes.string
};

export default NavBar;
