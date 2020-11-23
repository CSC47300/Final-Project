import React, { Component } from 'react';
import {  Tabs, Tab,Button } from 'react-bootstrap';
import './ProfilePage.css';
import { MDBIcon, MDBRow, MDBCol } from "mdbreact";
import Settings from '../Settings/settings';
import Track from '../Track/track';
import {db} from '../../firebase';




class ProfilePage extends Component {
  constructor(props) {
    super(props);    

    if (this.props.match.params.profileName){
      this.name = this.props.match.params.profileName;
    } else{this.name = 'Guest';}

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
    
    console.log(this.props.match.params.profileName);
    db.collection('tracks').where('userId', '==', this.name).get().then(querySnapshot => {
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
  }

  componentDidMount() {
    this.getUserTracks();
  }

  render() {
    let tracks = this.state.tracks;

    return (

      <div className="profile-page">
        <h3>{this.props.match.params.profileName}</h3>
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
                <Button onClick={() => console.log(this.props.user)}>testing</Button>

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