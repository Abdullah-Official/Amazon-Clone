import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6YzJL8Reke4KNs8kRTIrDFqdMJaTGLbA",
  authDomain: "amzn-clone-24ccc.firebaseapp.com",
  projectId: "amzn-clone-24ccc",
  storageBucket: "amzn-clone-24ccc.appspot.com",
  messagingSenderId: "829594495671",
  appId: "1:829594495671:web:3334fe610d021bab04fb32",
  measurementId: "G-R91KN1KVD8",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();


const db = app.firestore();

export default db;