const router = require('express').Router();
const firebase = require('firebase/app');
require('firebase/database')

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

router.get('/:fromId/:toId', async(req, res, next) => {
    try {
        const { fromId } = req.params
        const { toId } = req.params
        firebaseDB.ref(`${fromId}-${toId}/chats`).once("value", snapshot => {
            let chats = [];
            snapshot.forEach(snap => {
                chats.push(snap.val());
            });
            res.send(chats) 
        });
    } catch (err) {
        console.log(err)
    }  
})

router.put('/:fromId/:toId', async(req, res, next) => {
    try {
        const { fromId } = req.params
        const { toId } = req.params
        const { message, timestamp, from, to } = req.body
        await firebaseDB.ref(`${fromId}-${toId}/chats`).push({
            message: message,
            timestamp: timestamp,
            from: from,
            to: to
        });
        await firebaseDB.ref(`${toId}-${fromId}/chats`).push({
            message: message,
            timestamp: timestamp,
            from: from,
            to: to
        });
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;