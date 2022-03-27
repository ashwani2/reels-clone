import React, { useEffect } from "react";
import { auth } from "../firebase.js";
import {storage} from "../firebase.js"
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const AuthContext = React.createContext();

function AuthWrapper({ children }) {
  const [user, setUser] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user is "+user);
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
    setLoading(false);
  }, []);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    signOut(auth);
  }

  function forgot(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth,email,password);
  }

  const store = {
    login,
    user,
    logout,
    forgot,
    signup,
  };

  return (
    <AuthContext.Provider value={store}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthWrapper;
