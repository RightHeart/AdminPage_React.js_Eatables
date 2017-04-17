import React, { Component } from 'react';
import './style.css';
import { browserHistory } from 'react-router';

import NavBar from '../../components/nav-bar';
import Product from '../../services/products-service';
import Language from '../../services/languages-service';

export default class AddProductPage extends Component {

  constructor(props){
    super(props);
    this.uploadFile = "";
    this.state = {
        name: "",
        description: "",
        language: "English",
        category: "",
        image_path: "",
        active: "yes",
        is_error: false,
        error_msg: "",
        is_image_upload: false,
        languages: [],
        categories: []
    }
  }

  componentDidMount(){
    this.getAllCategories();
    this.getAllLanguages();
  }

  getAllCategories(){
    let self = this;
    Product.getCategories().then((data)=>{
      data.json().then((json_data) => {
        self.setState({categories: json_data, category:json_data[0]});
      });
    });
  }

  getAllLanguages(){
    let self = this;
    Language.getLanguages().then((data)=>{
      data.json().then((json_data)=>{
        self.setState({languages:json_data['data']});
      });
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if(name === "product_image"){
        let file = target.files[0];
        this.uploadFile = file;
    }else{
        this.setState({
            [name]: value
        });
    }
  }

  onPressAddProduct(){
    var self = this;

    if(this.state.name.length === 0){
      self.setState({is_error:true,error_msg:"Please enter name"});
      return;
    }

    if(!this.uploadFile){
        this.setState({is_error:true, error_msg:'Please upload a product image'});
        return;
    }

    this.setState({is_error:false, error_msg: "", is_image_upload: true});

    let data = new FormData();
    data.append('file', this.uploadFile);

    let p_localize = {};
    let languages = this.state.languages;
    for (var i = 0; i < languages.length; i++) {
        var lang_name = languages[i].name;
        p_localize[lang_name] = this.state.name;
    }

    Product.postProductImage(data).then((data)=>{
        data.json().then((json_data)=>{
            if(json_data['status']){
                self.setState({is_error:false, is_image_upload: false});

                let loginUser = JSON.parse(localStorage.getItem("loginUser"));
                let userName = loginUser['username'];

                var send_data = {};
                send_data['name'] = self.state.name;
                send_data['description'] = self.state.description;
                send_data['language'] = self.state.language;
                send_data['category'] = self.state.category;
                send_data['localize'] = p_localize;
                send_data['image_path'] = json_data['image_path'];
                send_data['admin_creator'] = userName;
                send_data['is_active'] = self.state.active === "yes"? true:false;

                Product.addProduct(send_data).then((data)=>{
                    data.json().then((json_data)=>{
                        if(json_data['status']){
                            let send_data = {};
                            send_data['product_id'] = json_data['product']._id;
                            send_data['localize'] = p_localize;
                            Product.addProductLocalize(send_data).then((data) => {
                                data.json().then((json_data)=>{
                                    if(json_data['status']){
                                        self.setState({is_error:false, is_image_upload: false});
                                        browserHistory.goBack();
                                    }else{
                                        self.setState({is_error:true, error_msg:json_data['message'], is_image_upload: false});
                                    }
                                });
                            });

                        }else{
                            self.setState({is_error:true, error_msg:json_data['message'], is_image_upload: false});
                        }
                    })
                });
            }else{
                self.setState({is_error:true, error_msg:json_data['message'], is_image_upload: false});
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

  renderCategories(){
      var returnVals = [];
      let cats = this.state.categories;
      for (var i = 0; i < cats.length; i++) {
          var category = cats[i];
          returnVals.push(
            <option key={i} value={category}>{category}</option>
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
                <label htmlFor="title"><h5><b>Add Product</b></h5></label>
            </div>
            <div className="row col-sm-12">
                <div className="form-group col-sm-4">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Name" aria-describedby="sizing-addon2" />
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="desc">Description</label>
                    <input type="text" name="description" id="desc" value={this.state.description} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Description" aria-describedby="sizing-addon2" />
                </div>
            </div>
            <div className="row col-sm-12">
                <div className="form-group col-sm-4">
                    <label htmlFor="category">Select Category</label>
                    <select className="form-control" name="category" onChange={this.handleInputChange.bind(this)} id="category">
                        {this.renderCategories()}
                    </select>
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="active">Active</label>
                    <select className="form-control" name="active" onChange={this.handleInputChange.bind(this)} id="active">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            </div>
            <div className="row col-sm-12">
                <div className="form-group col-sm-4">
                    <label htmlFor="language">Language</label>
                    <select className="form-control" name="language" disabled id="language">
                        <option value="English">English</option>
                    </select>
                    <p className="help-block" style={{fontSize:13}}>You can add localization from "Product Localization" Menu</p>
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="product_image">Product Image</label>
                    <form encType="multipart/form-data">
                        <input type="file" name="product_image" id="product_image" onChange={this.handleInputChange.bind(this)} />
                    </form>
                </div>
            </div>
            <div className="form-group col-sm-3">
                <button className="btn btn-info" onClick={this.onPressAddProduct.bind(this)} style={{marginRight:40}}>Add</button>
                <button className="btn btn-info" onClick={this.onPressCancel.bind(this)}>Cancel</button>
                {this.state.is_image_upload &&
                    <label style={{marginTop:20, fontWeight:'600'}}>Uploading Image ...</label>
                }
            </div>
        </div>
      </div>
    );
  }
}

