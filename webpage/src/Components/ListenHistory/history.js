import React, {useState,useEffect,useContext } from 'react';

import { createTrack, getElapsedTime } from '../../Helpers/helpers';
import { db } from '../../firebase';
import { UserContext } from '../../Providers/UserProvider';



const History = (props) => 
  {
   
    let user = useContext(UserContext);
    const [history, setHistory] = useState([]);
    const [currentlyPlaying, setCurrent] = useState({
      current: "",
      id: ""
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentInfo, setInfo] = useState({
      img: '',
      songName: '',
      artistName: ''
  })
  const togglePlaying = (item = currentlyPlaying) => {
    if (item.current != "") {
      item.current.playPause();
      setIsPlaying(isPlaying => !isPlaying);
    }
  }
  
    const getUserHistory = () => {
      if (user == null) return;
      let tracks= [];
      
      db.collection('users').doc(user.uid).get().then(doc => {
        const data = doc.data();
       console.log(data.playedTracks);
       db.collection('tracks').where('trackId', "in", data.playedTracks).get().then(querySnapshot => {
          const track = querySnapshot.docs.map(doc => doc.data());
          track.forEach(data => {
            tracks.push(createTrack(
              data.trackId,
              data.userDisplayName,
              data.userDisplayName,
              getElapsedTime(data.uploadDate),
              data.audio,
              isPlaying,
              togglePlaying,
              data.trackName,
              data.playCount,
              data.likeCount,
              data.repostCount,
              data.trackArt,
              setCurrent,
              setInfo,
              currentlyPlaying
              ))
              setHistory(tracks);
            })
          })
        }).catch(err => console.error(err))
      }
    
    useEffect(() => {
      getUserHistory();
    }, [user])
    
  return(
    

    <div class="container  shadow">
      <div class="row  m-3">  
            <div class = "container  border-top border-grey">
                 <div class="col">
                    {history.reverse()}
                </div>
            </div>    
      </div>
    </div>
    
  
  );
};
export default History;