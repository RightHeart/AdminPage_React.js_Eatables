import React, { Component } from 'react';
import './style.css';
import { browserHistory } from 'react-router';

import NavBar from '../../components/nav-bar';
import Language from '../../services/languages-service';
import Product from '../../services/products-service';

export default class EditProductLocalizePage extends Component {
  constructor(props){
    super(props);
    let product_id = this.props.location.query.id;
    this.state = {
      id: product_id,
      product_localize: [], 
      languages:[], 
      inputs:{}, 
      product:"", 
      selectedLocId:""
    };
  }

  componentDidMount(){
    this.getProductName();
    this.getAllLanguages();
  }

  getProductName(){
    let self = this;
    let send_data = {id:this.state.id};
    Product.getProductById(send_data).then((data)=>{
        data.json().then((json_data)=>{
          self.setState({product:json_data['data']});
      });
    });
  }

  getAllLanguages(){
    let self = this;
    Language.getLanguages().then((data)=>{
      data.json().then((json_data)=>{
        self.setState({languages:json_data['data']});
        self.getProductLocalize();
      });
    });
  }

  getProductLocalize(){
    let self = this;
    let send_data = {id:this.state.id};
    Product.getProductLocalizeById(send_data).then((data)=>{
      data.json().then((json_data)=>{
        let localize = json_data['data'][0];

        let locs = [];
        let selLoc = localize['localize'];
        let languages = self.state.languages;

        function getFilterLanguage(key){
          let lang = languages.filter((data)=>{
              return data.name === key;
          });         
          return lang;
        }

        for (var key in selLoc) {
          if(selLoc.hasOwnProperty(key)) {
            let loc = {};
            let lang = getFilterLanguage(key);
            if(lang.length > 0){
                loc['name'] = key;
                loc['value'] = selLoc[key];
                locs.push(loc);
            }
          }
        }

        for(var j=0; j < languages.length; j++){
          let lang = languages[j].name;
          if(!selLoc.hasOwnProperty(lang)){
            let loc = {};
            loc['name'] = lang;
            loc['value'] = "";
            locs.push(loc);
          }
        }

        var inputs = {};
        for(var i = 0 ; i < locs.length ; i++){
            inputs[i] = locs[i]['value'];
        }
        self.setState({
            selectedLocId: localize._id,
            product_localize:locs,     
            inputs:inputs
        });
      });
    });
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let inputs = this.state.inputs;
    inputs[name]  = value;
    this.setState({
        inputs
    });
  }

  renderLanguages(){
    var returnVals = [];
    let prod_localize = this.state.product_localize;
    for (var i = 0; i < prod_localize.length; i++) {
      var loc = prod_localize[i];
      returnVals.push(
          <tr key={i}>
            <th scope="row">{i+1}</th>
            <td>
                {loc.name}
            </td>
            <td style={{textAlign:'center'}}>
                <input type="text" name={i} value={this.state.inputs[i]} onChange={this.handleInputChange.bind(this)} className="form-control inputLocal" placeholder="Add Localization Here" aria-describedby="sizing-addon2" />
            </td>
          </tr>
      );
    }
    return returnVals;
  }

  onPressSave(){
    var self = this;
    let inputs = this.state.inputs;
    let locs = this.state.product_localize;
    let loc_data = {};

    let localize = {};
    for (var i = 0; i < locs.length; i++) {
        var loc = locs[i];
        localize[loc['name']] = inputs[i];
    }

    loc_data['id'] = this.state.selectedLocId;
    loc_data['product_id'] = this.state.id;
    loc_data['localize'] = localize;

    let send_data = {"product_localize":loc_data};

    Product.editProductLocalize(send_data).then((data)=>{
      data.json().then((json_data)=>{
        if(json_data['status']){
          self.setState({is_error:false});
          browserHistory.goBack();
        }else{
          self.setState({is_error:true, error_msg:json_data['message']});
        }
      })
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

  render() {
    return (
      <div className="container">
          <NavBar pageName="addlocalize"/>
          <div style={{marginTop:40}}>
            {this.renderErrors()}
            {this.state.languages.length > 1 &&
                <div className="form-group col-sm-4">
                    <button className="btn btn-info" onClick={this.onPressSave.bind(this)} style={{marginRight:40}}>Update</button>
                    <button className="btn btn-info" onClick={this.onPressCancel.bind(this)}>Cancel</button>
                </div>
            }
            {this.state.languages.length > 1 &&
                <div>
                    <div className="form-group col-sm-4">
                        <label htmlFor="language">Product</label>
                        <select className="form-control" name="product" disabled id="product">
                            <option value="0">{this.state.product.name}</option>
                        </select>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered" style={{marginTop:20}}>
                        <thead className="thead-default">
                            <tr>
                            <th>#</th>
                            <th>Language</th>
                            <th>Localization</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderLanguages()}
                        </tbody>
                        </table>
                    </div>
                </div>
            }
            </div>
      </div>
    );
  }
}

