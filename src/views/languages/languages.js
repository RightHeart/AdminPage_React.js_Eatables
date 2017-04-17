import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router';

import NavBar from '../../components/nav-bar';
import Language from '../../services/languages-service';

export default class LanguagesPage extends Component {
  constructor(props){
    super(props);
    this.state = {languages:[]};
  }

  componentDidMount(){
    this.getAllLanguages();
  }

  getAllLanguages(){
    let self = this;
    Language.getLanguages().then((data)=>{
      data.json().then((json_data)=>{
        self.setState({languages:json_data['data']});
      });
    });
  }

  renderLanguages(){
    var returnVals = [];
    let langs = this.state.languages;
    for (var i = 0; i < langs.length; i++) {
      var lang = langs[i];
      returnVals.push(
          <tr key={i}>
            <th scope="row">{i+1}</th>
            <td>{lang.name}</td>
            <td>{lang.is_active ? 'Yes': 'No'}</td>
            <td>
              <Link style={{marginRight:10}} to={{ pathname: '/editlanguage', query: { id: lang._id, name:lang.name, active:lang.is_active  } }}>Edit</Link>
              <Link style={{marginRight:10}} to={{ pathname: '/deleteitem', query: {  type:'language', id: lang._id } }}>Delete</Link>
            </td>
          </tr>
      );
    }
    return returnVals;
  }

  render() {
    return (
      <div className="container">
          <NavBar pageName="language"/>
          <div style={{marginTop:20}}>
            <Link className="btn btn-info" style={{marginTop:20}} to="/addlanguage">Add New Language</Link>
            {this.state.languages.length > 0 &&
                <table className="table table-bordered table-responsive" style={{marginTop:20}}>
                <thead className="thead-default">
                    <tr>
                    <th>#</th>
                    <th>Language</th>
                    <th>Active</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderLanguages()}
                </tbody>
                </table>
            }
            {this.state.languages.length === 0 &&
                <div style={{marginTop:20}}>
                    <h6>There are no any languages.</h6>
                </div>
            }
          </div>

      </div>
    );
  }
}

