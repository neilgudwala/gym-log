// src/components/FitCampusProfileSetup.js
import React, { useState } from 'react';
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





const FitCampusProfileSetup = () => {
  user=auth.currentUser;
  console.log(user)
  const navigate = useNavigate();
  console.log("yes")
  onAuthStateChanged(auth, async(user)=> {
    console.log("inside onAuthStateChanged")
    if(user){
        // alert("Logged In")
    }
    else{
       navigate("/register")
    }
  })

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [age, setAge] = useState(20);
  const [gender, setGender] = useState('male');

  const handleSliderChange = (event) => {
    setAge(parseInt(event.target.value, 10));
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('Weight:', weight);
    console.log('Height:', height);
    console.log('Goal Weight:', goalWeight);
    console.log('Age:', age);
    console.log('Gender:', gender);
    
    try{
      await setDoc(doc(db, "users", user.uid,"information","health-info"),{
        weight: weight,
        height:height,
        age: age,
        gender:gender,
        goal_weight:goalWeight
      })
      alert("Your health information has been updated successfully");
      navigate('/home');
    }
    catch(e){
      alert(e);
    }

    // Add your logic for form submission or navigation here
  };

  return (
    <div className="bg-black text-white flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <form className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="block text-white text-5xl text-center mb-6">FitCampus</h1>
          <p className="text-yellow-500 text-lg text-center mb-4">Please enter your Details</p>
          <div className="mb-4">
            <label className="block text-yellow-500 text-sm font-bold mb-2" htmlFor="weight">Weight</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="weight"
              type="text"
              placeholder="62.5"
              name="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-yellow-500 text-sm font-bold mb-2" htmlFor="height">Height</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="height"
              type="text"
              placeholder="175.5"
              name="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-yellow-500 text-sm font-bold mb-2" htmlFor="goalWeight">Goal Weight</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="goalWeight"
              type="text"
              placeholder="68.5"
              name="goalWeight"
              value={goalWeight}
              onChange={(e) => setGoalWeight(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="flex justify-between items-center">
              <span className="text-yellow-500 text-sm font-bold">Age</span>
              <span id="ageValue" className="text-yellow-500">{age}</span>
            </label>
            <input
              className="slider"
              style={{ width: '100%' }}
              id="ageSlider"
              type="range"
              name="age"
              min="10"
              max="100"
              value={age}
              onChange={handleSliderChange}
            />
          </div>
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-yellow-500"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={handleGenderChange}
              />
              <span className="ml-2 text-yellow-500">Male</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                className="form-radio text-yellow-500"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={handleGenderChange}
              />
              <span className="ml-2 text-yellow-500">Female</span>
            </label>
          </div>
          <div className="flex items-center justify-center">
            <button onClick={handleSubmit}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FitCampusProfileSetup;