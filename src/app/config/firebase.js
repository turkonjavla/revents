import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDL8XpPtGz3cFuSS9BAOmTwFLTDS0K38wM",
  authDomain: "revents-237107.firebaseapp.com",
  databaseURL: "https://revents-237107.firebaseio.com",
  projectId: "revents-237107",
  storageBucket: "revents-237107.appspot.com",
  messagingSenderId: "16726407824"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;