import React, { createContext, useEffect, useState } from 'react';
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import app from '../../firebase/firebase.config';

export const AuthContext = createContext()

const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    // createUser with Email & Password
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // login 
    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // const LogOut = () => {
    //     return
    // }

    // onAuthStateChage
    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, [])

    // authInfo
    const authInfo = {
        createUser,
        logIn,
        user,
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;