import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBPcyj-ktOPQExVHmrBMq1oeMlIEaBruFQ",
    authDomain: "nutrired-2.firebaseapp.com",
    databaseURL: "https://nutrired-2.firebaseio.com",
    projectId: "nutrired-2",
    storageBucket: "nutrired-2.appspot.com",
    messagingSenderId: "439770611748"
  };
  firebase.initializeApp(config);

  if(!firebase.apps.length){
    firebase.initializeApp(config);
  }
  const db = firebase.database();
  const auth = firebase.auth();
  var storage = firebase.storage();

  export {
    db,
    auth,
    storage
  }
 
