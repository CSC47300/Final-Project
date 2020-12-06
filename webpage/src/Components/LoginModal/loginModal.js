
import React, {useState} from 'react';
import { Modal, Button} from 'react-bootstrap';
import './loginModal.css';
import {auth, db} from '../../firebase';



const LoginModal = (props) => {
  
  const [show,setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [forgotPassword,setForgotPassword] = useState(false);
 

  const signInWithEmailAndPasswordHandler = (event,email, password) => {
      event.preventDefault();
      auth.signInWithEmailAndPassword(email, password)
      .then(function(){
        console.log("success! " + auth.currentUser.uid)
        db.collection('users').doc(auth.currentUser.uid).get()
        .then(documentSnapshot=>{
          let data = documentSnapshot.data();
          window.location.href='/'
        })

      })
      .catch(error => {
      setError(error.message);
        console.error("Error signing in with password and email", error);
      });
    };
    
  const onChangeHandler = (event) => {
      const {name, value} = event.currentTarget;
    
      if(name === 'userEmail') {
          setEmail(value);
      }
      else if(name === 'userPassword'){
        setPassword(value);
      }
  };

  const onSubmit = (e) => {
    console.log('onSubmit()');
    signInWithEmailAndPasswordHandler(e, email, password)
  }

  const sendEmail = (Email) => {
    auth.sendPasswordResetEmail(Email)
      .then(function (user) {
        alert('Please check your email...')
      }).catch(function (e) {
        console.log(e)
      })
  }


  return (
    <div>
      <Button className="login-btn" onClick={() => setShow(true)}>Login</Button>
      <div>
        <Modal className="modal-container" id="login"
          show={show}
          onHide={() => setShow(false)}
          size='md'
          centered>
          {!forgotPassword ? 
            <Modal.Body>
              <form onSubmit={(event) => {onSubmit(event)}}>
                <h3 className ='font-weight-bold text-center' closeButton>Sign In</h3>

                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" 
                          name = "userEmail"
                          id = "userEmail"
                          value = {email}
                          className="form-control" 
                          placeholder={"Enter email"}
                          onChange = {(event) => onChangeHandler(event)}

                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input type="password" 
                          name="userPassword"
                          id="userPassword"
                          value = {password} 
                          className="form-control" 
                          placeholder="Enter password"
                          onChange = {(event) => onChangeHandler(event)} />
                </div>
                <div className="invalid-feedback d-block"> {error}</div>
                <div>
                    <Button type='submit' class='padding-top'> Submit </Button>
                    <div className="forgot-password text-right">
                    <Button className = "forgot-pw" onClick={() => {setForgotPassword(true)}}>ForgotPassword</Button>
                    </div>
                </div>
              </form>
            </Modal.Body>
            :
            <Modal.Body>
              <form onSubmit={(event) => {sendEmail(email)}}>
                <h3 className ='font-weight-bold text-center' closeButton>Forgot Password</h3>

                <div className="form-group">
                  <label>Email of account:</label>
                  <input type="email" 
                          name = "userEmail"
                          id = "userEmail"
                          value = {email}
                          className="form-control" 
                          placeholder={"Enter email"}
                          onChange = {(event) => onChangeHandler(event)}
                  />
                </div>
                <Button type='submit' class='padding-top'> Send Email </Button>
              </form>
            </Modal.Body>}
        </Modal>
      </div>
    </div>
  );
}


export default LoginModal;
