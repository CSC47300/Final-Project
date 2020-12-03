import React, { Component, useState, useEffect, useContext } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import './ProfilePage.css';
import { MDBIcon, MDBRow, MDBCol } from "mdbreact";
import Settings from '../Settings/settings';
import { db } from '../../firebase';
import { createTrack, getElapsedTime } from '../../Helpers/helpers';
import { UserContext } from '../../Providers/UserProvider';
import Player from '../Player/player';
import firebase from "firebase/app";
import NotFound from '../NotFound';
import { Redirect } from 'react-router-dom'

const ProfilePage = (props) => {
  
  let name;
  let user = useContext(UserContext);
  if (props.match.params.profileName) {
    name = props.match.params.profileName;
  } else { name = 'Guest'; }

  const [showSettings,setShowSettings] = useState(false);
  const [userNow, setUser] = useState([]);
const getUserNow = () => {

    db.collection('users').where('displayName', '==', name).get().then(querySnapshot => {
    const data = querySnapshot.docs.map(doc => doc.data());
    const values = data[0];
   //console.log(data, "user in db with this name", typeof data);
   //console.log(values.displayName);
    setUser(values);
    checkUser();
      }
    ) 
  }

const checkUser = () => {
  
    if (!('displayName' in userNow)) {
      console.log("lllllllllllllllll", userNow.email)
      return (
        <div>
          <h3>404 page not found</h3>
          <p>We are sorry but the page you are looking for does not exist.</p>
        </div>
         )
    }
  }
  useEffect(() => {
    getUserNow();
  }, [userNow])

  const [tracks, setTracks] = useState();
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

  const getUserTracks = () => {
    if (user == null) return;
    let tracks = [];

    console.log(props.match.params.profileName);
    db.collection('users').where('displayName', '==', name).get().then(querySnapshot => {
      return querySnapshot.docs[0].id;
    }).then(userId => {
      db.collection('tracks').where('userId', '==', userId).get().then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        data.sort((a, b) => b.uploadDate - a.uploadDate);
        data.forEach(data => {
          tracks.push(createTrack(
            data.trackId,
            name,
            name,
            getElapsedTime(data.uploadDate),
            data.audio,
            isPlaying,
            togglePlaying,
            data.trackName,
            data.playCount,
            data.likeCount,
            //data.commentCount,
            data.repostCount,
            data.trackArt,
            setCurrent,
            setInfo,
            currentlyPlaying
          ))
          setTracks(tracks);
        })
      })
    }).catch(err => console.error(err))
  }


  const follow = () => {
    const name = props.match.params.profileName;
    db.collection('users').where('displayName', '==', name).get().then(querySnapshot => {
      return querySnapshot.docs[0].id;
    }).then(userId => {
      db.collection('users').doc(user.uid).get().then(doc => {
        const data = doc.data();
        if (data.following.includes(userId)) return true;
        else return false;
      }).then(isFollwing => {
        if (!isFollwing) {
          db.collection('users').doc(user.uid).update({
            following: firebase.firestore.FieldValue.arrayUnion(userId)
          })
        }
      })
    })
  }

  useEffect(() => {
    if (user && user.displayName == props.match.params.profileName){
      setShowSettings(true);
    }
    else{
      setShowSettings(false);
    }
    getUserTracks();
  }, [user])

  return (
    <>
      <div className="profile-page">
        <h3>{props.match.params.profileName}</h3>
        <br></br>
        <MDBRow>
          <MDBCol xl="4" md="4" className="mb-3">
            <img src={userNow.photoURL} className="img-fluid z-depth-1 rounded-circle" alt="poster-avatar" />
          </MDBCol>
          <MDBCol xl="5" md="4">
            <div>
              <h1>{userNow.displayName}</h1>
              <p>
                <MDBIcon icon='quote-left' /> {userNow.description}
              </p>
              <br></br>
              <div style={{ display: "flex", justifyContent: "space-between", width: "40%" }}>
                <h6>posts: 0 {props.posts}</h6>
                <h6>followers : 0 {props.followers}</h6>
                <h6>following: 0 {props.following}</h6>
              </div>
              <Button onClick={follow}>Follow</Button>
            </div>

          </MDBCol>

        </MDBRow>

        <br></br>

        <Tabs defaultActiveKey="tracks" id="tab">
          <Tab eventKey="tracks" title="Tracks">
            {tracks}
          </Tab>
          {showSettings ? <Tab eventKey="settings" title="Settings">
                            <Settings />
                          </Tab> : null}
        </Tabs>
      </div>
      <Player
        togglePlay={togglePlaying}
        isPlaying={isPlaying}
        img={currentInfo.img}
        songName={currentInfo.songName}
        artistName={currentInfo.artistName}
      />
    </>
  )
}

export default ProfilePage;