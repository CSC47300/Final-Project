import React, { Component, useContext } from 'react';
import { UserContext } from '../../Providers/UserProvider.js';
import "./upload.css";
import firebase from "firebase/app";
import { db } from '../../firebase';
/* eslint-disable no-unused-expressions */ 



class Upload extends React.Component{

  


  constructor(props) {
    super(props);
    this.state = ({
       trackName: null,
       selectedTrack: null,
       selectedImage: null,
       selectedImagePreview: "765-default-avatar copy.png"
     });
    }

    trackSelectedHandler = event => {
        

      const file = event.target.files[0];
      if(event.target.files.length == 0){
        this.setState({
          selectedTrack:null
        })
      }
      else{{

      const fileType = file['type'];
      const validSoundTypes = ['audio/mpeg','audio/wav','audio/ogg'];
      if (!validSoundTypes.includes(fileType)) {
          this.setState({
            selectedTrack:null
          })
          window.alert("This is not an Sound file")
      
      }
      else{{this.setState({
        selectedTrack: file,
       // trackName: file.split('.')[0],
      });
        console.log(this.state.selectedTrack);

      }}
      }}
  
     }

     imageSelectedHandler = event => {

      const file = event.target.files[0];
      if(event.target.files.length == 0){
        this.setState({
           selectedImage:null,
           selectedImagePreview:null
        })
        
      }
      else{{

      const fileType = file['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (!validImageTypes.includes(fileType)) {
          this.setState({
               selectedImage:null,
               selectedImagePreview:null
          })
          window.alert("This is not an Image file")
        
      }
      else{{this.setState({
            selectedImage: file,
            selectedImagePreview:  URL.createObjectURL(file)
          })
           
      }}
      }}
      }
      
         
      fileSubmitHandler = event => {
        if(this.state.selectedImage == null){
          window.alert("You have not selected a Image")
          window.alert(this.state.user)
        }
          if (this.state.selectedTrack == null){
          window.alert("You have not selected an Track")
        }
      }

      uploadTrackInfo = event =>{

        var storageRef = firebase.storage().ref();
        var TrackRef = storageRef.child(this.state.selectedTrack);
        var ImageRef = storageRef.child(this.state.selectedImage);
       
        
        db.collection("track").add({
          audio:  TrackRef,
          commentCount:0,
          likeCount: 0,
          playCount: 0,
          repostCount: 0,
          trackArt: ImageRef,
          trackId: 'temp',
          uploadDate:"2 hours",
          userId: "Raul"
      })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      }
    
   

    render(){

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
              <input type="file" onChange={this.trackSelectedHandler} required/>
            </div>
          </div>
          <div class="row pt-5 m-2">
            <div class="col">
                  <h5 class="card-title text-center">Select your Image</h5>
            </div>
          </div>
          <div class="form-row justify-content-center">
            <div class="col-4">
            <input type="file" onChange={this.imageSelectedHandler} required/>
            </div>
            <div class="form-row mt-4 justify-content-center">
              <div class ="col-4">
                  <img src = {this.state.selectedImagePreview} class="img-thumbnail"/>
              </div>
            </div>  
          </div>
            
        <div class="form-group row m-2">
          <div class="col">
            <div class="d-flex justify-content-center">
              <div class="form-group row mt-3">
                  <button type="submit" onClick={this.fileSubmitHandler} class="btn btn-lg btn-success">Upload</button>
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
                  <button type="submit" onClick={this.uploadTrackInfo} class="btn btn-lg btn-success">test</button>
              </div>
            </div>
          </div>

    </div>
    
    
     )
  }

}
export default Upload