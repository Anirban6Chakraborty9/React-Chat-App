import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain: "reactchatapp-1c72b.firebaseapp.com",
  projectId: "reactchatapp-1c72b",
  storageBucket: "reactchatapp-1c72b.appspot.com",
  messagingSenderId: "335445406975",
  appId: "1:335445406975:web:bf9dfd29d62ac7002ac8ca"
};

// console.log(firebase.auth);

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()