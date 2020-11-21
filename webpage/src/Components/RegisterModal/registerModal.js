import React, {useState } from 'react';
import { Modal, Button} from 'react-bootstrap';
import { auth, generateUserDocument } from "../../firebase";


const LoginModal = () => {
  
  const [show,setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState('');
  const [, setError] = useState(null);
 
  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
    }
    catch(error){
      setError('Error Signing up with email and password');
    }
      
    setEmail("");
    setPassword("");
    setDisplayName("");
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
      <Button className="login-btn" onClick={() => setShow(true)}>Register</Button>
      <div>
        <Modal className="modal-container" id="register"
          show={show}
          onHide={() => setShow(false)}
          size='md'
          centered
        >

          <Modal.Body>
            <form>
              <h3>Register</h3>
              <div className="form-group">
                <label>Display Name</label>
                <input type="label"
                        id="displayName"
                        name="displayName"
                        value={displayName}
                        className="form-control" 
                        placeholder="Enter desired display name" 
                        onChange = {event => onChangeHandler(event)}/>
              </div>

              <div className="form-group">
                <label>Email address</label>
                <input type="email"
                        id="userEmail"
                        name="userEmail"
                        value={email}
                        className="form-control" 
                        placeholder="Enter email" 
                        onChange = {event => onChangeHandler(event)}/>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" 
                        name="userPassword"
                        value={password}
                        id="userPassword"
                        className="form-control" 
                        placeholder="Enter password" 
                        onChange = {event => onChangeHandler(event)}/>

              </div>

              <div className="form-group">
                <label>Re-enter Password</label>
                <input type="password" 
                        className="form-control" 
                        placeholder="Re-enter password" />
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <button className="btn btn-primary btn-block"
                    onClick={event => {
                      createUserWithEmailAndPasswordHandler(event, email, password);
                    }}>
                      Sign Up
            </button>
            <p className="forgot-password text-right">
              Already registered <a href="#">sign in?</a>
            </p>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
  
}

export default LoginModal;