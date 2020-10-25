import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import "./navigation.css";
import LoginModal from '../LoginModal/loginModal';
import RegisterModal from '../RegisterModal/registerModal';
import ProfilePage from '../Profile/ProfilePage';
import Settings from '../Settings/settings';

class NavBar extends Component {

    render() {
        let mobile, login;
        login =
            <Nav className="ml-auto login-container">
                <LoginModal />
                <RegisterModal />
            </Nav>

        if (window.innerWidth < 768) {
            mobile =
                <Nav className="container-fluid">
                    <Nav.Link href="#upload">Upload</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link href="/settings">Settings</Nav.Link>
                    <Nav.Link href="#logout">Logout</Nav.Link>
                </Nav>
        } else mobile =
            <Nav className="container-fluid">
                <Nav.Link href="#upload" className="ml-auto">Upload</Nav.Link>
                <NavDropdown title={this.props.userName} className="">
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                    <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        let rightNav =
            <>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    {mobile}
                </Navbar.Collapse>
            </>
        let display = this.props.isLoggedIn ? rightNav : login;
        return (
            <div>
                <Navbar className="main-nav" bg="dark" variant="dark" expand="md">
                    <Navbar.Brand href="#home">Newercloud</Navbar.Brand>
                    {display}
                </Navbar>
            </div>
        )
    }
}

export default NavBar;