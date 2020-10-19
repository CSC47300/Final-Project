import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import "./navigation.css";

class NavBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let mobile;
        if (window.innerWidth < 768) {
            mobile =
                <Nav className="container-fluid">
                    <Nav.Link href="#upload">Upload</Nav.Link>
                    <Nav.Link href="#profile">Profile</Nav.Link>
                    <Nav.Link href="#settings">Settings</Nav.Link>
                    <Nav.Link href="#logout">Logout</Nav.Link>
                </Nav>
        } else mobile =
            <Nav className="container-fluid">
                <Nav.Link href="#upload" className="ml-auto">Upload</Nav.Link>
                <NavDropdown title={this.props.userName} className="">
                    <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
                    <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        return (
            <div>
                <Navbar className="main-nav" bg="dark" variant="dark" expand="md">
                    <Navbar.Brand href="#home">Newercloud</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        {mobile}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default NavBar;