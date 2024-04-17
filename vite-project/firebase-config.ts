// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAONTaeoWaAGddyRnjrEJb4T3koaQqKDNs",
  authDomain: "projjj-7bcf4.firebaseapp.com",
  projectId: "projjj-7bcf4",
  storageBucket: "projjj-7bcf4.appspot.com",
  messagingSenderId: "440971614567",
  appId: "1:440971614567:web:8e0c175a6fb9b5fccc77c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export{auth};