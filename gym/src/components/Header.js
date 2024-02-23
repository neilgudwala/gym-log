import React, { useState, useEffect } from 'react';


import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
  } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';
  
  import {
    getAuth,  // Corrected import
    onAuthStateChanged,
  } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';
  

const db = getFirestore();
const auth = getAuth();
let user, dbRef;
var username;

const Header = () => {


  const getUserData = async () => {
    user = auth.currentUser;
    username=user.displayName;
    console.log(username)
    dbRef = collection(db, 'users', user.uid, 'exercise-data');
  };

  

  onAuthStateChanged(auth, async (user) => {
    console.log(user)
    if (user) {
      getUserData();
      
      // alert('Logged In');
    } else {
      alert('Not logged in');
    }
  });
  
  return (
    
        
      
      <div className="flex-1 p-6">
      <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Workout Tracker</h1>
          <a href="#" className="flex items-center">
            {/* <img className="rounded-full h-10 w-10" src="https://placehold.co/100x100" alt="User profile image placeholder" /> */}
            <span className="ml-2">Hey {username}</span>
          </a>
        </div>
        </div>
        
  );
};

export default Header;
