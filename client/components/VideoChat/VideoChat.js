import React from 'react';

import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAgHuCxQ9X4dZ-732QncgW6LoBo7JppBtM",
    authDomain: "videochat-2d073.firebaseapp.com",
    projectId: "videochat-2d073",
    storageBucket: "videochat-2d073.appspot.com",
    messagingSenderId: "204956355660",
    appId: "1:204956355660:web:a6a8e7a3e4b7fa73b178e9"
  };
  
firebase.initializeApp(firebaseConfig);

const db = firebase.database().ref(); 


