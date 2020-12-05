import React, { useState, useEffect, useContext } from 'react';

import { db } from '../../firebase';
import { UserContext } from '../../Providers/UserProvider';
import { createSongDisplay } from '../Popular/song-display';
import { AiFillCalendar } from 'react-icons/ai'

const History = (props) => {

  let user = useContext(UserContext);
  const [history, setHistory] = useState([]);

  const getUserHistory = () => {
    if (user == null) return;
    db.collection('users').doc(user.uid).get().then(doc => {
      const data = doc.data();
      let requests = [];
      data.playedTracks.reverse();
      for (let i = 0; i < 5 && i < data.playedTracks.length; i++) {
        requests.push(db.collection('tracks').doc(data.playedTracks[i]).get())
      }
      return Promise.all(requests);
    }).then(docs => {
      let items = docs.map(doc => doc.data());
      let tracks = [];
      let i = 0;
      items.forEach(data => {
        tracks.push(createSongDisplay(data.trackArt, data.trackName, data.userDisplayName,
          data.playCount, data.repostCount, data.likeCount, `${data.trackName}-${i++}`));
      })
      setHistory(tracks);
    }).catch(err => console.error(err))
  }

  useEffect(() => {
    getUserHistory();
  }, [user])

  return (
    <>
      <div className="popular">
        <span>
          <AiFillCalendar className="record-icon" />
          <h3 className="sidebar-header">Listening History:</h3>
        </span>
        <hr className="line" />
        {history}
      </div>
    </>

  );
};
export default History;