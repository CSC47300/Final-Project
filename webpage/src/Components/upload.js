import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, container, Row,FormCheck, Col} from 'react-bootstrap';


class Upload extends React.Component{
    render() {
        return(

    <div class="Container-fluid h-100 bg-light">

<div class="container h-100 bg-white">
           {/* In Page Nav-bar */}
        <nav class="navbar navbar-expand-lg navbar-light ">
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
    <div class="container mt-4 w-75 p-3 border shadow">
        <div class="form">
          <div class="row pt-5 m-2">
            <div class="col">
                  <h5 class="card-title text-center">Select your track</h5>
            </div>
          </div>
          <div class="form-row justify-content-center">
            <div class="col-4">
              <input type="text" class="form-control" placeholder="Artist name"/>
            </div>
          </div>
          
          <div class="form-group-row m-2">
            <div class="col"> 
                    <div class="d-flex justify-content-center">
                        <div class="form-group-row form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="privacy" value="private"/>
                               <label class="form-check-label" for="privacy"> <small>Private</small></label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="privacy" value="public"/>
                            <label class="form-check-label" for="privacy"><small>Public</small></label>
                        </div>
                    </div>
            </div>
        </div>   
        <div class="form-group row m-2">
          <div class="col">
            <div class="d-flex justify-content-center">
              <div class="form-group row">
                  <button type="submit" class="btn btn-primary">Upload</button>
              </div>
            </div>
          </div>
        </div>            
      </div>
        <div class="text-center border-bottom border-light pb-5" >
         <small> By uploading, you confirm that your sounds comply with our Terms of Use and you don't infringe anyone else's rights.</small>
        </div>
    </div>
    </div>







    </div>
    
    
     )
  }

}
export default Upload