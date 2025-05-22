// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "insta-vid-e0e16.firebaseapp.com",
    projectId: "insta-vid-e0e16",
    storageBucket: "insta-vid-e0e16.firebasestorage.app",
    messagingSenderId: "678386724171",
    appId: "1:678386724171:web:5f675a743b208c62e14cce",
    measurementId: "G-KTD9NNQ4VT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)