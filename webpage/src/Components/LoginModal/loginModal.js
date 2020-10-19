
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'react-bootstrap';


class LoginModal extends Component{
  constructor(props,context){
    super(props,context);

    this.state = {
      showModal: false
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.setState({showModal: true}, function(){
    });
  }

  close(){
    this.setState({showModal: false});
  }

  render() {
    return(
      <div>
        <Button onClick={this.open}>Log In</Button>
        <div>
          <Modal className="modal-container" id="login"
            show={this.state.showModal} 
            onHide={this.close}
            size='md'
            centered
            >
   
            <Modal.Body>
              <form>
                  <h3 class='font-weight-bold text-center'>Sign In</h3>

                  <div className="form-group">
                      <label>Email address</label>
                      <input type="email" className="form-control" placeholder="Enter email" />
                  </div>

                  <div className="form-group">
                      <label>Password</label>
                      <input type="password" className="form-control" placeholder="Enter password" />
                  </div>

                  <div className="form-group">
                      <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="customCheck1" />
                          <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                      </div>
                  </div>
              </form>
            </Modal.Body>
    
            <Modal.Footer>
            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </Modal.Footer>         
          </Modal> 
        </div>
      </div>  
     );
    }
}

export default LoginModal;