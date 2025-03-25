import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoading(false); // Set loading to false when auth state is determined
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return ( 
    <AuthContext.Provider value={{ currentUser, loading }}> {/* Provide loading state */}
      {children}
    </AuthContext.Provider>
  );
};
