import React from 'react';
import './App.css';
import Upload from './Components/Upload/upload';
import Likes from './Components/Likes/likes';
import NavBar from './Components/Navigation/navigation.js';
import ProfilePage from './Components/Profile/ProfilePage';
import { BrowserRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import Settings from './Components/Settings/settings';
import History from './Components/ListenHistory/history';
import Feed from './Components/Feed/feed';



function App() {

  return (
    <>
      <div className="App">

        <BrowserRouter>
          <NavBar />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/upload' component={Upload} />
          <Route exact path='/likes' component={Likes} />
          <Route exact path='/history' component={History} />
          <Route path='/:profileName' component={ProfilePage} />
          <Route path='/' component={Feed} />
        </BrowserRouter>

      </div>
    </>
  );
}


export default App;
