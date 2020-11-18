import React, { useState, useContext } from 'react';
import { UserContext } from '../../Providers/UserProvider.js';
import "./upload.css";
import firebase from "firebase/app";
import { db } from '../../firebase';
/* eslint-disable no-unused-expressions */ 



function Upload(props){

   const user = useContext(UserContext);
   const [trackName ,setTrackName] = useState("temp");
   const [selectedTrack ,setTrack] = useState(null);
   const [selectedImage ,setImage] = useState(null);
   const [selectedImagePreview ,setImagePrev] = useState("765-default-avatar copy.png");

 
  


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
          setTrackName(event.target.files[0].name.split('.')[0]);
          setTrack(file);
         

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
          setImage(file);
          setImagePrev(URL.createObjectURL(file));
        }

      }
    }
  }
      
      
         
    function fileSubmitHandler(event) {
  if (selectedImage == null) {
    window.alert("You have not selected a Image");

  }
  if (selectedTrack == null) {
    window.alert("You have not selected an Track");
  }
}

     function uploadTrackInfo(event) {

    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    var year = d.getFullYear();
    var date = month + "/" + day + "/" + year;

    db.collection("track").add({
      audio: 'temp',
      commentCount: 0,
      likeCount: 0,
      playCount: 0,
      repostCount: 0,
      trackArt: 'temp',
      trackId: trackName,
      uploadDate: date,
      userId: user
    })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }
    
   

   

        return(

    <div class="container-fluid min-height bg-light">

<div class="container tall bg-white">
           {/* In Page Nav-bar */}
        <nav class="navbar navbar-expand-lg navbar-light border-bottom border-secondary ">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Upload <span class="sr-only">(current)</span></a>
      </li>
    </ul>
  </div>
</nav>




    {/* main containter   */}
    <div class="container mt-5 w-75 p-3 border shadow">
        <div class="form">
          <div class="row pt-5 m-2">
            <div class="col">
                  <h5 class="card-title text-center">Select your track</h5>
            </div>
          </div>
          <div class="form-row justify-content-center">
            <div class="col-4">
              <input type="file" onChange={trackSelectedHandler} required/>
            </div>
          </div>
          <div class="row pt-5 m-2">
            <div class="col">
                  <h5 class="card-title text-center">Select your Image</h5>
            </div>
          </div>
          <div class="form-row justify-content-center">
            <div class="col-4">
            <input type="file" onChange={imageSelectedHandler} required/>
            </div>
            <div class="form-row mt-4 justify-content-center">
              <div class ="col-4">
                  <img src = {selectedImagePreview } class="img-thumbnail"/>
              </div>
            </div>  
          </div>
            
        <div class="form-group row m-2">
          <div class="col">
            <div class="d-flex justify-content-center">
              <div class="form-group row mt-3">
                  <button type="submit" onClick={fileSubmitHandler} class="btn btn-lg btn-success">Upload</button>
              </div>
            </div>
          </div>
        </div>            
      </div>
    </div>
    <div class="text-center border-bottom border-light pb-5" >
         <small> By uploading, you confirm that your sounds comply with our Terms of Use and you don't infringe anyone else's rights.</small>
        </div>
    </div>
    <div class="col">
            <div class="d-flex justify-content-center">
              <div class="form-group row mt-3">
                  <button type="submit" onClick={uploadTrackInfo} class="btn btn-lg btn-success">test</button>
              </div>
            </div>
          </div>

    </div>
    
    
     )
  }


export default Upload