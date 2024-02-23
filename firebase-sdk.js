// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import{ getAuth } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4a-RNWwY-AdYhprXPkvCKJcshdcWze2w",
  authDomain: "fitcampus.firebaseapp.com",
  projectId: "fitcampus",
  storageBucket: "fitcampus.appspot.com",
  messagingSenderId: "847475516467",
  appId: "1:847475516467:web:eef90a3681dac548766f46"
};

console.log("running firebase sdk");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const auth = getAuth(app);
