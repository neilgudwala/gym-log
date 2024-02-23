// Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faWalking, faUserCheck, faBowlFood } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  getFirestore,
} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';

import {
  getAuth,  // Corrected import
  onAuthStateChanged,
  signOut
} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js';


const db = getFirestore();

var user, dbRef;

function Sidebar({ handleButtonClick }) {
  const navigate = useNavigate();
  const auth = getAuth();
  const [activeNavItem, setActiveNavItem] = useState('home');
  const location = useLocation();

  useEffect(() => {
    // Update activeNavItem based on the current pathname
    const path = location.pathname;
    setActiveNavItem(getNavItemFromPath(path));
  }, [location.pathname]);

  onAuthStateChanged(auth,async(user)=>{
    if(user){

    }
    else{
      alert("please login to continue")
      navigate('/login')
    }
  })

  const getNavItemFromPath = (path) => {
    // Map the pathname to the corresponding navItem
    switch (path) {
      case '/home':
        return 'home';
      case '/friends':
        return 'friends';
      case '/pedometer':
        return 'pedometer';
      case '/nutrition':
        return 'nutrition';
      case '/machine':
        return 'machine';
      case '/workout':
        return 'workout';
      case '/gym':
        return 'gym';
      
      default:
        return 'home';
    }
  };

  const handleNavButtonClick = (navItem) => {
    setActiveNavItem(navItem);
    handleButtonClick(navItem);
  };

  const signOutClicked = async () => {
    try {
      console.log("sign out clicked");
      await signOut(auth);
      navigate("/login")
      // Redirect or perform other actions after sign-out
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className="sidebar absolute left-0 w-64 flex flex-col bg-gray-900 shadow-lg">
      {/* Logo and nav */}
      <div className="px-5 py-4">
        <div className="text-white text-4xl font-extrabold mb-10 text-white-500">
          FitCampus
        </div>
        <nav className="flex flex-col">
          <Link to="/home"
            className={`nav-button mb-6 flex items-center focus:outline-none ${activeNavItem === 'home' ? 'bg-yellow-500' : 'bg-black-800'}`}
            onClick={() => handleNavButtonClick('home')}
          >
            <FontAwesomeIcon icon={faHome} className="mr-6 text-black-500" />
            Home
          </Link>
          <Link to="/friends"
            className={`nav-button mb-6 flex items-center focus:outline-none ${activeNavItem === 'friends' ? 'bg-yellow-500' : 'bg-black-800'}`}
            onClick={() => handleNavButtonClick('friends')}
          >
            <FontAwesomeIcon icon={faUserFriends} className="mr-6 text-black-500" />
            My Friends
          </Link>
          <Link to="/pedometer"
            className={`nav-button mb-6 flex items-center focus:outline-none ${activeNavItem === 'pedometer' ? 'bg-yellow-500' : 'bg-black-800'}`}
            onClick={() => handleNavButtonClick('pedometer')}
          >
            <FontAwesomeIcon icon={faWalking} className="mr-9 text-black-500" />
            Pedometer
          </Link>
          <Link to="/nutrition"
            className={`nav-button mb-6 flex items-center focus:outline-none ${activeNavItem === 'nutrition' ? 'bg-yellow-500' : 'bg-black-800'}`}
            onClick={() => handleNavButtonClick('nutrition')}
          >
            <FontAwesomeIcon icon={faBowlFood} className="mr-9 text-black-500" />
            Nutrition Tracker
          </Link>
          <Link to="/machine"
            className={`nav-button mb-6 flex items-center focus:outline-none ${activeNavItem === 'machine' ? 'bg-yellow-500' : 'bg-black-800'}`}
            onClick={() => handleNavButtonClick('machine')}
          >
            <FontAwesomeIcon icon={faWalking} className="mr-9 text-black-500" />
            Machine Availability
          </Link>
          <Link to="/workout"
            className={`nav-button mb-6 flex items-center focus:outline-none ${activeNavItem === 'workout' ? 'bg-yellow-500' : 'bg-black-800'}`}
            onClick={() => handleNavButtonClick('workout')}
          >
            <FontAwesomeIcon icon={faWalking} className="mr-9 text-black-500" />
            Workout Routine
          </Link>
          <Link to="/gym" className={`nav-button mb-6 flex items-center focus:outline-none ${activeNavItem === 'gym' ? 'bg-yellow-500' : 'bg-black-800'}`} onClick={() => handleNavButtonClick('gym')}>
  <FontAwesomeIcon icon={faWalking} className="mr-9 text-black-500" />
  Gym Timings
</Link>
          

        </nav>
      </div>
      <div className="mt-auto px-5 py-1 bg-gray-700 flex items-center justify-between">
        <div>
          <button className="create-account-button text-white py-1 px-4 rounded" onClick={signOutClicked}>
            Log Out
          </button>
        </div>
        <div>
          <FontAwesomeIcon icon={faUserCheck} className="text-white text-2xl" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
