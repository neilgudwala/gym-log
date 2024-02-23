import {getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, setDoc} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js"
const db = getFirestore();
var status;

const addMachineBtn = document.getElementById("add-machine-btn");
const remMachineBtn = document.getElementById("make-unavail-btn");
const setTimeBtn = document.getElementById("set-timing");
const gymCloseBtn = document.getElementById("gymClosed");
console.log("running admin")

window.onload=function(){
  getMachines();
}

const dropList = document.getElementById("unavail-machine");
const gymStatus = document.getElementById("gym-status");
console.log(gymStatus)
const getMachines = async()=>{
  try{
    dropList.innerHTML='';
    await onSnapshot(collection(db,"gym-data"),docsSnap=>{
      docsSnap.forEach((doc) => {
        const machine= doc.data();
        machine.id=doc.id;
        const option=`<option>${machine.id}</option>`;
       dropList.innerHTML+=option 
    });
    })
  }
  catch(e){
    console.log(e)
  }
  try{
    gymStatus.innerHTML=''
    await onSnapshot(doc(db,"gym-info","functioning"),docsSnap=>{
        console.log(docsSnap)
        status= docsSnap.data();
        console.log(status)
        if(status.open==true){
            gymStatus.innerHTML=`<h2>Gym Closed Settings (CurrentStatus:OPEN)</h2>`
        }
        else{
            gymStatus.innerHTML=`<h2>Gym Closed Settings (CurrentStatus:CLOSED)</h2>`
        }
        
        // machine.id=doc.id;
        // const option=<option>${machine.id}</option>
    //    dropList.innerHTML+=option 
    });
    }
  
  catch(e){
    console.log(e)
  }
}
const addMachineClicked = async()=>{
  console.log("add machine clicked")
  const machineName = document.getElementById('machine-name').value;
  console.log(machineName)
  try{
    await setDoc(doc(db,"gym-data",machineName),{
      available:true
    });
  alert("machine added successfully")
  }
    catch(e){
      console.log(e)
      alert(e)
    }
  }

  const remMachBtnClicked = async()=>{
    const remMach = document.getElementById("unavail-machine").value;
    try{
      await setDoc(doc(db,"gym-data",remMach),{
        available:false
      });
    alert("machine updated successfully")
    }
      catch(e){
        console.log(e)
        alert(e)
      }
    }

    const setTimeClicked = async()=>{
      console.log("set time clicked")
      const ot1 = document.getElementById('ot1').value;
      const ot2 = document.getElementById('ot2').value;
      const ct1 = document.getElementById('ct1').value;
      const ct2 = document.getElementById('ct2').value;
      try{
        await setDoc(doc(db,"gym-info","timings"),{
          OT1:ot1,
          OT2:ot2,
          CT1:ct1,
          CT2:ct2
        });
      alert("timings updated successfully")
      }
        catch(e){
          console.log(e)
          alert(e)
        }
    }

    const gymCloseClicked = async()=>{
      console.log("gym-close click")
      console.log(status)
      try{
        await setDoc(doc(db,"gym-info","functioning"),{
          open: !status.open
        });
      alert("Gym Status updated successfully")
      }
        catch(e){
          console.log(e)
          alert(e)
        }
    }
    
  


  addMachineBtn.addEventListener("click",addMachineClicked)
  remMachineBtn.addEventListener("click",remMachBtnClicked)
  setTimeBtn.addEventListener("click",setTimeClicked)
  gymCloseBtn.addEventListener("click",gymCloseClicked)