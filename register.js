console.log("running registration.js");
import{ getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import {getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, setDoc} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"

const db = getFirestore();
const auth = getAuth();
console.log(auth);
console.log("post imports")

const signUpBtn = document.getElementById("signup-btn")

document.getElementById("signup-form").addEventListener("submit", (e)=> {
    e.preventDefault()
})

const signUpClicked = async()=>{
    console.log("sign-up clicked")
    var signUpEmail= document.getElementById("signup-email").value;
    var signUpPassword = document.getElementById("signup-password").value;
    var name = document.getElementById("name").value;
    await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
    .then((userCredential)=>{
        const user=auth.currentUser
        updateProfile(user, {
            displayName: name,
          });
        const ref = doc(db, 'users', user.uid, "information","auth");
        const docRef = setDoc(ref,{
            uid: user.uid,
            email : user.email,
            password: signUpPassword,
            name: name,
            creationTime: Date()
        });
        console.log(user)
        
        // sendEmailVerification(user)
        // .then(()=>{
        //     alert("Email Verification link sent.\nPlease verify your email before signing in.")
        //     // location.replace("login.html")
        // })
        // .catch((error=>{
        //     alert(error)
        // }))
        
        
    })
    .catch((error=>{
        console.log(error)
        alert(error)
    }))
}

signUpBtn.addEventListener("click", signUpClicked)