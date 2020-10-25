import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './Components/Navigation/navigation';
import Button from 'react-bootstrap/Button';
import LoginModal from './Components/LoginModal/loginModal';
import RegisterModal from './Components/RegisterModal/registerModal';
import ProfilePage from './Components/Profile/ProfilePage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Settings from './Components/Settings/settings';

function App() {
  return (
    <>
      <div className="App">
        <NavBar userName="Maui A" loggedIn={true}/>
        {/*<Track playing={false} />*/}
        <Router>
          <Route exact path='/profile' component={ProfilePage}/>
          <Route exact path='/settings' component={Settings}/>
        </Router>
      </div>
      
      <LoginModal />
      <RegisterModal />
    </>
  );
}

export default App;
