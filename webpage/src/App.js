import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import testBootstrap from './Components/testBootstrap';
import NavBar from './Components/nav-bar';

function App() {
  return (
    <div className="App">
      <NavBar userName="Maui A"></NavBar>
    </div>
  );
}

export default App;
