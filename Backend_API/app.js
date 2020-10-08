const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const port = process.env.PORT || 3200;

//Firebase
const admin = require('firebase-admin');
const serviceAccount = require('./keys/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)});
const db = admin.firestore();
//End Firebase

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`running at port ${port}`);
});

//test example listener
const observer = db.collection('Userprofile')
  .onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        console.log('New city: ', change.doc.data());
      }
      if (change.type === 'modified') {
        console.log('Modified city: ', change.doc.data());
      }
      if (change.type === 'removed') {
        console.log('Removed city: ', change.doc.data());
      }
    });
  });