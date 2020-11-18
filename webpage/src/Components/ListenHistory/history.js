import React, { Component, useContext } from 'react';
import Track from '../Track/track';
import { db } from '../../firebase';




class History extends Component{
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
        db.collection('tracks').where('userId', '==', 'Maui A' ).get().then(querySnapshot => {
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
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5z"/>
              </svg> Listening History 
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
export default History;