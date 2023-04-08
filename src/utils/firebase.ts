// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoNAw7ZFgkwcq_P-3evf3RGLxd21NBQ5Y",
  authDomain: "teal-3c480.firebaseapp.com",
  projectId: "teal-3c480",
  storageBucket: "teal-3c480.appspot.com",
  messagingSenderId: "891499848815",
  appId: "1:891499848815:web:d701c97fc19ec1bb27999a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
