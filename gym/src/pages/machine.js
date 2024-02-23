import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  setDoc
} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';

import {
  getAuth,  // Corrected import
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';


const db = getFirestore();
const auth = getAuth();
var user, dbRef;
var availExercises=[];

const Machine = () => {
  const navigate = useNavigate();
  availExercises=[];

  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseInput, setExerciseInput] = useState('');
  const [weightInput, setWeightInput] = useState('');
  const [repsInput, setRepsInput] = useState('');
  const [setsInput, setSetsInput] = useState('');
  const [noteInput, setNoteInput] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      user = auth.currentUser;
      dbRef = collection(db, 'gym-data');
    };

    const exerciseList = document.getElementById("exerlist");
    const getExercises = async () => {
      exerciseList.innerHTML=''
      try {
        await onSnapshot(dbRef, (docsSnap) => {
          docsSnap.forEach((doc) => {
            const exercise = doc.data();
            console.log(exercise)
            exercise.id=doc.id;
            if(exercise.available==false)
            {const li=`<li>${exercise.id}</li>`;
            exerciseList.innerHTML += li;}
          });
          // setExerciseList(exercises);
        });
      } catch (err) {
        console.log('getExercises =' + err);
      }
    };

    
    console.log("yes")
    onAuthStateChanged(auth, async(user)=> {
      console.log("inside onAuthStateChanged")
      if(user){
          // alert("Logged In")
          getUserData();
          getExercises();
      }
      else{
         navigate("/register")
      }
    })
  }, []);

  

  const handleButtonClick = (navItem) => {
    // Handle the button click, e.g., change the content based on the navItem
    console.log(`Button clicked: ${navItem}`);
  };
  return (
    <div className="flex">
        <Sidebar handleButtonClick={handleButtonClick}/>
      <div className="w-80 h-screen " aria-hidden="true"></div>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Machine Availability</h1>
          <a href="#" className="flex items-center">
            <img className="rounded-full h-10 w-10" src="https://placehold.co/100x100" alt="User profile image placeholder" />
            <span className="ml-2">My Profile</span>
          </a>
        </div>
        <div className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">The following machines are unavailable today:</h2>
              <div className='machine-list'>
                <ol id='exerlist'>
                  <li>{availExercises}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Machine;