import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './Components/navigation';
import Track from './Components/track';

function App() {
  return (
    <div className="App">
      <NavBar userName="Maui A" />
      <Track playing={false} />
    </div>
  );
}

export default App;
