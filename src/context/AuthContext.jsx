// import { createContext, useEffect, useState } from "react";
// import { auth,db } from "../firebase";
// import { onAuthStateChanged } from "firebase/auth";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true); // Added loading state

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => {
//       setLoading(false); // Set loading to false when auth state is determined
//       setCurrentUser(user);
//       console.log(user);
//       // console.log(user.role)
//       // console.log(currentUser.role)
//     });

//     return () => {
//       unsub();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser, loading }}> {/* Provide loading state */}
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase"; // Import Firestore
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, async (user) => {
  //     setLoading(false);

  //     if (user) {
  //       // Fetch additional user data from Firestore
  //       const userRef = doc(db, "users", user.uid);
  //       const userSnap = await getDoc(userRef);

  //       if (userSnap.exists()) {
  //         setCurrentUser({ ...user, ...userSnap.data() }); // Merge Firebase Auth and Firestore data
  //       } else {
  //         setCurrentUser(user);
  //       }
  //     } else {
  //       setCurrentUser(null);
  //     }
  //   });

  //   return () => {
  //     unsub();
  //   };
  // }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setLoading(true); // Ensure loading is set while fetching data

      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setCurrentUser((prevUser) => ({
              ...prevUser,
              ...user,
              ...userSnap.data(),
            }));
          } else {
            setCurrentUser(user);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setCurrentUser(null);
      }

      setLoading(false); // Ensure loading is set to false only after data is fetched
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
