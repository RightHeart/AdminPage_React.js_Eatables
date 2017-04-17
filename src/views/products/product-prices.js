import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router';

import NavBar from '../../components/nav-bar';
import Product from '../../services/products-service';
import Country from '../../services/countries-service';

export default class ProductPricesPage extends Component {
  constructor(props){
    super(props);
    this.state = { product_prices:[], countries:[], products: [] };
  }

  componentDidMount(){
    this.getAllProductPrices();
    this.getAllCountries();
    this.getAllProducts();
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
        self.setState({countries: json_data['data']});
      });
    });
  }

  getAllProducts(){
    let self = this;
    Product.getProducts().then((data)=>{
      data.json().then((json_data) => {
        self.setState({products: json_data['data']});
      });
    });
  }

  getCountryName(id){
      let country = this.state.countries.filter((data)=>{
          return data._id === id;
      });
      if(country.length > 0){
          return country[0].name;
      }
      return id;
  }

  getProductName(id){
      let product = this.state.products.filter((data)=>{
          return data._id === id;
      });
      if(product.length > 0){
          return product[0].name;
      }
      return id;
  }

  formatDate(date){
    let da = new Date(date);
    return da.toDateString();
  }

  renderProductPrices(){
    var returnVals = [];
    let products = this.state.product_prices;
    for (var i = 0; i < products.length; i++) {
      var product = products[i];
      returnVals.push(
          <tr key={i}>
            <th scope="row">{i+1}</th>
            <td>{this.formatDate(product.price_date)}</td>
            <td>{this.getProductName(product.product_id)}</td>
            <td>{this.getCountryName(product.country_id)}</td>
            <td>{product.price_usd}</td>
            <td>{product.price_gbp}</td>
            <td>{product.price_fcfa}</td>
            <td>
              <Link style={{marginRight:10}} to={{ pathname: '/editproductprice', query: {  type:'productprice', id: product._id } }}>Edit</Link>
              <Link style={{marginRight:10}} to={{ pathname: '/deleteitem', query: {  type:'productprice', id: product._id } }}>Delete</Link>
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
            <Link className="btn btn-info" style={{marginTop:20}} to="/addproductprice">Add New Product Price</Link>
            {this.state.product_prices.length > 0 &&
              <div className="table-responsive">
                <table className="table table-bordered" style={{marginTop:20}}>
                  <thead className="thead-default">
                      <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Product</th>
                      <th>Country</th>
                      <th>Price (USD)</th>
                      <th>Price (GBP)</th>
                      <th>Price (FCFA)</th>
                      <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {this.renderProductPrices()}
                  </tbody>
                </table>
              </div>
            }
            {this.state.product_prices.length === 0 &&
                <div style={{marginTop:20}}>
                    <h6>There are no any prices available.</h6>
                </div>
            }
          </div>
      </div>
    );
  }
}

