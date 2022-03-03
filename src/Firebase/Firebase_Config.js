// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

  authDomain: "hangman-game-with-react.firebaseapp.com",

  projectId: "hangman-game-with-react",

  storageBucket: "hangman-game-with-react.appspot.com",

  messagingSenderId: "836415057159",

  appId: process.env.REACT_APP_FIREBASE_APP_ID


};


// Initialize Firebase

const firestore = initializeApp(firebaseConfig);

export {firestore}