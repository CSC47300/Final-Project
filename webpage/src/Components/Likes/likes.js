import React, { Component, useContext } from 'react';
import { Modal, Button, Form, Tabs, Image, Tab } from 'react-bootstrap';

import Track from '../Track/track';
import { db } from '../../firebase';
import { auth } from 'firebase';



class UserLikes extends Component{
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
        db.collection('tracks').where('userId', '==', 'Maui A' ).where('likeCount', '==', 1).get().then(querySnapshot => {
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



render(){
  let tracks = this.state.tracks;
  return(
    

    <div class="container w-55  shadow">
  
      <div class="row  m-2">  
              <h5>
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg> Liked
              </h5>
            <div class = "container  border-top border-grey">
                 <div class="col">
                    {tracks}
                </div>
            </div>    
      </div>
    
    </div>
  
  );
}







};
export default UserLikes;