import React from 'react';
import './App.css';
import Upload from './Components/Upload/upload';
import Likes from './Components/Likes/likes';
import NavBar from './Components/Navigation/navigation.js';
import ProfilePage from './Components/Profile/ProfilePage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Settings from './Components/Settings/settings';
import History from './Components/ListenHistory/history';
import Feed from './Components/Feed/feed';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function App() {

  return (
    <>
      <div className="App">
        <NavBar />

        <Router>

          <Route exact path='/settings' component={Settings} />
          <Route exact path='/upload' component={Upload} />
          <Route exact path='/likes' component={Likes} />
          <Route exact path='/history' component={History} />
          <Route path='/:profileName' component={ProfilePage} />
          <Route path='/' component={Feed} />
        </Router>
        
        <AudioPlayer
          autoPlay
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            onPlay={e => console.log("onPlay")}
            // other props here if needed
        />
      </div>
    </>
  );
}


export default App;
