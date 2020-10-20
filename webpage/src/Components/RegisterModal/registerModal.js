import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'react-bootstrap';


class LoginModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showModal: false
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.setState({ showModal: true }, function () {
    });
  }

  close() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <Button className="login-btn" onClick={this.open}>Register</Button>
        <div>
          <Modal className="modal-container" id="register"
            show={this.state.showModal}
            onHide={this.close}
            size='md'
            centered
          >

            <Modal.Body>
              <form>
                <h3>Register</h3>

                <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control" placeholder="Username" />
                </div>

                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                  <label>Re-enter Password</label>
                  <input type="password" className="form-control" placeholder="Re-enter password" />
                </div>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
              <p className="forgot-password text-right">
                Already registered <a href="#">sign in?</a>
              </p>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default LoginModal;

