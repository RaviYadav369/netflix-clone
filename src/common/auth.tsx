// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { useState, useEffect, createContext, useContext } from "react";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4jyHDW0Zz7Q2XuNciuJNStSazFNd-508",
  authDomain: "netflix-clone-2a423.firebaseapp.com",
  projectId: "netflix-clone-2a423",
  storageBucket: "netflix-clone-2a423.appspot.com",
  messagingSenderId: "785694899981",
  appId: "1:785694899981:web:2e63517daf3f8e50b4fa44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

type AuthContextType = ReturnType<typeof userProvidAuth>;

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const auth = userProvidAuth();
  return <AuthContext.Provider value={auth}> {children} </AuthContext.Provider>;
};

function userProvidAuth() {
  const [user, setuser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setuser(user) : setuser(null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      setuser(user);
      return user;
    });
  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      setuser(user);
      return user;
    });

  const signOutUser = signOut(auth).then(() => setuser(null));
  return {
    signIn,
    signUp,
    signOut: signOutUser,
    user,
  };
}

export const useAuth = () => useContext(AuthContext) ?? {} as AuthContextType;
