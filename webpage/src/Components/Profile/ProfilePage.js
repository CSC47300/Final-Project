import React, { Component, PropTypes } from 'react';
import { Modal, Button, Form, Tabs, Image, Tab } from 'react-bootstrap';
import './ProfilePage.css';
import { MDBIcon, MDBRow, MDBCol } from "mdbreact";
import Settings from '../Settings/settings';

class ProfilePage extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
            <br></br>
        <MDBRow>
          <MDBCol xl="4" md="4" className="mb-3">
            <img src="https://mdbootstrap.com/img/Photos/Avatars/img(31).jpg" className="img-fluid z-depth-1 rounded-circle" alt="" />
          </MDBCol>
          <MDBCol xl="5" md="4">
              <div>
        <h1>Maui A {this.props.userName}</h1>
              <p>
                  <MDBIcon icon='quote-left' /> Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Quod eos id officiis hic tenetur
                  quae quaerat ad velit ab. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Dolore cum accusamus eveniet
                  molestias voluptatum inventore laboriosam labore sit,
                  aspernatur praesentium iste impedit quidem dolor veniam.
                </p>
              
                   <h6>email: google@gmail.com {this.props.email}</h6>
                   <br></br>
                   <div style={{display:"flex",justifyContent:"space-between",width:"40%"}}>
                       <h6>posts: 0 {this.props.posts}</h6>
                       <h6>followers : 0 {this.props.followers}</h6>
                       <h6>following: 0 {this.props.following}</h6>
                   </div>

               </div>
              
          </MDBCol>
        </MDBRow>
     <br></br>

            
            <Tabs defaultActiveKey="tracks" id="tab">
                    <Tab eventKey="tracks" title="Tracks">
               {/* <Sonnet /> */}
                </Tab>
                    <Tab eventKey="settings" title="Settings">
                 <Settings />
                </Tab>
          </Tabs>
          </div>
        );
      }

}

ProfilePage.propTypes = {

};

export default ProfilePage;