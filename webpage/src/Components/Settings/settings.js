import React, { Component, useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import './settings.css';
import { MDBIcon, MDBRow, MDBCol } from "mdbreact";
import { UserContext } from '../../Providers/UserProvider.js';
import { db } from '../../firebase';
import firebase from "firebase/app";

class Settings extends Component{
    constructor(props) {
        super(props);
        this.state = {
          displayName: 'name',
          email: '',
          photoURL: null,
          firstName: null,
          lastName: null,
          password: null
        };
        //this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = React.createRef();
    }
    // handleChange(event) {
    //   console.log('q!');
    //   this.setState({displayName: event.target.displayName});
    //   console.log(this.state.displayName);
    // }
    
    handleSubmit(event) {
      console.log(this.input.current.value);
      event.preventDefault();
      
      db.collection('users').doc(
        "uoL8rAP4xsaXp1BRmAO5QBcS99G3"
        ).update({
        displayName: this.input.current.value,
        email: this.input.current.value,
        // photoURL: "url",
        // firstName: this.firstName,
        // lastName: this.lastName,
    })
    .then(() => {
      console.log('User updated!');
    });
  }
  
   
    render() {
        return (
            <Container fluid>
            <br></br>
            <div class="container">
            <h5>Change User Profile Image</h5>
              
            <div class="row">
              
              <div class="col-md-3">
                <div class="text-center">
                  <img src="https://mdbootstrap.com/img/Photos/Avatars/img(31).jpg" class="img-fluid z-depth-1 rounded-circle" alt="avatar" />
                  <h6>Upload a different photo...</h6>
                  
                  <input type="file" class="form-control" />
                </div>
              </div>
            </div>
            <div className="col-md-9 personal-info">
              <h3>Personal info</h3>
              <form className="form-horizontal" role="form" >
                <div className="form-group">
                  <label className="col-lg-3 control-label">First name:</label>
                  <div className="col-lg-8">
                    <input className="form-control" type="text" value={this.state.firstName} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-lg-3 control-label">Last name:</label>
                  <div className="col-lg-8">
                    <input className="form-control" type="text" value={this.state.lastName} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-lg-3 control-label">Email:</label>
                  <div className="col-lg-8">
                    <input className="form-control" type="text" ref={this.input} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-lg-3 control-label">Time Zone:</label>
                  <div className="col-lg-8">
                    <div className="ui-select">
                      <select id="user_time_zone" className="form-control">
                        <option value="Hawaii">(GMT-10:00) Hawaii</option>
                        <option value="Alaska">(GMT-09:00) Alaska</option>
                        <option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                        <option value="Arizona">(GMT-07:00) Arizona</option>
                        <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                        <option value="Central Time (US &amp; Canada)" selected="selected">(GMT-06:00) Central Time (US &amp; Canada)</option>
                        <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                        <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label">Username:</label>
                  <div className="col-md-8">
                    <input className="form-control" type="text" ref={this.input} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label">Password:</label>
                  <div className="col-md-8">
                    <input className="form-control" type="password" value={this.state.password} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label">Confirm password:</label>
                  <div className="col-md-8">
                    <input className="form-control" type="password" value={this.state.password} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label"></label>
                  <div className="col-md-8">
                    <input type="button" className="btn btn-primary" value="Submit" onClick={this.handleSubmit}/>
                    <span></span>
                    <input type="reset" className="btn btn-default" value="Cancel" />
                  </div>
                </div>
              </form>
            </div>
          </div>
      </Container>
    );
  }

}

Settings.propTypes = {

};

export default Settings;