import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate , Link} from "react-router-dom";

// Sample avatar images
const avatarOptions = [
  "/avatars/Avatar1.jpg",
  "/avatars/Avatar2.jpg",
  "/avatars/Avatar3.jpg",
  "/avatars/Avatar4.jpg",
  "/avatars/Avatar5.jpg",
  "/avatars/Avatar6.jpg",
  "/avatars/Avatar7.jpg",
  "/avatars/Avatar8.jpg",
  "/avatars/Avatar9.jpg",
  "/avatars/Avatar10.jpg",
];


const Register = () => {
  const [avatar, setAvatar] = useState(null);
  const [showAvatarSelection, setShowAvatarSelection] = useState(false);
  const [err, setErr] = useState(false); // Added error state
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    setShowAvatarSelection(!showAvatarSelection);
  };

  const handleSelectAvatar = (selectedAvatar) => {
    setAvatar(selectedAvatar);
    setShowAvatarSelection(false);
  };

    const handleSubmit = async (e) => {
        // console.log("Selected Avatar:", avatar); // Log the selected avatar

    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, {
        displayName: username,
        photoURL: avatar || "/avatars/Avatar1.jpg",
      });

      await setDoc(doc(db, "users", res.user.uid), {
        role: "user", // Add this line to assign the role

        uid: res.user.uid,
        displayName: username,
        email,
        photoURL: avatar || "/avatars/Avatar1.jpg",
      });
      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");
    } catch (error) {
      console.log(err);
      setErr(true); // Set error state on failure
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Hope Buddy</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="User Id" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          {/* Avatar Selection UI */}
          <div className="avatar-selection-container">
            <span className="avatar-text">Select Your Avatar:</span>
            <div className="avatar-container" onClick={handleAvatarClick}>
              <img src={avatar || "/avatars/Avatar1.jpg"} alt="Avatar" className="avatar-preview" />
            </div>
          </div>

          {showAvatarSelection && (
            <div className="avatar-selection">
              {avatarOptions.map((av, index) => (
                <img key={index} src={av} alt={`Avatar ${index}`} className="avatar-option" onClick={() => handleSelectAvatar(av)} />
              ))}
            </div>
          )}

          <button type="submit">Sign Up</button>
          {err && <span>Something Went Wrong</span>}
        </form>
        <p>Already have an account? <Link to="/login"style={{ color: 'red' }}>Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
