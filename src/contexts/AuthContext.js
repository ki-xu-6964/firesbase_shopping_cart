import React, {useContext, useEffect, useState} from 'react'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged,signInWithEmailAndPassword, signOut,signInAnonymously } from "firebase/auth";
import { auth } from "../firebase/firebase"
import { CartProvider, useCarts } from './cartContext';
const AuthContext = React.createContext()

export  function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider( {children} ) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [uid, setUid] = useState();



    function signup(email, password) {
        console.log("Signup called with email:", email, "and password:", password);
        return createUserWithEmailAndPassword(auth, email, password)
        
    }

    function log_in(email, password){      
        return signInWithEmailAndPassword(auth, email, password)
   
        
    }

    async function log_anon(){
        console.log("anon user signed up");
        const userCredential = await signInAnonymously(auth);
        const user = userCredential.user;
        console.log(user.uid); 
      
    }

     function logout(){
       try{signOut(auth)
           //setUid(null)
          console.log('signed out!' + uid)
       }catch(error){
          console.log(error)
        }
        console.log(uid)
      }

    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged(user=>{
          
            console.log("Authentication state changed:", user);
            
            setCurrentUser(user)
            if (user!=null){
            setUid(user.uid)
            
        }
        if (user==null){
          console.log('uid is null')
        }
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        log_in,
        log_anon,
        uid,
        logout
    }





  return (
    <AuthContext.Provider value={value}>        
    {!loading && children}
    </AuthContext.Provider>
  )
  }
