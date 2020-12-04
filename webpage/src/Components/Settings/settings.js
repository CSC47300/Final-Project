import React, { useContext, useRef, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { UserContext } from '../../Providers/UserProvider.js';
import { db, getUserDocument } from '../../firebase';
import firebase from "firebase/app";
import './settings.css';

function Settings(props) {
  
  const inputFirstName = useRef(null);
  const inputLastName = useRef();
  const inputEmail = useRef();
  const inputUsername = useRef();
  const inputTimeZone = useRef();
  const inputDescription = useRef();
  const user = useContext(UserContext);
  const [selectedImage, setImage] = useState(null);
  const [selectedImagePreview, setImagePrev] = useState("https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257__340.png");
  let ref = firebase.storage().ref();

  const [userNow, setUser] = useState("");
  const getUserNow = () => {

    db.collection('users').doc(user.uid).get().then(doc => {
      const data = doc.data();
      console.log("Current user info: ",data)
      setUser(data);
    }
    )
  }
  useEffect(() => {
    if (user === null) return;
    else {
      getUserNow();
    }
}, [])

  function imageSelectedHandler(event) {
    const file = event.target.files[0];
    console.log(file);
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
          let Imageref = ref.child('images/' + file.name);
          Imageref.put(file).then(function (snapshot) {
            console.log('Uploaded the image' + file.name);
            Imageref.getDownloadURL().then((url) => {
              setImage(url);
            })
          });
        }
      }
    }
  }
  const handleSubmit = (event) => {
    if (selectedImage == null) {
      window.alert("You have not selected a Image, Your avatar image is same as before!");
    }
    console.log(selectedImage);
    console.log(inputFirstName.current.value);
    console.log(inputLastName.current.value);
    console.log(inputEmail.current.value);
    console.log(inputUsername.current.value);
    console.log(inputTimeZone.current.value);
    console.log(inputDescription.current.value);
    event.preventDefault();

    db.collection('users').doc(user.uid
    ).update({
      photoURL: selectedImage,
      firstName: inputFirstName.current.value,
      lastName: inputLastName.current.value,
      email: inputEmail.current.value,
      displayName: inputUsername.current.value,
      timeZone: inputTimeZone.current.value,
      description: inputDescription.current.value
    })
      .then(() => {
        console.log('User updated!');
        alert("User settings sucsessfully updated!");
      })
      .catch(function (error) {
        console.error("Error update user: ", error);
      });
  }
  return (
    <Container fluid>
      <div className="setting-container">

        <div className="row user-img">
          <div className="col-3">
            <h5>Change User Profile Image</h5>
            <div className="">
              <img src={selectedImagePreview} className="img-fluid z-depth-1 rounded-circle" alt="avatar" />
              <h6>Upload a different photo...</h6>

              <input type="file" onChange={imageSelectedHandler} required />
            </div>
          </div>
        </div>
        <div className="col-9 personal-info">
          <h3>Personal info</h3>
          <form className="form-horizontal" role="form" >
            <div className="form-group">
              <label className="col-lg-3 control-label">First name:</label>
              <div className="col-lg-8">
                <input className="form-control" type="text" ref={inputFirstName} defaultValue={userNow.firstName} />
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-3 control-label">Last name:</label>
              <div className="col-lg-8">
                <input className="form-control" type="text" ref={inputLastName} defaultValue={userNow.lastName}/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-3 control-label">Email:</label>
              <div className="col-lg-8">
                <input className="form-control" type="text" ref={inputEmail} defaultValue={userNow.email}/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-3 control-label">Time Zone:</label>
              <div className="col-lg-8">
                <div className="ui-select">
                  <select id="user_time_zone" className="form-control" ref={inputTimeZone} defaultValue={userNow.timeZone}>
                    <option value="Hawaii"  >(GMT-10:00) Hawaii</option>
                    <option value="Alaska"  >(GMT-09:00) Alaska</option>
                    <option value="Pacific Time (US &amp; Canada)"  >(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                    <option value="Arizona"  >(GMT-07:00) Arizona</option>
                    <option value="Mountain Time (US &amp; Canada)"  >(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                    <option value="Central Time (US &amp; Canada)"  >(GMT-06:00) Central Time (US &amp; Canada)</option>
                    <option value="Eastern Time (US &amp; Canada)" selected="selected"  >(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                    <option value="Indiana (East)"  >(GMT-05:00) Indiana (East)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label">Username:</label>
              <div className="col-md-8">
                <input className="form-control" type="text" ref={inputUsername} defaultValue={userNow.displayName}/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label">Description:</label>
              <div className="col-md-8">
                <textarea className="form-control" type="text" rows={3} ref={inputDescription} defaultValue={userNow.description}/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label"></label>
              <div className="col-md-8">
                <input type="button" className="btn btn-primary" value="Submit" onClick={handleSubmit} />
                <span></span>
                <input type="reset" className="btn btn-default" value="Cancel" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}

export default Settings;
