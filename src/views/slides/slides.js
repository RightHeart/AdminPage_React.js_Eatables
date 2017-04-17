import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router';

import NavBar from '../../components/nav-bar';
import SlideImage from '../../services/slides-service';
import config from '../../helpers/config';

export default class SlideImagesPage extends Component {
  constructor(props){
    super(props);
    this.state = {slideimages:[]};
  }

  componentDidMount(){
    this.getAllSlideImages();
  }

  getAllSlideImages(){
    let self = this;
    SlideImage.getSlideImages().then((data)=>{
      data.json().then((json_data)=>{
        self.setState({slideimages:json_data['data']});
      });
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
            <td style={{textAlign:'center'}}>{slide.sequence_number}</td>
            <td>
              <Link style={{marginRight:10}} to={{ pathname: '/deleteitem', query: {  type:'slideimage', id: slide._id } }}>Delete</Link>
            </td>
          </tr>
      );
    }
    return returnVals;
  }

  renderChangeSequenceBtn(){
      if(this.state.slideimages.length > 1){
        return(
            <Link className="btn btn-info" style={{marginTop:20,marginLeft:20}} to="/changeslideseq">Change Sequence</Link>
        );
      }
  }

  render() {
    return (
      <div className="container">
          <NavBar pageName="slideimages"/>
          <div style={{marginTop:20}}>
            <Link className="btn btn-info" style={{marginTop:20}} to="/addslideimage">Add New Slide Image</Link>
            {this.renderChangeSequenceBtn()}
            {this.state.slideimages.length > 0 &&
                <table className="table table-bordered table-responsive" style={{marginTop:20}}>
                <thead className="thead-default">
                    <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Sequence</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderSlideImages()}
                </tbody>
                </table>
            }
            {this.state.slideimages.length === 0 &&
                <div style={{marginTop:20}}>
                    <h6>There are no any slide images.</h6>
                </div>
            }
          </div>
      </div>
    );
  }
}

