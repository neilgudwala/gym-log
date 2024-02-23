// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4a-RNWwY-AdYhprXPkvCKJcshdcWze2w",
  authDomain: "fitcampus.firebaseapp.com",
  projectId: "fitcampus",
  storageBucket: "fitcampus.appspot.com",
  messagingSenderId: "847475516467",
  appId: "1:847475516467:web:eef90a3681dac548766f46"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export default firebaseConfig;
export { auth, collection, doc, setDoc, db };
