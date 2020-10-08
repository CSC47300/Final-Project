import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyCMn7EzUCugYp2m64ix5GeiJxzKPa-RhmM",
    authDomain: "final-9b5a4.firebaseapp.com",
    databaseURL: "https://final-9b5a4.firebaseio.com",
    projectId: "final-9b5a4",
    storageBucket: "final-9b5a4.appspot.com",
    messagingSenderId: "798536415515",
    appId: "1:798536415515:web:998d8a661b7b9038097bbe"
});


let db = firebase.firestore()


export default {
  firebase, db
}