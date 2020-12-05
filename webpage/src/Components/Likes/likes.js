import React, { useState, useEffect, useContext } from 'react';
import { db } from '../../firebase';
import { UserContext } from '../../Providers/UserProvider';
import { createSongDisplay } from '../Popular/song-display';
import { BsHeart } from 'react-icons/bs';



const UserLikes = (props) => {

  let user = useContext(UserContext);
  const [likes, setLikes] = useState([]);

  const getUserLikes = () => {
    if (user == null) return;
    let tracks = [];


    db.collection('users').doc(user.uid).get().then(doc => {
      const data = doc.data();
      let liked = data.likedTracks.reverse();
      let requests = [];
      for (let i = 0; i < 5 && i < liked.length; i++) {
        requests.push(db.collection('tracks').doc(liked[i]).get())
      }
      return Promise.all(requests);
    }).then(docs => {
      let items = docs.map(doc => doc.data());
      let tracks = [];
      items.forEach(data => {
        tracks.push(createSongDisplay(data.trackArt, data.trackName, data.userDisplayName,
          data.playCount, data.repostCount, data.likeCount));
      })
      setLikes(tracks);
    }).catch(err => console.error(err))
  }

  useEffect(() => {
    getUserLikes();
  }, [user])


  return (

    <>
      <div className="popular">
        <span>
          <BsHeart className="record-icon" />
          <h3 className="sidebar-header">Recently liked:</h3>
        </span>
        <hr className="line" />
        {likes}
      </div>
    </>

  );

};
export default UserLikes;