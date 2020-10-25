import React from 'react';
import './App.css';
import NavBar from './Components/Navigation/navigation';
import { Component} from 'react';
import UserProvider from "./Providers/UserProvider";





class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      isLoggedIn : false,
    }
  }

  login(userName, isLoggedIn){
    this.setState({
      isLoggedIn : isLoggedIn,
      userName : userName
    })
  }
  
  render() {
    return(
    <>
        <UserProvider>
          <div className="App">
            
            <NavBar {...this.state} action = {this.login} />
          
          </div>
          
        </UserProvider>
    </>
  );
}

}

export default App;
