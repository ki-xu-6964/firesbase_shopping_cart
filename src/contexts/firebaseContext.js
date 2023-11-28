import React, { createContext, useContext } from 'react'
import { getAuth, Auth } from "firebase/auth";
import { auth } from "../firebase/firebase"
import { db } from '../component/firestore';
import { doc, setDoc, addDoc, collection } from "firebase/firestore"; 
import { useAuth } from './AuthContext';
import { useCarts } from './cartContext';
const fireContext = createContext();

export function useFire(){
    return useContext(fireContext)
}


export const FirebaseProvider = ({children}) => {
    const {uid} = useAuth();
  const {cart} = useCarts();


  async function addToUser() {
    try {
      await setDoc(doc(db, "shopping_cart", uid), {cart});
        console.log("Item added to user's cart!");
    } catch (error) {
        console.error("Error adding to user's cart: ", error);
    }
}

async function addToAnon() {
    try {
      await setDoc(doc(db, "anon_cart", uid), {cart});
        console.log("Item added to anonymous cart!");
    } catch (error) {
        console.error("Error adding to anonymous cart: ", error);
    }
}
  
  return (
    <fireContext.Provider value={{
      addToAnon,
      addToUser

    }}>
    {children}
    </fireContext.Provider>
  )
}
