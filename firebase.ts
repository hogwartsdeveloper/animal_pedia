import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBy5MCn7_p1SNfVAAapBThdlipoJbQp8I0",
    authDomain: "animal-pedia-fc1fe.firebaseapp.com",
    projectId: "animal-pedia-fc1fe",
    storageBucket: "animal-pedia-fc1fe.appspot.com",
    messagingSenderId: "697458469709",
    appId: "1:697458469709:web:2edc2ba3735d01ae31a504",
    measurementId: "G-Z6H6S38QKB"
};

let app: firebase.FirebaseApp;

if (firebase.getApps().length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.getApp();
}

const auth = getAuth(app);

export {auth, app}