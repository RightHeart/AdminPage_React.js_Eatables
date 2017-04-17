import React, {Component } from 'react';
import { withRouter } from 'react-router';

import './style.css';
import auth from '../../helpers/auth';

class LoginPage extends Component {

  constructor(props){
    super(props);
    this.state = {username:"",password:"",errormsg:""};
  }

  onPressLoginBtn(){
    var self = this;
    auth.login(this.state.username,this.state.password,(data)=>{
      if(data.status){
        const { location } = self.props;
        if (location.state && location.state.nextPathname) {
          self.props.router.replace(location.state.nextPathname)
        } else {
          self.props.router.replace('/')
        }
        self.setState({errormsg:""});
      }else{
        self.setState({errormsg:data.message,password:""});
      }
    });
  }

  onPressForgotPasswordBtn(){
    alert("Forgot Password");
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div className="container">
        { this.state.errormsg &&
          <div className="alert alert-danger">
            {this.state.errormsg}
          </div>
        }
        <div className="row" style={{marginTop:40}}>
          <div className="viewInputs">
            <div className="input-group">
              <input type="text" value={this.state.username} onChange={this.handleUsernameChange.bind(this)} className="form-control" placeholder="Username" aria-describedby="sizing-addon2" />
            </div>
            <br/>
            <div className="input-group">
              <input type="password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} className="form-control" placeholder="Password" aria-describedby="sizing-addon2" />
            </div>
            <br/>
            <button className="btn btn-info" onClick={this.onPressLoginBtn.bind(this)} style={{marginRight:40}}>Login</button>
            <button className="btn btn-info" onClick={this.onPressForgotPasswordBtn.bind(this)}>Forgot Password</button>
          </div>
        </div>
      </div>
    );
  }
}

const LoginPageWithRouter = withRouter(LoginPage)
export default LoginPageWithRouter;
