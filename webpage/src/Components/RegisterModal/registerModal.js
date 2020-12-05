import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { auth, generateUserDocument, db } from "../../firebase";


const LoginModal = () => {

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState("");
  const [error, setError] = useState("");

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    if (password != reenterPassword) {
      setError("Passwords do not match")
    }
    else if (displayName == "") {
      setError("Choose a username")
    }
    else if (createUser) {

      try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        generateUserDocument(user, { displayName }).then(user => {
          db.collection("users").doc(user.uid).update({
            followers: [],
            following: [],
            likedTracks: [],
            playedTracks: [],
            posts: [],
            trackIds: []
          }).then(() => {
            window.location.href = '/' + displayName;
          })
        })
        console.log('success')
      }
      catch (error) {
        setError(error);

      }
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
    setReenterPassword("");
  };

  const createUser = () => {
    db.collection('users').where('displayName', '==', displayName).get()
      .then(snapshot => {
        if (snapshot.empty) {
          return true
        } else {
          return false
        }
      })
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    }
    else if (name === 'userPassword') {
      setPassword(value);
    }
    else if (name === 'displayName') {
      setDisplayName(value);
    }
    else if (name === 'reenterPassword') {
      setReenterPassword(value);
    }
  };

  const onSubmit = (e) => {
    console.log('onSubmit()');
    createUserWithEmailAndPasswordHandler(e, email, password)

  }
  return (
    <div>
      <Button className="login-btn" onClick={() => setShow(true)}>Register</Button>
      <div>
        <Modal className="modal-container" id="register"
          show={show}
          onHide={() => setShow(false)}
          size='md'
          centered
        >
          <Modal.Body>
            <form onSubmit={(event) => { onSubmit(event) }}>
              <h3>Register</h3>
              <div className="form-group">
                <label>Display Name</label>
                <input type="label"
                  id="displayName"
                  name="displayName"
                  value={displayName}
                  className="form-control"
                  placeholder="Enter desired display name"
                  onChange={event => onChangeHandler(event)} />
              </div>

              <div className="form-group">
                <label>Email address</label>
                <input type="email"
                  id="userEmail"
                  name="userEmail"
                  value={email}
                  className="form-control"
                  placeholder="Enter email"
                  onChange={event => onChangeHandler(event)} />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password"
                  name="userPassword"
                  value={password}
                  id="userPassword"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={event => onChangeHandler(event)} />
              </div>

              <div className="form-group">
                <label>Re-enter Password</label>
                <input type="password"
                  name="reenterPassword"
                  value={reenterPassword}
                  id="reenterPassword"
                  className="form-control"
                  placeholder="Re-enter password"
                  onChange={event => onChangeHandler(event)} />
              </div>

              <div className="invalid-feedback d-block"> {error.toString()}</div>
              <Button className="btn btn-primary btn-block" type='submit'>
                Sign Up
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );

}

export default LoginModal;