import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router';

import NavBar from '../../components/nav-bar';
import Product from '../../services/products-service';
import config from '../../helpers/config';

export default class ProductsPage extends Component {
  constructor(props){
    super(props);
    this.state = {products:[]};
  }

  componentDidMount(){
    this.getAllProducts();
  }

  getAllProducts(){
    let self = this;
    Product.getProducts().then((data)=>{
      data.json().then((json_data)=>{
        self.setState({products:json_data['data']});
      });
    });
  }

  renderProducts(){
    var returnVals = [];
    let products = this.state.products;
    for (var i = 0; i < products.length; i++) {
      var product = products[i];
      returnVals.push(
          <tr key={i}>
            <th scope="row">{i+1}</th>
            <td>
                <img src={config.urls.api_url+"/"+product.image_path} alt={product.name} width='50' height='50'/>
            </td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.is_active ? 'Yes': 'No'}</td>
            <td>
              <Link style={{marginRight:10}} to={{ pathname: '/editproduct', query: { id: product._id } }}>Edit</Link>
              <Link style={{marginRight:10}} to={{ pathname: '/deleteitem', query: {  type:'product', id: product._id } }}>Delete</Link>
              <Link to={{ pathname: '/editproductlocalize', query: {  type:'productlocalize', id: product._id } }}>Localize</Link>
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
            <Link className="btn btn-info" style={{marginTop:20}} to="/addproduct">Add New Product</Link>
            {this.state.products.length > 0 &&
             <div className="table-responsive">
                <table className="table table-bordered" style={{marginTop:20}}>
                  <thead className="thead-default">
                      <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Active</th>
                      <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {this.renderProducts()}
                  </tbody>
                </table>
              </div>
            }
            {this.state.products.length === 0 &&
                <div style={{marginTop:20}}>
                    <h6>There are no any products.</h6>
                </div>
            }
          </div>
      </div>
    );
  }
}

