import React, { Component, PropTypes } from 'react';
import { Modal, Button, Form, Tabs, Image, Tab , Container} from 'react-bootstrap';
import './settings.css';
import { MDBIcon, MDBRow, MDBCol } from "mdbreact";
import { Firebase } from "../../firebase";

class Settings extends Component{
    constructor(props) {
        super(props);
        this.state = {
          users: []
        };
    }

    componentDidMount() {
      //this.getUserData();
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevState !== this.state) {
        this.writeUserData();
      }
    }
    writeUserData = () => {
      Firebase.database().ref("/").set(this.state);
      console.log("DATA SAVED");
    };
   
    handleSubmit = (event) => {
      event.preventDefault();
      let name = this.name.value;
      let role = this.role.value;
      let uid = this.uid.value;
  
      if (uid && name && role) {
        const { users } = this.state;
        const devIndex = users.findIndex((data) => {
          return data.uid === uid;
        });
        users[devIndex].name = name;
        users[devIndex].role = role;
        this.setState({ users });
      } else if (name && role) {
        const uid = new Date().getTime().toString();
        const { users } = this.state;
        users.push({ uid, name, role });
        this.setState({ users });
      }
  
      this.name.value = "";
      this.role.value = "";
      this.uid.value = "";
    };
  
    removeData = (user) => {
      const { users } = this.state;
      const newState = users.filter((data) => {
        return data.uid !== user.uid;
      });
      this.setState({ users: newState });
    };
  
    updateData = (user) => {
      this.uid.value = user.uid;
      this.name.value = user.name;
      this.role.value = user.role;
    };

    render() {
      const { users } = this.state;
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
              <div class="col-md-9 personal-info">
                <h3>Personal info</h3>
                <form class="form-horizontal" role="form" >
                  <div class="form-group">
                    <label class="col-lg-3 control-label">First name:</label>
                    <div class="col-lg-8">
                      <input class="form-control" type="text" value="Maui" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-lg-3 control-label">Last name:</label>
                    <div class="col-lg-8">
                      <input class="form-control" type="text" value="A" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-lg-3 control-label">Email:</label>
                    <div class="col-lg-8">
                      <input class="form-control" type="text" value="email@gmail.com" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-lg-3 control-label">Time Zone:</label>
                    <div class="col-lg-8">
                      <div class="ui-select">
                        <select id="user_time_zone" class="form-control">
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
                  <div class="form-group">
                    <label class="col-md-3 control-label">Username:</label>
                    <div class="col-md-8">
                      <input class="form-control" type="text" value="name" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-3 control-label">Password:</label>
                    <div class="col-md-8">
                      <input class="form-control" type="password" value="11111122333" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-3 control-label">Confirm password:</label>
                    <div class="col-md-8">
                      <input class="form-control" type="password" value="11111122333" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-3 control-label"></label>
                    <div class="col-md-8">
                    <input type="button" class="btn btn-primary" value="Save Changes" />
                      <span></span>
                    <input type="reset" class="btn btn-default" value="Cancel" />
                    </div>
                  </div>
                </form>
              </div>
          </div>
        </div>
        </Container>
        );
      }

}

Settings.propTypes = {

};

export default Settings;