import React from 'react';
import './App.css';
import NavBar from './Components/Navigation/navigation';
import { Component } from 'react';
import UserProvider from "./Providers/UserProvider";
import Track from './Components/Track/track';
import ProfilePage from './Components/Profile/ProfilePage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Settings from './Components/Settings/settings';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: true,
      isPlaying: false,
      currentlyPlaying: "",
      userName: "Maui A"
    }

    this.togglePlay = this.togglePlay.bind(this);
  }

  login(userName, isLoggedIn) {
    this.setState({
      isLoggedIn: isLoggedIn,
      userName: userName
    })
  }

  togglePlay() {
    let newState = !this.state.isPlaying;
    this.setState({
      isPlaying: newState
    });
  }

  render() {
    return (
      <>
        <UserProvider>
          <div className="App">

            <NavBar {...this.state} action={this.login} />
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

        </UserProvider>
      </>
    );
  }

}

export default App;
