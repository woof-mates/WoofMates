import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyDZUsDKQ79fy2TRZJWfmiprYqHUdizGLlo',
    authDomain: 'dog-chat-74ccf.firebaseapp.com',
    databaseURL: 'https://dog-chat-74ccf.firebaseio.com',
    projectId: 'dog-chat-74ccf',
    storageBucket: 'dog-chat-74ccf.appspot.com',
    messagingSenderId: '391829997647',
    appId: '1:391829997647:web:d5de6332d455f8c3ab823a'
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();

export default firebaseDB;