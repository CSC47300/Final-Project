import React, { Component, useContext, useReducer, useState } from 'react';
import { Container } from 'react-bootstrap';
import './settings.css';
import { MDBIcon, MDBRow, MDBCol } from "mdbreact";
import { UserContext } from '../../Providers/UserProvider.js';
import { db, getUserDocument } from '../../firebase';
import firebase from "firebase/app";

class Settings extends Component{
    constructor(props) {
        super(props);
        this.state = {
          photoURL: "https://mdbootstrap.com/img/Photos/Avatars/img(31).jpg",
          firstName: '',
          lastName: '',
          email: '',
          timeZone:'',
          displayName: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputPhoto = React.createRef();
        this.inputFirstName = React.createRef();
        this.inputLastName = React.createRef();
        this.inputEmail = React.createRef();
        this.inputUsername = React.createRef();
        this.inputTimeZone = React.createRef();
        this.user = React.useContext(UserContext);
        
        
        
    }
   
    component(){
      const user = useContext(UserContext);
      return user;
    }
    handleChange(event) {
      this.setState({
        photoURL: URL.createObjectURL(event.target.files[0])
      })
    }
    handleSubmit(event) {
      //this.user = React.useContext(UserContext);
      console.log(this.userRef.uid)
      console.log(this.inputPhoto.current.value);
      console.log(this.inputFirstName.current.value);
      console.log(this.inputLastName.current.value);
      console.log(this.inputEmail.current.value);
      console.log(this.inputUsername.current.value);
      console.log(this.inputTimeZone.current.value);
      event.preventDefault();
      
      db.collection('users').doc(
        //"uoL8rAP4xsaXp1BRmAO5QBcS99G3"
        ).update({
          photoURL: this.inputPhoto.current.value,
          firstName: this.inputFirstName.current.value,
          lastName: this.inputLastName.current.value,
          email: this.inputEmail.current.value,
          displayName: this.inputUsername.current.value,
          timeZone: this.inputTimeZone.current.value
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
                  <img src={this.state.photoURL}  class="img-fluid z-depth-1 rounded-circle" alt="avatar"/>
                  <h6>Upload a different photo...</h6>
                  
                  <input type="file" class="form-control" onChange={this.handleChange} ref={this.inputPhoto}/>
                </div>
              </div>
            </div>
            <div className="col-md-9 personal-info">
              <h3>Personal info</h3>
              <form className="form-horizontal" role="form" >
                <div className="form-group">
                  <label className="col-lg-3 control-label">First name:</label>
                  <div className="col-lg-8">
                    <input className="form-control" type="text" ref={this.inputFirstName} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-lg-3 control-label">Last name:</label>
                  <div className="col-lg-8">
                    <input className="form-control" type="text" ref={this.inputLastName} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-lg-3 control-label">Email:</label>
                  <div className="col-lg-8">
                    <input className="form-control" type="text" ref={this.inputEmail} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-lg-3 control-label">Time Zone:</label>
                  <div className="col-lg-8">
                    <div className="ui-select">
                      <select id="user_time_zone" className="form-control" ref={this.inputTimeZone}>
                        <option value="Hawaii"  >(GMT-10:00) Hawaii</option>
                        <option value="Alaska"  >(GMT-09:00) Alaska</option>
                        <option value="Pacific Time (US &amp; Canada)"  >(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                        <option value="Arizona"  >(GMT-07:00) Arizona</option>
                        <option value="Mountain Time (US &amp; Canada)"  >(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                        <option value="Central Time (US &amp; Canada)"  >(GMT-06:00) Central Time (US &amp; Canada)</option>
                        <option value="Eastern Time (US &amp; Canada)" selected="selected"  >(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                        <option value="Indiana (East)"  >(GMT-05:00) Indiana (East)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label">Username:</label>
                  <div className="col-md-8">
                    <input className="form-control" type="text" ref={this.inputUsername} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label">Password:</label>
                  <div className="col-md-8">
                    <input className="form-control" type="password"  />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label">Confirm password:</label>
                  <div className="col-md-8">
                    <input className="form-control" type="password"  />
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