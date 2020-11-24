import React, {useState,useEffect } from 'react';
import { createTrack, getElapsedTime } from '../../Helpers/helpers';
import Track from '../Track/track';
import { db } from '../../firebase';




const History = (props) => 
  {
   
    let name;

    if (props.match.params.profileName) {
      name = props.match.params.profileName;} 
    else{ name = 'Guest'; }
  
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








};
export default History;