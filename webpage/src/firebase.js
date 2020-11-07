import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";



var firebaseConfig = {
    apiKey: "AIzaSyCLam-q3MPZgOwRNotNi5zl6I8gi_7xmgM",
    authDomain: "musaic-69ec1.firebaseapp.com",
    databaseURL: "https://musaic-69ec1.firebaseio.com",
    projectId: "musaic-69ec1",
    storageBucket: "musaic-69ec1.appspot.com",
    messagingSenderId: "992998748729",
    appId: "1:992998748729:web:32a328e7f2241501c093e8",
    measurementId: "G-RJF27MYZQZ"
  };

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();



export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
  
    const userRef = db.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
  
    if (!snapshot.exists) {
      const { email, displayName, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };
  
  export const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await db.doc(`users/${uid}`).get();
  
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };

  export const signOut = () => {
    firebase.auth().signOut().then(function() {
        console.log('signedOut')
      }).catch(function(error) {
        // An error happened.
      });
  }