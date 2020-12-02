import React, { useContext } from 'react';
import './App.css';
import Upload from './Components/Upload/upload';
import Likes from './Components/Likes/likes';
import NavBar from './Components/Navigation/navigation.js';
import ProfilePage from './Components/Profile/ProfilePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Settings from './Components/Settings/settings';
import History from './Components/ListenHistory/history';
import Feed from './Components/Feed/feed';
import { UserContext } from './Providers/UserProvider';
import NotFound from './Components/NotFound';


function App() {
  const user = useContext(UserContext);
  
  return (
    <>
      <div className="App">

        <Router>
          <NavBar />
          <Switch>
            <Route exact path='/settings' component={Settings} />
            <Route exact path='/upload' component={Upload} />
            <Route exact path='/likes' component={Likes} />
            <Route exact path='/history' component={History} />
            <Route path='/:profileName' component={ProfilePage}/>
            <Route exact path='/404' component={NotFound} />
            <Route path='/'>
              <Feed user={user} />
            </Route>
          </Switch>
        </Router>

      </div>
    </>
  );
}


export default App;
