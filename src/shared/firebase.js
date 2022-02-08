import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/database";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA6szuYKIEVBwUyZwAbzB2zIdKBbkgDaKg",
    authDomain: "assignment-week3.firebaseapp.com",
    projectId: "assignment-week3",
    storageBucket: "assignment-week3.appspot.com",
    messagingSenderId: "580580580584",
    appId: "1:580580580584:web:84c14766baba6d9f733d5d",
    measurementId: "G-904DQCDD4W"
};

firebase.initializeApp(firebaseConfig);
const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const database = firebase.database();
const db = getFirestore();


export {auth, apiKey, firestore, storage, database, db};
