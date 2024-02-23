import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import {
  getFirestore,
  onSnapshot,
  doc,
} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';

import {
  getAuth,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';

const db = getFirestore();
const auth = getAuth();

const Gym = () => {
  const navigate = useNavigate();

  const handleButtonClick = (navItem) => {
    console.log(`Button clicked: ${navItem}`);
  };

  return (
    <div className="flex">
      <Sidebar handleButtonClick={handleButtonClick} />
      <div className="w-80 h-screen" aria-hidden="true"></div>
      <div className="flex-1 p-6">
        <Header />
        <GymTiming />
      </div>
    </div>
  );
};

const GymTiming = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(null); // State for gym timings
  const [status, setStatus] = useState(null); // State for gym status

  const getTimings = async () => {
    console.log("get timing fn")
    try {
      const timingsDoc = doc(db, "gym-info", "timings");
      await onSnapshot(timingsDoc, (docsSnap) => {
        setTime(docsSnap.data()); // Set the state with timings data
      });
    } catch (e) {
      console.error('Error fetching gym timings:', e);
    }

    try {
      const statusDoc = doc(db, "gym-info", "functioning");
      await onSnapshot(statusDoc, (docsSnap) => {
        console.log(docsSnap.data());
        let gymStatus = docsSnap.data();
        console.log(gymStatus);
        setStatus(gymStatus); // Set the state with status data
      });
    } catch (e) {
      console.error('Error fetching gym status:', e);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("inside onAuthStateChanged");
      if (user) {
        getTimings();
      } else {
        navigate("/register");
      }
    });
  }, [navigate]);

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-2">Gym Timings:</h2>
      <h4>Morning - </h4>
      <p>Opening Time: {time && time.OT1}</p>
      <p>Closing Time: {time && time.CT1}</p>
      <h4>Evening - </h4>
      <p>Opening Time: {time && time.OT2}</p>
      <p>Closing Time: {time && time.CT2}</p>
      <p>Gym Status Today: {status && status.open ? 'Open' : 'Closed'}</p>
    </div>
  );
};

export default Gym;
