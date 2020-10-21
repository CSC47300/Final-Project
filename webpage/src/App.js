import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './Components/Navigation/navigation';
import Button from 'react-bootstrap/Button';
import LoginModal from './Components/LoginModal/loginModal';
import RegisterModal from './Components/RegisterModal/registerModal';
import Upload from './Components/Upload-Page/upload';

function App() {
  return (
    <>
      <div className="App">
        <NavBar userName="Maui A" />
      
      </div>
      <Upload/>
    </>
  );
}

export default App;
