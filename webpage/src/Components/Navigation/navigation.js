import React, {useContext} from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import "./navigation.css";
import LoginModal from '../LoginModal/loginModal.js';
import RegisterModal from '../RegisterModal/registerModal.js';
import "firebase/auth";
import "firebase/firestore";
import { UserContext } from '../../Providers/UserProvider.js';
import { signOut } from '../../firebase.js';

const NavBar = () => {
        
        let mobile, login;
        const user = useContext(UserContext);
        
        if (user){
            if (window.innerWidth < 768) {
                mobile =
                    <Nav className="container-fluid">
                        <Nav.Link href="/upload">Upload</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="/settings">Settings</Nav.Link>
                        <Button onClick={() => signOut()} >Logout</Button>
                    </Nav>
            } else mobile =
                <Nav className="container-fluid">
                    <Nav.Link href="/upload" className="ml-auto">Upload</Nav.Link>
                    <NavDropdown title={user.displayName} className="">
                        <NavDropdown.Item href='/likes'>likes</NavDropdown.Item>
                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                        <NavDropdown.Item href="/history">history</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => signOut()} >Logout</NavDropdown.Item>
                    </NavDropdown>
                    <Button onClick={() => console.log(user)}>test</Button>
                </Nav>
            
        }

        login =
            <Nav className="ml-auto login-container">
                <LoginModal />
                <RegisterModal></RegisterModal>
                
            </Nav>
       
       
        let rightNav =
            <>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    {mobile}
                </Navbar.Collapse>
            </>
        let display = user ? rightNav : login;
        return (
            <div>
                <Navbar className="main-nav" bg="dark" variant="dark" expand="md">
                    <Navbar.Brand href="#home">Newercloud</Navbar.Brand>
                    {display}
                </Navbar>
            </div>
        )
    }


export default NavBar;
