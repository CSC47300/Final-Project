import React, { Component, PropTypes } from 'react';
import { Modal, Button, Form, Tabs, Image, Tab } from 'react-bootstrap';
import './ProfilePage.css';
import { MDBIcon, MDBRow, MDBCol } from "mdbreact";
import Settings from '../Settings/settings';
import Track from '../Track/track';
import { db } from '../../firebase';
import { auth } from 'firebase';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: []
    }
  }

  createTrack = (trackId, userName, uploadDate, audio, trackName, playCount, likeCount, commentCount, repostCount, trackArt) => {
    return <Track
      key={trackId}
      isPlaying={this.props.isPlaying}
      likes={likeCount}
      reposts={repostCount}
      playCount={playCount}
      commentCount={commentCount}
      songName={trackName}
      artistName={userName}
      userName={userName}
      albumArt={trackArt}
      timeFrame={uploadDate}
      track={audio}
      id={trackId}
      togglePlay={this.props.togglePlay}
    />
  }
  getUserTracks() {
    let tracks = [];
    db.collection('tracks').where('userId', '==', 'Maui A').get().then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      data.forEach(track => {
        tracks.push(this.createTrack(
          track.trackId,
          track.userId,
          track.uploadDate,
          track.audio,
          track.trackName,
          track.playCount,
          track.likeCount,
          track.commentCount,
          track.repostCount,
          track.trackArt
        ))
        this.setState({ tracks: tracks });
      })
    })

    // for (let i = 10; i < 13; i++) {
    //   db.collection('tracks').add({
    //     "trackId": `trackId${i}`,
    //     "userId": `Maui A`,
    //     "uploadDate": "2 hours",
    //     "audio": "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3",
    //     "trackName": `trackName${i}`,
    //     "playCount": 0,
    //     "likeCount": 0,
    //     "commentCount": 0,
    //     "repostCount": 0,
    //     "trackArt": "https://i.imgur.com/HezWtqg.jpeg"
    //   });
    // }
  }

  componentDidMount() {
    this.getUserTracks();
  }

  render() {
    let tracks = this.state.tracks;
    return (
      <div className="profile-page">
        <br></br>
        <MDBRow>
          <MDBCol xl="4" md="4" className="mb-3">
            <img src="https://mdbootstrap.com/img/Photos/Avatars/img(31).jpg" className="img-fluid z-depth-1 rounded-circle" alt="" />
          </MDBCol>
          <MDBCol xl="5" md="4">
            <div>
              <h1>{this.props.userName}</h1>
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
              <div style={{ display: "flex", justifyContent: "space-between", width: "40%" }}>
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
            {tracks}
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