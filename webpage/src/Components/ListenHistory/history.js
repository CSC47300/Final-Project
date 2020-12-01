import React, {useState,useEffect,useContext } from 'react';
import { createTrack, getElapsedTime } from '../../Helpers/helpers';
import Track from '../Track/track';
import { db } from '../../firebase';
import { UserContext } from '../../Providers/UserProvider';



const History = (props) => 
  {
   
    let user = useContext(UserContext);

  
    const [tracks, setTracks] = useState([]);
    const [history, setHistory] = useState([]);
  
    const getUserHistory = ()=> {
        let history = [];


        db.collection('user').where('userId', '==', uid).get().then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          //data.forEach(data => {
            
           // data.playedTracks
          })

    }

    const getUserTracks = () => {
      let tracks = [];
  
      //MAKE SURE TO CHANGE THIS LATER!!!!!!!!!
      
    }





  return(
    

    <div class="container w-55  shadow">
  
      <div class="row  m-2">  
              <h5>
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5z"/>
              </svg> Listening History 
              </h5>
            <div class = "container  border-top border-grey">
                 <div class="col">
                    {tracks}
                </div>
            </div>    
      </div>
    
    </div>
  
  );








};
export default History;