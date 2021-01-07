import * as firebase from 'firebase';
import env from '../evn';
// import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from 'react-native-dotenv';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  // apiKey: "AIzaSyB59IJYjxzFJ8jFzaGp_FEpv3_BfOJaqSE",
  // authDomain: "reactnativetodo-40f18.firebaseapp.com",
  // projectId: "reactnativetodo-40f18",
  // storageBucket: "reactnativetodo-40f18.appspot.com",
  // messagingSenderId: "502549600890",
  // appId: "1:502549600890:web:fd08962ad998c5335879c3"
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID
};

firebase.initializeApp(firebaseConfig);

export default firebase;
