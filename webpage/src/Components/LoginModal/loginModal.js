
import React, {useState} from 'react';
import { Modal, Button} from 'react-bootstrap';
import './loginModal.css';
import {auth} from '../../firebase';




const LoginModal = () => {
  
  const [show,setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event,email, password) => {
      event.preventDefault();
      auth.signInWithEmailAndPassword(email, password)
      .then(function(){
        console.log("success! " + auth.currentUser.uid)
      })
      .catch(error => {
      setError("Error signing in with password and email!");
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


  return (
    <div>
      <Button className="login-btn" onClick={() => setShow(true)}>Login</Button>
      <div>
        <Modal className="modal-container" id="login"
          show={show}
          onHide={() => setShow(false)}
          size='md'
          centered>

          <Modal.Body>
            <form onSubmit={(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
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

              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" 
                          className="custom-control-input" 
                          id="customCheck1" />
                  <label className="custom-control-label" 
                          htmlFor="customCheck1"> Remember me 
                  </label>
                </div>
              </div>
              <div>
              <button> Submit </button>
                
                <p className="forgot-password text-right">
                  Forgot <a href="#">password?</a>
                </p>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}


export default LoginModal;