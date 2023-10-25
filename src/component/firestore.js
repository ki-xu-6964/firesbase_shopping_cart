
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from '../firebase/firebase';
import firebase from "firebase/compat/app";
// Required for side-effects

const app = initializeApp(firebaseConfig);



// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);



