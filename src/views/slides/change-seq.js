import React, { Component } from 'react';
import './style.css';
import { browserHistory } from 'react-router';

import NavBar from '../../components/nav-bar';
import SlideImage from '../../services/slides-service';
import config from '../../helpers/config';

export default class ChangeSlideSequencePage extends Component {
  constructor(props){
    super(props);
    this.state = {slideimages:[], inputs:{}};

  }

  componentDidMount(){
    this.getAllSlideImages();
  }

  getAllSlideImages(){
    let self = this;
    SlideImage.getSlideImages().then((data)=>{
      data.json().then((json_data)=>{
        var inputs = {}
        for(var i = 0 ; i < json_data['data'].length ; i++){
            inputs[i] = json_data['data'][i]['sequence_number'];
        }
        self.setState({slideimages:json_data['data'],inputs:inputs});
      });
    });
  }

  handleSeqChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let inputs = this.state.inputs;
    inputs[name]  = Number(value);
    this.setState({
        inputs
    });
  }

  renderSlideImages(){
    var returnVals = [];
    let slideimages = this.state.slideimages;
    for (var i = 0; i < slideimages.length; i++) {
      var slide = slideimages[i];
      returnVals.push(
          <tr key={i}>
            <th scope="row">{i+1}</th>
            <td>
                <img src={config.urls.api_url+"/"+slide.image_path} alt={"slide"} width='60' height='100'/>
            </td>
            <td style={{textAlign:'center'}}>
                <input type="number" style={{width:60,alignSelf:'center',textAlign:'center'}} min="1" max={this.state.slideimages.length} name={i} value={this.state.inputs[i]} onChange={this.handleSeqChange.bind(this)} className="form-control" placeholder="Username" aria-describedby="sizing-addon2" />
            </td>
          </tr>
      );
    }
    return returnVals;
  }

  onPressSave(){
    var self = this;
    let inputs = this.state.inputs;
    let slideimages = this.state.slideimages;
    let send_data = [];

    for (var i = 0; i < slideimages.length; i++) {
        var slideimage = slideimages[i];
        let slideseq = {};
        slideseq['id'] = slideimage['_id'];
        slideseq['value'] = inputs[i];
        send_data.push(slideseq);
    }

    SlideImage.changeSlideSequence(send_data).then((data)=>{
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

  render() {
    return (
      <div className="container">
          <NavBar pageName="slideimages"/>
          <div style={{marginTop:20}}>
            {this.state.slideimages.length > 1 &&
                <div className="form-group col-sm-3">
                    <button className="btn btn-info" onClick={this.onPressSave.bind(this)} style={{marginRight:40}}>Save</button>
                    <button className="btn btn-info" onClick={this.onPressCancel.bind(this)}>Cancel</button>
                </div>
            }
            {this.state.slideimages.length > 1 &&
                <table className="table table-bordered table-responsive" style={{marginTop:20}}>
                <thead className="thead-default">
                    <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Sequence</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderSlideImages()}
                </tbody>
                </table>
            }
          </div>
      </div>
    );
  }
}

