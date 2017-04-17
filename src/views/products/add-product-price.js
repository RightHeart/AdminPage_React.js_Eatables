import React, { Component } from 'react';
import './style.css';
import { browserHistory } from 'react-router';

import NavBar from '../../components/nav-bar';
import Product from '../../services/products-service';
import Country from '../../services/countries-service';

export default class AddProductPricePage extends Component {

  constructor(props){
    super(props);
    this.state = {
        product: "",
        country: "",
        price1: "",
        price2: "",
        price3: "",
        price_date: "",
        is_error: false,
        error_msg: "",
        countries: [],
        products: [],
        product_prices: []
    }
  }

  componentDidMount(){
    this.getAllCountries();
    this.getAllProducts();
    this.getAllProductPrices();
  }

   getAllProductPrices(){
    let self = this;
    Product.getProductPrices().then((data)=>{
      data.json().then((json_data)=>{
        self.setState({product_prices:json_data['data']});
      });
    });
  }

  getAllCountries(){
    let self = this;
    Country.getCountries().then((data)=>{
      data.json().then((json_data) => {
        self.setState({countries: json_data['data'], country:json_data['data'][0]});
      });
    });
  }

  getAllProducts(){
    let self = this;
    Product.getProducts().then((data)=>{
      data.json().then((json_data) => {
        self.setState({products: json_data['data'], product:json_data['data'][0]});
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

  onPressAddProductPrice(){
    var self = this;

    var send_data = {};

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

    let product_p = this.state.product_prices.filter((data) => {
      return data.product_id === this.state.product._id && data.country_id === this.state.country._id && data.price_date === this.state.price_date+"T00:00:00.000Z";
    });

    if(product_p.length > 0){
      self.setState({is_error:true,error_msg:"Product Price Already Added for that day and product"});
      return;
    }

    self.setState({is_error:false,error_msg:''});

    send_data['country_id'] = this.state.country;
    send_data['product_id'] = this.state.product;
    send_data['price_date'] = this.state.price_date;
    send_data['price1'] = this.state.price1;
    send_data['price2'] = this.state.price2;
    send_data['price3'] = this.state.price3;

    Product.addProductPrice(send_data).then((data)=>{
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

  renderCountries(){
      var returnVals = [];
      let cons = this.state.countries;
      for (var i = 0; i < cons.length; i++) {
          var con = cons[i];
          returnVals.push(
            <option key={i} value={con._id}>{con.name}</option>
          );
      }
      return returnVals;
  }

  renderProducts(){
      var returnVals = [];
      let products = this.state.products;
      for (var i = 0; i < products.length; i++) {
          var product = products[i];
          returnVals.push(
            <option key={i} value={product._id}>{product.name}</option>
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
                <label htmlFor="title"><h5><b>Add Product Price</b></h5></label>
            </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="price1">Date</label>
                    <input type="date" name="price_date" id="price_date" value={this.state.price_date} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Date" aria-describedby="sizing-addon2" />
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="language">Select Country</label>
                    <select className="form-control" name="country" onChange={this.handleInputChange.bind(this)} id="country">
                        {this.renderCountries()}
                    </select>
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="language">Select Product</label>
                    <select className="form-control" name="product" onChange={this.handleInputChange.bind(this)} id="product">
                        {this.renderProducts()}
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
                <button className="btn btn-info" onClick={this.onPressAddProductPrice.bind(this)} style={{marginRight:40}}>Add</button>
                <button className="btn btn-info" onClick={this.onPressCancel.bind(this)}>Cancel</button>
            </div>
        </div>
      </div>
    );
  }
}

