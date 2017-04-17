import React, { Component } from 'react';

import './style.css';
import NavBar from '../../components/nav-bar';
import Product from '../../services/products-service';

class AppPage extends Component {

  constructor(props){
    super(props);

    this.state = {
      nofproducts : 0,
      nofprices: 0,
      nofcountries: 0,
      noflanguages: 0,
      nofsiteusers: 0,
      nofmobileusers: 0,
      missing_product_localization: 0,
      missing_product_prices : 0,
      products : []
    }
  }

  componentDidMount(){
    this.callCountAPI();
    this.callProductAPI();
  }

  callCountAPI(){
    var self = this;
    Product.getProductCount().then((data)=>{
      data.json().then((json_data)=>{
        if(json_data['status']){
            let counts = json_data['data'];
            self.setState({
              nofproducts:counts.product_count,
              nofprices: counts.price_count,
              nofcountries: counts.country_count,
              noflanguages: counts.lang_count,
              nofsiteusers: counts.siteuser_count,
              nofmobileusers: counts.mobileuser_count
            });
        }
      })
    })
  }

  getTodayDate(){
      let today_date = new Date();
      let month = today_date.getMonth()+1;
      let fMonth = month.toString().length > 1 ? month : "0"+month.toString()
      let formattedDate = today_date.getFullYear()+"-"+fMonth+ "-";
      formattedDate = formattedDate + today_date.getDate()+"T00:00:00.000Z";
      return formattedDate;
  }

  callProductAPI(){
    let price_count = 0;
    var self = this;
    Product.getProducts().then((data)=>{
      data.json().then((json_data)=>{
        if(json_data['status']){
          let products = json_data['data'];
          self.setState({products:products});
          if(products.length > 0){
            Product.getProductPrices().then((data)=>{
              data.json().then((json_data)=>{
                if(json_data['status']){
                  let product_prices = json_data['data'];
                  function getFilterProductPrice(product){
                    let product_price = product_prices.filter((data)=>{
                      return data.product_id === product._id && data.price_date === self.getTodayDate();
                    })
                    return product_price;
                  }
                  for (var i = 0; i < products.length; i++) {
                    var product = products[i];
                    let product_price = getFilterProductPrice(product);
                    if(product_price.length === 0){
                      price_count += 1;
                    }
                  }
                  self.setState({missing_product_prices:price_count});
                  self.prepareMissingLocalizationCount();
                }
              })
            })
          }
        }
      })
    })
  }

  prepareMissingLocalizationCount(){
    let count_loc = 0;
    let products = this.state.products;
    for (var i = 0; i < products.length; i++) {
      var product = products[i];
      let lang_c = 0;
      for (var key in product['localize']) {
        if (product['localize'].hasOwnProperty(key)) {
          if(product['localize'][key]){
            lang_c += 1;
          }
        }
      }
      if(lang_c !== this.state.noflanguages){
        count_loc += 1;
      }
    }
    this.setState({missing_product_localization:count_loc});
  }

  render() {
    return (
      <div className="container">
          <NavBar pageName="dashboard"/>
          <div style={{marginTop:40}}>
            <div className="row col-sm-12">
              <div className="card col-sm-4">
                <div className="card-block">
                  <h5 className="card-title">Number Of Items</h5>
                  <li className="list-group-item">Products :&nbsp;&nbsp; <b>{this.state.nofproducts}</b></li>
                  <li className="list-group-item">Prices :&nbsp;&nbsp; <b>{this.state.nofprices}</b></li>
                  <li className="list-group-item">Countires :&nbsp;&nbsp; <b>{this.state.nofcountries}</b></li>
                  <li className="list-group-item">Languages :&nbsp;&nbsp; <b>{this.state.noflanguages}</b></li>
                  <li className="list-group-item">Site Users :&nbsp;&nbsp; <b>{this.state.nofsiteusers}</b></li>
                  <li className="list-group-item">Mobile Users :&nbsp;&nbsp; <b>{this.state.nofmobileusers}</b></li>
                </div>
              </div>
              <div className="card col-sm-4" style={{marginLeft:40}}>
                <div className="card-block">
                  <h5 className="card-title">Missing Things</h5>
                  <li className="list-group-item">Product Localization :&nbsp;&nbsp; <b>{this.state.missing_product_localization}</b></li>
                  <li className="list-group-item">Product Prices (Today) :&nbsp;&nbsp; <b>{this.state.missing_product_prices}</b></li>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default AppPage;
