// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDta3KnE3icXl8ZfJAjVsMj4rAMojYaw9Y",
  authDomain: "haewon-react-week2.firebaseapp.com",
  projectId: "haewon-react-week2",
  storageBucket: "haewon-react-week2.appspot.com",
  messagingSenderId: "1005452975989",
  appId: "1:1005452975989:web:710ef79ba5c3a917fa3d3c",
  measurementId: "G-WL79BCE7DR"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();