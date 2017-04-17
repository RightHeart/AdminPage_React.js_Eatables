import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import SiteUser from '../../services/site-users-service';
import Language from '../../services/languages-service';
import Country from '../../services/countries-service';
import Product from '../../services/products-service';
import SlideImage from '../../services/slides-service';
import Localize from '../../services/localize-service';
import MobileUser from '../../services/mobile-users-service';
import Setting from '../../services/settings-service';

import './style.css';
import NavBar from '../../components/nav-bar';

class DeleteItemPage extends Component {

  onPressDelete(){
    var browserHistorySelf = browserHistory;
    if(this.props.location.query.type === "siteuser"){
        let send_data = {id:this.props.location.query.id};
        SiteUser.deleteSiteUser(send_data).then((data)=>{
            data.json().then((json_data)=>{
                browserHistorySelf.goBack();
            });
        });
    } else if(this.props.location.query.type === "language"){
        let send_data = {id:this.props.location.query.id};
        Language.deleteLanguage(send_data).then((data)=>{
            data.json().then((json_data)=>{
                browserHistorySelf.goBack();
            });
        });
    } else if(this.props.location.query.type === "country"){
        let send_data = {id:this.props.location.query.id};
        Country.deleteCountry(send_data).then((data)=>{
            data.json().then((json_data)=>{
                browserHistorySelf.goBack();
            });
        });
    } else if(this.props.location.query.type === "product"){
        let send_data = {id:this.props.location.query.id};
        Product.deleteProduct(send_data).then((data)=>{
            data.json().then((json_data)=>{
                browserHistorySelf.goBack();
            });
        });
    } else if(this.props.location.query.type === "slideimage"){
        let send_data = {id:this.props.location.query.id};
        SlideImage.deleteSlideImage(send_data).then((data)=>{
            data.json().then((json_data)=>{
                browserHistorySelf.goBack();
            });
        });
    } else if(this.props.location.query.type === "appword"){
        let send_data = {id:this.props.location.query.id};
        Localize.deleteAppWord(send_data).then((data)=>{
            data.json().then((json_data)=>{
                browserHistorySelf.goBack();
            });
        });
    } else if(this.props.location.query.type === "applocalize"){
        let send_data = {id:this.props.location.query.id};
        Localize.deleteAppLocalize(send_data).then((data)=>{
            data.json().then((json_data)=>{
                browserHistorySelf.goBack();
            });
        });
    } else if(this.props.location.query.type === "productprice"){
        let send_data = {id:this.props.location.query.id};
        Product.deleteProductPrice(send_data).then((data)=>{
            data.json().then((json_data)=>{
                browserHistorySelf.goBack();
            });
        });
    } else if(this.props.location.query.type === "mobileuser"){
        let send_data = {id:this.props.location.query.id};
        MobileUser.deleteMobileUser(send_data).then((data)=>{
            data.json().then((json_data)=>{
                browserHistorySelf.goBack();
            });
        });
    } else if(this.props.location.query.type === "config"){
        let send_data = {id:this.props.location.query.id};
        Setting.deleteConfig(send_data).then((data)=>{
            data.json().then((json_data)=>{
                browserHistorySelf.goBack();
            });
        });
    }
  }

  onPressCancel(){
    browserHistory.goBack();
  }

  render() {
    return (
       <div className="container">
          <NavBar />
          <div style={{marginTop:30}}>
              <h4>Are you sure want to delete a {this.props.location.query.type} ?</h4>
              <div className="form-group col-sm-3" style={{marginTop:20}}>
                <button className="btn btn-danger" onClick={this.onPressDelete.bind(this)} style={{marginRight:20,float:'left'}}>Delete</button>
                <button className="btn btn-info" onClick={this.onPressCancel.bind(this)} style={{float:'left'}}>Cancel</button>
              </div>
          </div>
       </div>
    );
  }
}

export default DeleteItemPage;
