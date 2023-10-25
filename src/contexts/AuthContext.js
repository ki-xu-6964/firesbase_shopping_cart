import React, {useContext, useEffect, useState} from 'react'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase"

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

    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged(user=>{
          
            console.log("Authentication state changed:", user);
            setCurrentUser(user)
            if (user!=null){
            setUid(user.uid)
            
        };
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        log_in,
        uid
    }





  return (
    <AuthContext.Provider value={value}>        
    {!loading && children}
    </AuthContext.Provider>
  )
}
