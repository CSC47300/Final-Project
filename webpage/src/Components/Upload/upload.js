import React, { useState, useContext } from 'react';
import { UserContext } from '../../Providers/UserProvider.js';
import "./upload.css";
import { db } from '../../firebase';
import firebase from 'firebase'
import { updateRecentUploads } from '../../Helpers/helpers.js';
import { useHistory } from 'react-router-dom';

/* eslint-disable no-unused-expressions */

function Upload(props) {

  const user = useContext(UserContext);
  const [trackName, setTrackName] = useState("temp");
  const [selectedTrack, setTrack] = useState(null);
  const [selectedImage, setImage] = useState(null);
  const [selectedImagePreview, setImagePrev] = useState("765-default-avatar copy.png");
  const history = useHistory();
  let ref = firebase.storage().ref();

  function trackNameHandler(event){

   // [event.target.name]: event.target.value
  }

  function trackSelectedHandler(event) {

    const file = event.target.files[0];
    if (event.target.files.length == 0) {
      setTrack(null);
    }
    else {
      {
        const fileType = file['type'];
        const validSoundTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
        if (!validSoundTypes.includes(fileType)) {
          setTrack(null);
          window.alert("This is not an Sound file");

        }
        else {
          let Trackref = ref.child('tracks/' + file.name);
          Trackref.put(file).then(function (snapshot) {
            console.log('Uploaded the track ' + file.name);
            Trackref.getDownloadURL().then((url) => {
              setTrack(url);
              console.log('Track Set')
            })

          });


        }
      }
    }
  }

  function imageSelectedHandler(event) {

    const file = event.target.files[0];
    if (event.target.files.length == 0) {
      setImage(null);
      setImagePrev(null);

    }
    else {
      {

        const fileType = file['type'];
        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        if (!validImageTypes.includes(fileType)) {

          setImage(null);
          setImagePrev(null);

          window.alert("This is not an Image file");

        }
        else {

          setImagePrev(URL.createObjectURL(file));
          console.log(file.name);
          let Imageref = ref.child('images/' + file.name);
          Imageref.put(file).then(function (snapshot) {
            console.log('Uploaded the image' + file.name);
            Imageref.getDownloadURL().then((url) => {
              setImage(url);
              console.log('Image set')
            })
          });
        }

      }
    }
  }

  function fileSubmitHandler(event) {
    if (selectedImage == null) {
      window.alert("You have not selected a Image");
    }
    else if (selectedTrack == null) {
      window.alert("You have not selected an Track");
    }
    else {
      const time = Date.now();
      const trackId = `${user.uid}-${trackName}-${time}`;
      db.collection("tracks").doc(trackId).set({
        audio: selectedTrack,
        commentCount: 0,
        likeCount: 0,
        likedBy: [],
        playCount: 0,
        repostCount: 0,
        repostedBy: [],
        trackArt: selectedImage,
        trackId: trackId,
        trackName: trackName,
        uploadDate: time,
        userId: user.uid,
        userDisplayName: user.displayName
      })
        .then(function () {
          console.log("Document successfully written!");
          updateRecentUploads(trackId);
          db.collection("users").doc(user.uid).update({
            trackIds: firebase.firestore.FieldValue.arrayUnion(trackId),
            posts: firebase.firestore.FieldValue.arrayUnion({
              postDate: time,
              trackId: trackId
            })
          })
          history.goBack();
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    }

  }


  return (

    <div className="container-fluid min-height bg-light">

      <div className="container tall bg-white">
        {/* In Page Nav-bar */}
        <nav className="navbar navbar-expand-lg navbar-light border-bottom border-secondary ">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">Upload <span className="sr-only">(current)</span></a>
              </li>
            </ul>
          </div>
        </nav>

        {/* main containter   */}
        <div className="container mt-5 w-75 p-3 border shadow">
          <div className="form">
            <div className="row pt-5 m-2">
              <div className="col">
                <h5 className="card-title text-center">Select your track</h5>
              </div>
            </div>
            <div className="form-row justify-content-center">
              <div className="col-4">
                <input type="file" onChange={trackSelectedHandler} required />
              </div>
            </div>
            <div className="row pt-5 m-2">
              <div className="col">
                <h5 className="card-title text-center">Enter track name</h5>
              </div>
            </div>
            <div className="form-row mt-4 justify-content-center">
              <div className="col-4">
                <input type="text" class="form-control" id="inputPassword2" placeholder="Track Name" onChange={trackNameHandler} required />
              </div>
            </div>
            <div className="row pt-5 m-2">
              <div className="col">
                <h5 className="card-title text-center">Select your Image</h5>
              </div>
            </div>
            <div className="form-row justify-content-center">
              <div className="col-4">
                <input type="file" onChange={imageSelectedHandler} required />
              </div>
              <div className="form-row mt-4 justify-content-center">
                <div className="col-4">
                  <img src={selectedImagePreview} className="img-thumbnail" />
                </div>
              </div>
            </div>

            <div className="form-group row m-2">
              <div className="col">
                <div className="d-flex justify-content-center">
                  <div className="form-group row mt-3">
                    <button type="submit" onClick={fileSubmitHandler} className="btn btn-lg btn-success">Upload</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center border-bottom border-light pb-5" >
          <small> By uploading, you confirm that your sounds comply with our Terms of Use and you don't infringe anyone else's rights.</small>
        </div>
      </div>


    </div>


  )
}


export default Upload