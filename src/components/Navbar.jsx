import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      
      <div className="user">
        {currentUser && (
          <>
            <img src={currentUser.photoURL || "/avatars/Avatar1.jpg"} alt="User Avatar" className="user-avatar" />
            <span>{currentUser.displayName}</span>
            
          </>
        )}
      </div>
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
};

export default Navbar;