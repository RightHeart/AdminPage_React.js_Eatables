import React, { Component } from 'react';
import './style.css';

import NavBar from '../../components/nav-bar';
import Notification from '../../services/notification-service';
import Product from '../../services/products-service';
import MobileUser from '../../services/mobile-users-service';

export default class NotificationSubscribePage extends Component {
  constructor(props){
    super(props);
    this.state = {
        notisubscribe: [],
        products: [],
        mobileusers: []
    };
  }

  componentDidMount(){
    this.getAllProducts();
  }

  getAllProducts(){
    let self = this;
    Product.getProducts().then((data)=>{
      data.json().then((json_data) => {
        self.setState({products: json_data['data']});
        self.getAllMobileUsers();
      });
    });
  }

  getAllMobileUsers(){
    let self = this;
    MobileUser.getMobileUsers().then((data)=>{
      data.json().then((json_data)=>{
        self.setState({mobileusers:json_data['data']});
        self.getAllProductSubscribe();
      });
    });
  }

  getAllProductSubscribe(){
    let self = this;
    Notification.getProductSubscribe().then((data)=>{
      data.json().then((json_data)=>{
        self.setState({notisubscribe:json_data['data']});
      });
    });
  }

  formatDate(date){
    let da = new Date(date);
    return da.toDateString();
  }

  getMobileUserName(id){
      let usr = this.state.mobileusers.filter((data)=>{
          return data._id === id;
      })
      return usr[0].mobile_number;
  }

  getProductName(id){
      let product = this.state.products.filter((data)=>{
          return data._id === id;
      })
      return product[0].name;
  }

  renderProductSubscribe(){
    var returnVals = [];
    let notis = this.state.notisubscribe;
    for (var i = 0; i < notis.length; i++) {
      var noti = notis[i];
      returnVals.push(
          <tr key={i}>
            <th scope="row">{i+1}</th>
            <td>{this.getProductName(noti.product_id)}</td>
            <td>{this.getMobileUserName(noti.user_id)}</td>
            <td>{noti.subscribe_time}</td>
            <td>{this.formatDate(noti.subscribe_date)}</td>
            <td>{noti.amount}</td>
          </tr>
      );
    }
    return returnVals;
  }

  render() {
    return (
      <div className="container">
          <NavBar pageName="productsubscribe"/>
          <div style={{marginTop:20}}>
            <div className="form-group col-sm-4">
            <label htmlFor="title"><h5><b>Notification Subscription</b></h5></label>
            </div>
            {this.state.notisubscribe.length > 0 &&
                <table className="table table-bordered table-responsive" style={{marginTop:20}}>
                <thead className="thead-default">
                    <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>User</th>
                    <th>Subscription Time</th>
                    <th>Subscription Date</th>
                    <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderProductSubscribe()}
                </tbody>
                </table>
            }
            {this.state.notisubscribe.length === 0 &&
                <div style={{marginTop:20}}>
                    <h6>There are no any product subscription available.</h6>
                </div>
            }
          </div>
      </div>
    );
  }
}

