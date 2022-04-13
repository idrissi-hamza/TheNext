import firebase from 'firebase/app'
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBD8EdeJAVaOm4raw4QqksjIL0kKwNTCrs",
  authDomain: "thenext-app.firebaseapp.com",
  projectId: "thenext-app",
  storageBucket: "thenext-app.appspot.com",
  messagingSenderId: "628294668719",
  appId: "1:628294668719:web:79f3ae730e877bcce39f5a"
}; 


//init firebase
firebase.initializeApp(firebaseConfig);

//init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp
const timestamp=firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp};
