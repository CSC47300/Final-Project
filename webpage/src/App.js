import React, {useContext,Button} from 'react';
import './App.css';
import NavBar from './Components/Navigation/navigation.js';
import Track from './Components/Track/track';
import ProfilePage from './Components/Profile/ProfilePage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Settings from './Components/Settings/settings';


function App() {
     
    return (
      <>
          <div className="App">
            <NavBar />
              
              <Router>
                <Route exact path='/profile' component={ProfilePage}/>
                <Route exact path='/settings' component={Settings}/>
              </Router>
            {/*<Track
              isPlaying={this.state.isPlaying}
              likes="23"
              reposts="4"
              playCount={189}
              commentCount={8}
              songName="Not in it"
              artistName="Ganghojen"
              userName="MauiA"
              albumArt="https://i.imgur.com/p3vccAp.jpeg"
              timeFrame="15 hours"
              track="https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3"
              id="waveform-1"
              togglePlay={this.togglePlay}
            />*/}

          </div>
      </>
    );
  }


export default App;
