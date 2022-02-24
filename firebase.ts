import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyC0zhQ12P1FPlTC43gjRRKZlFVgwU5s8Y8",
  
    authDomain: "animal-pedia-62de3.firebaseapp.com",
  
    projectId: "animal-pedia-62de3",
  
    storageBucket: "animal-pedia-62de3.appspot.com",
  
    messagingSenderId: "512602881432",
  
    appId: "1:512602881432:web:a48a2a81166336a4c8ffed",
  
    measurementId: "G-QQXYVFC5WJ"
  
  };
  

let app: firebase.FirebaseApp;

if (firebase.getApps().length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.getApp();
}

const auth = getAuth(app);

export {auth, app}