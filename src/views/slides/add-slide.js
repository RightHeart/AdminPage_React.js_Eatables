import React, { Component } from 'react';
import './style.css';
import { browserHistory } from 'react-router';

import NavBar from '../../components/nav-bar';
import SlideImage from '../../services/slides-service';

export default class AddSlideImagePage extends Component {

  constructor(props){
    super(props);
    this.uploadFile = "";
    this.state = {
        sequence_number: 1,
        is_image_upload: false,
        is_error: false,
        error_msg: "",
        slideimages: [],
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if(name === "slide_image"){
        let file = target.files[0];
        this.uploadFile = file;
    }else{
        this.setState({
            [name]: value
        });
    }
  }

  onPressAddSlideImage(){
    var self = this;

    if(!this.uploadFile){
        this.setState({is_error:true, error_msg:'Please upload a slide image'});
        return;
    }

    this.setState({is_error:false, error_msg: "", is_image_upload: true});

    let data = new FormData();
    data.append('file', this.uploadFile);

    SlideImage.postSlideImage(data).then((data)=>{
        data.json().then((json_data)=>{
            if(json_data['status']){
                self.setState({is_error:false, is_image_upload: false});

                var send_data = {};
                send_data['image_path'] = json_data['image_path'];
                send_data['sequence_number'] = this.state.sequence_number;

                SlideImage.addSlideImage(send_data).then((data)=>{
                    data.json().then((json_data)=>{
                        if(json_data['status']){
                            self.setState({is_error:false, is_image_upload: true});
                            browserHistory.goBack();
                        }else{
                            self.setState({is_error:true, error_msg:json_data['message'], is_image_upload: true});
                        }
                    })
                });
            }else{
                self.setState({is_error:true, error_msg:json_data['message'], is_image_upload: true});
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

  render() {
    return (
      <div className="container">
          <NavBar />
          <div style={{marginTop:30}}>
            {this.renderErrors()}
            <div className="form-group col-sm-4">
                <label htmlFor="title"><h5><b>Add Slide Image</b></h5></label>
            </div>

            <div className="form-group col-sm-4">
                <label htmlFor="slide_image">Slide Image</label>
                <form encType="multipart/form-data">
                    <input type="file" name="slide_image" id="slide_image" onChange={this.handleInputChange.bind(this)} />
                </form>
            </div>
            <div className="form-group col-sm-4">
                <label htmlFor="sequence_number">Sequence</label>
                <input type="number" name="sequence_number" id="sequence_number" value={this.state.sequence_number} onChange={this.handleInputChange.bind(this)} className="form-control" placeholder="Sequence Number" aria-describedby="sizing-addon2" />
                <p className="help-block">Add any sequence number in order. i.e 1,2,3</p>
                <p className="help-block">You can change it in listing page.</p>
            </div>
            <div className="form-group col-sm-3">
                <button className="btn btn-info" onClick={this.onPressAddSlideImage.bind(this)} style={{marginRight:40}}>Add</button>
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

