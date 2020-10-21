import React, { Component, PropTypes } from 'react';
import { Modal, Button, Form, Tabs, Image, Tab } from 'react-bootstrap';
import './ProfilePage.css';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

class ProfilePage extends React.Component{
  

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
              <h1>Emily Lang</h1>
                   <h6>email: google@gmail.com</h6>
                   <br></br>
                   <div style={{display:"flex",justifyContent:"space-between",width:"40%"}}>
                       <h6>posts: 0</h6>
                       <h6>followers : 0</h6>
                       <h6>following: 0</h6>
                   </div>

               </div>
              
          </MDBCol>
        </MDBRow>
     <br></br>

            
            <Tabs defaultActiveKey="tracks" id="tab">
                    <Tab eventKey="tracks" title="Tracks">
               {/* <Sonnet /> */}
                </Tab>
                    <Tab eventKey="upload" title="Upload">
                {/* <Sonnet /> */}
                </Tab>
                    <Tab eventKey="settings" title="Settings">
                {/* <Sonnet /> */}
                </Tab>
          </Tabs>
          </div>
        );
      }

}

ProfilePage.propTypes = {

};

export default ProfilePage;