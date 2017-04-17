import React, { Component } from 'react';
import './style.css';
import { browserHistory } from 'react-router';

import NavBar from '../../components/nav-bar';
import Product from '../../services/products-service';
import Country from '../../services/countries-service';

export default class EditProductPricePage extends Component {

  constructor(props){    
    super(props);

    this.state = {
        id : "",
        product: "",
        country: "",
        price1: "",
        price2: "",
        price3: "",
        price_date: "",
        is_error: false,
        error_msg: ""
    }
    
    let id = this.props.location.query.id;
    this.getProductPriceById(id);
  }

  getProductPriceById(id){
    let self = this;
    let send_data = {id:id};
    Product.getProductPriceById(send_data).then((data)=>{
      data.json().then((json_data) => {
          let product_price = json_data['data'];
          self.setState({
                id: product_price._id,
                price1:product_price.price_usd,
                price2:product_price.price_gbp,
                price3:product_price.price_fcfa,
                price_date: product_price.price_date
          });
          self.getCountryById(product_price.country_id);
          self.getProductById(product_price.product_id);
      });
    });  
  }


  getCountryById(id){
    let self = this;
    let send_data = {id:id};
    Country.getCountryById(send_data).then((data)=>{
      data.json().then((json_data) => {
        self.setState({country: json_data['data']});
      });
    });
  }

  getProductById(id){
    let self = this;
    let send_data = {id:id};
    Product.getProductById(send_data).then((data)=>{
      data.json().then((json_data) => {
        self.setState({product: json_data['data']});
      });
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });

  }

  onPressUpdateProductPrice(){
    var self = this;
    var p_data = {};

    if(this.state.price1.length === 0){
      self.setState({is_error:true,error_msg:"Please enter price 1"});
      return;
    }

    if(this.state.price2.length === 0){
      self.setState({is_error:true,error_msg:"Please enter price 2"});
      return;
    }

    if(this.state.price3.length === 0){
      self.setState({is_error:true,error_msg:"Please enter price 3"});
      return;
    }

    self.setState({is_error:false,error_msg:''});

    p_data['id'] = this.state.id;
    p_data['price1'] = this.state.price1;
    p_data['price2'] = this.state.price2;
    p_data['price3'] = this.state.price3;

    let send_data = {"product_price":p_data};
    
    Product.editProductPrice(send_data).then((data)=>{
      data.json().then((json_data)=>{
        if(json_data['status']){
          self.setState({is_error:false});
          browserHistory.goBack();
        }else{
          self.setState({is_error:true,error_msg:json_data['message']});
        }
      });
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

  formatDate(date){
    let da = new Date(date);
    return da.toDateString();
  }

  render() {
    return (
      <div className="container">
          <NavBar />
          <div style={{marginTop:30}}>
            {this.renderErrors()}
            <div className="form-group col-sm-4">
                <label htmlFor="title"><h5><b>Edit Product Price</b></h5></label>
            </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="price1">Date</label>
                    <input disabled type="text" name="price_date" id="price_date" value={this.formatDate(this.state.price_date)} className="form-control" placeholder="Date" aria-describedby="sizing-addon2" />
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="language">Country</label>
                    <select className="form-control" name="country" disabled id="country">
                        <option value="0">{this.state.country.name}</option>
                    </select>
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="language">Product</label>
                    <select className="form-control" name="product" disabled id="product">
                        <option value="0">{this.state.product.name}</option>
                    </select>
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="price1">Price 1</label>
                    <input type="number" name="price1" id="price1" value={this.state.price1} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Price in USD" aria-describedby="sizing-addon2" />
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="price2">Price 2</label>
                    <input type="number" name="price2" id="price2" value={this.state.price2} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Price in GBP" aria-describedby="sizing-addon2" />
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="price3">Price 3</label>
                    <input type="number" name="price3" id="price3" value={this.state.price3} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Price in FCFA" aria-describedby="sizing-addon2" />
                </div>
            <div className="form-group col-sm-3">
                <button className="btn btn-info" onClick={this.onPressUpdateProductPrice.bind(this)} style={{marginRight:40}}>Update</button>
                <button className="btn btn-info" onClick={this.onPressCancel.bind(this)}>Cancel</button>
            </div>
        </div>
      </div>
    );
  }
}

