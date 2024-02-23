import React, { useEffect } from 'react';
import { auth,db } from '../firebase';
import { Link } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

const FitCampusLogin = () => {
  useEffect(() => {
    const storeInput = (key, value) => localStorage.setItem(key, value);

    document.querySelectorAll('input').forEach((input) => {
      input.value = localStorage.getItem(input.name) || '';
      input.addEventListener('input', () => storeInput(input.name, input.value));
    });
  }, []);

  const logInClicked = async () => {
    const logInEmail = document.getElementById("loginID").value;
    const logInPassword = document.getElementById("password").value;
    await signInWithEmailAndPassword(auth, logInEmail, logInPassword)
      .then((userCredential) => {
        const user = auth.currentUser;
        console.log(user);
        alert("You have been Logged In.\nPlease refresh the page if you are not redirected");
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  const pwdBtnClicked = async () => {
    var resetEmail = document.getElementById("reset-email").value;

    await sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        alert("Password reset email sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  const logOutClicked = async () => {
    await signOut(auth);
  };

  return (
    <div className="bg-black text-white flex items-center justify-center flex-col h-screen">
        <h1 className="bg-gradient-to-r from-red to-yellow  text-[15vh] text-center">FitCampus</h1>
      <div className="w-full max-w-xs">
      
      
        <form className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            
            <div className="mb-6">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="loginID"
                type="text"
                placeholder="Login ID"
                name="loginID"
              />
            </div>
            <div className="mb-6">
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
              />
            </div>
            <div className="flex items-center justify-between">
            <Link to="/home"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={logInClicked}
          >
            LOGIN
          </Link>
              <a
                className="inline-block align-baseline font-bold text-sm text-yellow-500 hover:text-yellow-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            <div className="text-center my-4">
              <p className="text-gray-600">
                Haven't Signed up yet?
                <Link to="/register" href="#" className="text-yellow-500 hover:text-yellow-800">
                  Register
                </Link>
              </p>
            </div>
          </div>
          <div className="my-6 border-t border-gray-600"></div>
          <div className="flex items-center justify-center">
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default FitCampusLogin;
