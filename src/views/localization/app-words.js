import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router';

import NavBar from '../../components/nav-bar';
import Localize from '../../services/localize-service';

export default class AppWordsPage extends Component {
  constructor(props){
    super(props);
    this.state = {appwords:[]};
  }

  componentDidMount(){
    this.getAllAppWords();
  }

  getAllAppWords(){
    let self = this;
    Localize.getAppWords().then((data)=>{
      data.json().then((json_data)=>{
        self.setState({appwords:json_data['data']});
      });
    });
  }

  renderAppWords(){
    var returnVals = [];
    let words = this.state.appwords;
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      returnVals.push(
          <tr key={i}>
            <th scope="row">{i+1}</th>
            <td style={{textAlign:'left'}}>{word.word}</td>
            <td>
              <Link style={{marginRight:10}} to={{ pathname: '/editappword', query: {  type:'appword', word_id: word._id, word_name: word.word } }}>Edit</Link>
              <Link style={{marginRight:10}} to={{ pathname: '/deleteitem', query: {  type:'appword', id: word._id } }}>Delete</Link>
            </td>
          </tr>
      );
    }
    return returnVals;
  }

  render() {
    return (
      <div className="container">
          <NavBar pageName="appwords"/>
          <div style={{marginTop:20}}>
            <Link className="btn btn-info" style={{marginTop:20}} to="/addappword">Add New App Word</Link>
            <Link className="btn btn-info" style={{marginTop:20, marginLeft:20}} to="/applocalize">List Of App Localization</Link>
            {this.state.appwords.length > 0 &&
                <table className="table table-bordered table-responsive" style={{marginTop:20}}>
                <thead className="thead-default">
                    <tr>
                    <th>#</th>
                    <th>Word</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderAppWords()}
                </tbody>
                </table>
            }
            {this.state.appwords.length === 0 &&
                <div style={{marginTop:20}}>
                    <h6>There are no any app words/labels available.</h6>
                </div>
            }
          </div>
      </div>
    );
  }
}

