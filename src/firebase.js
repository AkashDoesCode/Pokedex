// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsncu40fe9O9sh0AwgcLzv2kymiS8OYVo",
  authDomain: "auth-34eb7.firebaseapp.com",
  projectId: "auth-34eb7",
  storageBucket: "auth-34eb7.appspot.com",
  messagingSenderId: "272910348253",
  appId: "1:272910348253:web:b4a3ade2ce46e738175034",
  measurementId: "G-VYP1BGB1J6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;