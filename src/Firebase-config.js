import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_FIREBASE_APIKEY),
  authDomain: String(import.meta.env.VITE_FIREBASE_AUTHDOMAIN),
  projectId: String(import.meta.env.VITE_FIREBASE_PROJECTID),
  storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGEBUCKET),
  messagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID),
  appId: String(import.meta.env.VITE_FIREBASE_APPID),
  measurementId: String(import.meta.env.VITE_FIREBASE_MEASUREMENTID)
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app)

export const provider = new GoogleAuthProvider()