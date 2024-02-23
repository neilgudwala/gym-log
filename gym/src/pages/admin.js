import React, { useState, useEffect } from 'react';
import {getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, setDoc} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"
import{ getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
const db = getFirestore();
const auth = getAuth();
var user, dbRef;


function GymAdminPage() {
    const [openTimes, setOpenTimes] = useState(['']);
    const [closeTimes, setCloseTimes] = useState(['']);
    const [machineName, setMachineName] = useState('');
    const [selectedMachine, setSelectedMachine] = useState('');
    const [machines, setMachines] = useState([]);
  
    useEffect(() => {
      const auth = getAuth();
      const dbRef = collection(db, "gym-data");
  
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          alert("Logged In");
          getMachines();
        } else {
          // Handle when the user is not logged in
        }
      });
  
      return () => unsubscribe(); // Cleanup the subscription when the component unmounts
    }, []);
  
    const getMachines = async () => {
      try {
        const machinesSnapshot = await onSnapshot(collection(db, "gym-data"), (docsSnap) => {
          const machinesArray = docsSnap.docs.map((doc) => {
            const machine = doc.data();
            machine.name = doc.id;
            return machine;
          });
          setMachines(machinesArray);
        });
      } catch (err) {
        console.error("getMachines =", err);
      }
    };
  
    const addMachine = async () => {
      try {
        await setDoc(doc(collection(db, "gym-data"), machineName), {
          available: true,
        });
        alert("New machine added");
        setMachineName('');
      } catch (e) {
        alert(e.message);
      }
    };
  
    const makeMachineUnavailable = async () => {
      try {
        await updateDoc(doc(collection(db, "gym-data"), selectedMachine), {
          available: false,
        });
        alert("Machine made unavailable");
        setSelectedMachine('');
      } catch (e) {
        alert(e.message);
      }
    };
  
    const handleAddMachine = (e) => {
      e.preventDefault();
      addMachine();
    };
  
    const handleUnavailableMachine = (e) => {
      e.preventDefault();
      makeMachineUnavailable();
    };
  
    const handleSetTimings = (e) => {
      e.preventDefault();
      // Add code to handle setting gym timings
    };
  
    const handleAddTimeSlot = () => {
      setOpenTimes([...openTimes, '']);
      setCloseTimes([...closeTimes, '']);
    };
  
    const handleGymClosed = () => {
      // Add code to handle gym closed settings
    };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f4f4f4', textAlign: 'center' }}>
      <h1 style={{ color: '#333' }}>Gym Admin Dashboard</h1>

      {/* Form for adding machines */}
      <div style={{ margin: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <h2>Add Gym Machine/ Update Availability</h2>
        <form onSubmit={handleAddMachine}>
          <label htmlFor="machine-name">Machine Name:</label>
          <input type="text" id="machine-name" name="machineName" /><br /><br />
          <button type="submit" className="add-machine-btn">Add Machine</button>
        </form>
      </div>

      {/* Form for making a machine unavailable */}
      <div style={{ margin: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <h2>Make Machine Unavailable</h2>
        <form onSubmit={handleUnavailableMachine}>
          <label htmlFor="unavail-machine">Select Machine:</label>
          <select list="machines" id="unavail-machine">
            <option value="" disabled selected>Select your option</option>
            {/* {populateMachineDropdown()} */}
          </select><br /><br />
          <button type="submit">Make Unavailable</button>
        </form>
      </div>

      {/* Form for setting gym timings */}
      <div style={{ margin: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <h2>Set Gym Timings</h2>
        <form onSubmit={handleSetTimings}>
          <div id="timeSlots">
            {openTimes.map((_, index) => (
              <div key={index} className="timeSlot">
                <label>Open Time:</label>
                <input
                  type="time"
                  name={`openTime[${index}]`}
                  value={openTimes[index]}
                  onChange={(e) => {
                    const newOpenTimes = [...openTimes];
                    newOpenTimes[index] = e.target.value;
                    setOpenTimes(newOpenTimes);
                  }}
                /><br /><br />
                <label>Close Time:</label>
                <input
                  type="time"
                  name={`closeTime[${index}]`}
                  value={closeTimes[index]}
                  onChange={(e) => {
                    const newCloseTimes = [...closeTimes];
                    newCloseTimes[index] = e.target.value;
                    setCloseTimes(newCloseTimes);
                  }}
                /><br /><br />
              </div>
            ))}
          </div>
          <button type="button" onClick={handleAddTimeSlot}>Add Another Time Slot</button><br /><br />
          <button type="submit">Set Timings</button>
        </form>
      </div>

      {/* Button for Gym Closed Settings */}
      <div style={{ margin: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <h2>Gym Closed Settings</h2>
        <button onClick={handleGymClosed}>Mark Gym as Closed</button>
      </div>
    </div>
  );
};

export default GymAdminPage;
