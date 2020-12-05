import React, { Component, useState, useEffect, useContext } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import './ProfilePage.css';
import { MDBIcon, MDBRow, MDBCol } from "mdbreact";
import Settings from '../Settings/settings';
import { db } from '../../firebase';
import { getElapsedTime } from '../../Helpers/helpers';
import { UserContext } from '../../Providers/UserProvider';
import Player from '../Player/player';
import firebase from "firebase/app";
import Track from '../Track/track';

const ProfilePage = (props) => {

  let name;
  let user = useContext(UserContext);
  if (props.match.params.profileName) {
    name = props.match.params.profileName;
  } else { name = 'Guest'; }

  const [showSettings, setShowSettings] = useState(false);
  const [userNow, setUser] = useState("");

  const getUserNow = () => {
    db.collection('users').where('displayName', '==', name).get().then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      const values = data[0];
      if (values == null) {
        window.location.href = '/';
      }
      setUser(values);
    }
    )
  }

  const [tracks, setTracks] = useState([]);
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
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const togglePlaying = (item = currentlyPlaying) => {
    if (currentlyPlaying.current !== '') {
      if (item.id != currentlyPlaying.id) {
        currentlyPlaying.current.pause();
      }
    }
    if (item.current != "") {
      item.current.playPause();
      if (item.current.isPlaying()) {
        setIsPlaying(true)
      } else setIsPlaying(false);
    }
  }

  const getUserTracks = () => {
    let tracks = [];

    db.collection('users').where('displayName', '==', name).get().then(querySnapshot => {
      return [querySnapshot.docs[0].id, querySnapshot.docs[0].data().photoURL];
    }).then(returnData => {
      const userId = returnData[0];
      db.collection('tracks').where('userId', '==', userId).get().then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        data.sort((a, b) => b.uploadDate - a.uploadDate);
        data.forEach(data => {
          tracks.push(
            {
              key: data.trackId,
              isPlaying: isPlaying,
              likes: data.likeCount,
              reposts: data.repostCount,
              playCount: data.playCount,
              songName: data.trackName,
              artistName: name,
              userName: name,
              userPhoto: returnData[1],
              albumArt: data.trackArt,
              timeFrame: getElapsedTime(data.uploadDate),
              track: data.audio,
              id: data.trackId,
              togglePlaying: togglePlaying,
              setCurrent: setCurrent,
              setInfo: setInfo,
              currentlyPlaying: currentlyPlaying
            }
          )
        })
        setTracks(tracks);
        db.collection('users').doc(userId).get().then(doc => {
          const data = doc.data();
          setFollowers(data.followers.length);
          setFollowing(data.following.length);
        })
      })
    }).catch(err => console.error(err))
  }

  const [followButton, setFollowButton] = useState('Follow');
  useEffect(() => {
    if (user != null) {
      db.collection('users').where('displayName', '==', name).get().then(querySnapshot => {
        return querySnapshot.docs[0].id;
      }).then(userId => {
        db.collection('users').doc(user.uid).get().then(doc => {
          const following = doc.data().following;
          if (following.includes(userId)) {
            setFollowButton("Unfollow")
          }
        })
      })
    }
  }, [user])
  const follow = () => {
    if (user == null) {
      window.alert("You must be signed in to follow the user.");
      return;
    }
    const name = props.match.params.profileName;
    db.collection('users').where('displayName', '==', name).get().then(querySnapshot => {
      return querySnapshot.docs[0].id;
    }).then(userId => {
      db.collection('users').doc(user.uid).get().then(doc => {
        const data = doc.data();
        let following = doc.data().following;
        if (following.includes(userId)) {
          db.collection('users').doc(user.uid).update({ // Remove from following
            following: firebase.firestore.FieldValue.arrayRemove(userId)
          })
          db.collection('users').doc(userId).update({ // Remove from followers
            followers: firebase.firestore.FieldValue.arrayRemove(user.uid)
          })
          setFollowButton("Follow")
        } else {
          db.collection('users').doc(user.uid).update({   // Update current user following
            following: firebase.firestore.FieldValue.arrayUnion(userId)
          })
          db.collection('users').doc(userId).update({   // Update user who is being followed
            followers: firebase.firestore.FieldValue.arrayUnion(user.uid)
          })
          setFollowButton("Unfollow")
        }
        if (data.following.includes(userId)) return true;
        else return false;
      }).catch(err => console.error(err))
    }).catch(err => console.error(err))
  }

  useEffect(() => {
    getUserNow();
    if (user && user.displayName == props.match.params.profileName) {
      setShowSettings(true);
    }
    else {
      setShowSettings(false);
    }
    getUserTracks();
  }, [user])

  const displayTracks = tracks.map(track => {
    return <Track
      key={track.key}
      isPlaying={isPlaying}
      likes={track.likes}
      reposts={track.reposts}
      playCount={track.playCount}
      songName={track.songName}
      artistName={track.artistName}
      userName={track.userName}
      albumArt={track.albumArt}
      userPhoto={track.userPhoto}
      timeFrame={track.timeFrame}
      track={track.track}
      id={track.id}
      togglePlaying={togglePlaying}
      setCurrent={setCurrent}
      setInfo={setInfo}
      currentlyPlaying={currentlyPlaying}
    />
  })

  let display = userNow != null ?
    <>
      <div className="profile-container">
        <div className="profile-page">
          <br></br>
          <MDBRow>
            <MDBCol xl="4" md="4" className="mb-3">

              <img
                src={userNow != null ? userNow.photoURL == null ? "765-default-avatar copy.png" : userNow.photoURL : ''}
                className="img-fluid z-depth-1 rounded-circle"
                alt="poster-avatar"
              />
            </MDBCol>
            <MDBCol xl="5" md="4">
              <div>
                <h1>{userNow != null ? userNow.displayName : 'User does not exist'}</h1>
                <p>
                  <MDBIcon icon='quote-left' /> {userNow != null ? userNow.description : ''}
                </p>
                <br></br>
                <div style={{ display: "flex", justifyContent: "space-between", width: "40%" }}>
                  <h6 className="h6-header">Posts: {tracks.length}</h6>
                  <h6 className="h6-header">Followers: {followers}</h6>
                  <h6 className="h6-header">Following: {following}</h6>
                </div>
                <Button onClick={follow}>{followButton}</Button>
              </div>

            </MDBCol>

          </MDBRow>

          <br></br>

          <Tabs defaultActiveKey="tracks" id="tab">
            <Tab eventKey="tracks" title="Tracks">
              {displayTracks}
            </Tab>
            {showSettings ? <Tab eventKey="settings" title="Settings">
              <Settings />
            </Tab> : null}
          </Tabs>
        </div>
      </div>
      <Player
        togglePlay={togglePlaying}
        isPlaying={isPlaying}
        img={currentInfo.img}
        songName={currentInfo.songName}
        artistName={currentInfo.artistName}
      />
    </>
    : <h1>This page does not exist, redirecting...</h1>;
  return display;
}

export default ProfilePage;