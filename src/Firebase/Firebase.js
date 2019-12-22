import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyA8eOxRs8HHqG2d-y_nte3OJTuxtsaQXLM",
    authDomain: "slackreplic.firebaseapp.com",
    databaseURL: "https://slackreplic.firebaseio.com",
    projectId: "slackreplic",
    storageBucket: "slackreplic.appspot.com",
    messagingSenderId: "308021412352"
};

firebase.initializeApp(config);

export default firebase;