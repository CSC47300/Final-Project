import React, { Component, useState, useEffect } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import './ProfilePage.css';
import { MDBIcon, MDBRow, MDBCol } from "mdbreact";
import Settings from '../Settings/settings';
import { db } from '../../firebase';
import { createTrack, getElapsedTime } from '../../Helpers/helpers';


const ProfilePage = (props) => {

  let name;
  if (props.match.params.profileName) {
    name = props.match.params.profileName;
  } else { name = 'Guest'; }

  const [tracks, setTracks] = useState([]);

  const getUserTracks = () => {
    let tracks = [];

    console.log(props.match.params.profileName);
    db.collection('tracks').where('userId', '==', name).get().then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      data.forEach(data => {
        tracks.push(createTrack(
          data.trackId,
          data.userId,
          data.userId,
          getElapsedTime(data.uploadDate),
          data.audio,
          props.isPlaying,
          props.togglePlay,
          data.trackName,
          data.playCount,
          data.likeCount,
          data.commentCount,
          data.repostCount,
          data.trackArt
        ))
        setTracks(tracks);
      })
    })
  }

  useEffect(() => {
    getUserTracks();
  }, [])

  return (

    <div className="profile-page">
      <h3>{props.match.params.profileName}</h3>
      <br></br>
      <MDBRow>
        <MDBCol xl="4" md="4" className="mb-3">
          <img src="https://mdbootstrap.com/img/Photos/Avatars/img(31).jpg" className="img-fluid z-depth-1 rounded-circle" alt="" />
        </MDBCol>
        <MDBCol xl="5" md="4">
          <div>
            <h1>{props.userName}</h1>
            <p>
              <MDBIcon icon='quote-left' /> Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Quod eos id officiis hic tenetur
                quae quaerat ad velit ab. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Dolore cum accusamus eveniet
                molestias voluptatum inventore laboriosam labore sit,
                aspernatur praesentium iste impedit quidem dolor veniam.
              </p>

            <h6>email: google@gmail.com {props.email}</h6>
            <br></br>
            <div style={{ display: "flex", justifyContent: "space-between", width: "40%" }}>
              <h6>posts: 0 {props.posts}</h6>
              <h6>followers : 0 {props.followers}</h6>
              <h6>following: 0 {props.following}</h6>

            </div>

          </div>

        </MDBCol>
      </MDBRow>
      <br></br>

      <Tabs defaultActiveKey="tracks" id="tab">
        <Tab eventKey="tracks" title="Tracks">
          {tracks}
        </Tab>
        <Tab eventKey="settings" title="Settings">
          <Settings />
        </Tab>
      </Tabs>
    </div>
  )
}

export default ProfilePage;