import React, {useState,useEffect } from 'react';
import { createTrack, getElapsedTime } from '../../Helpers/helpers';
import Track from '../Track/track';
import { db } from '../../firebase';




const UserLikes = (props) => 
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








};
export default UserLikes;