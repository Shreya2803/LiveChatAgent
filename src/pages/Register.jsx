import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, getDoc, updateDoc , serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const userCountDoc = await getDoc(doc(db, "meta", "userCount"));
        let userCount = userCountDoc.exists() ? userCountDoc.data().count : 0;

        // If the document does not exist, create it with an initial count of 1
        if (!userCountDoc.exists()) {
          await setDoc(doc(db, "meta", "userCount"), { count: 1 });
          userCount = 1; // Set userCount to 1 since we just created it
        } else {
          // Increment user count for the new user
          userCount += 1;
        }

        const newUserId = `user${userCount}`;
        const newEmail = `${newUserId}@gmail.com`;
        const newPassword = `${newUserId}@123`;

        setUserId(newUserId);
        setEmail(newEmail);
        setPassword(newPassword);

        // Update the user count in Firestore
        await updateDoc(doc(db, "meta", "userCount"), { count: userCount });
      } catch (error) {
        console.error("Error fetching user count:", error);
        setErr(true);
      }
    };

    fetchUserCount();
  }, []);

  const handleAvatarClick = () => {
    setShowAvatarSelection(!showAvatarSelection);
  };

  const handleSelectAvatar = (selectedAvatar) => {
    setAvatar(selectedAvatar);
    setShowAvatarSelection(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, {
        displayName: userId,
        photoURL: avatar || "/avatars/Avatar1.jpg",
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: userId,
        email,
        photoURL: avatar || "/avatars/Avatar1.jpg",
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});

      // Add HopeBuddy to the user's chats
      const hopeBuddyUid = "61cLLi3ci2PElVffvITtbsfRFc03";
    const chatId = res.user.uid > hopeBuddyUid ? `${res.user.uid}${hopeBuddyUid}` : `${hopeBuddyUid}${res.user.uid}`;

    // Create a chat document in the "chats" collection
    await setDoc(doc(db, "chats", chatId), {
      messages: [],
      participants: [
        {
          uid: res.user.uid,
          displayName: userId,
          photoURL: avatar || "/avatars/Avatar1.jpg",
        },
        {
          uid: hopeBuddyUid,
          displayName: "HopeBuddy",
          photoURL: "/avatars/ChatbotAdmin.jpg",
        },
      ],
    });

    // Update userChats for both users
    await updateDoc(doc(db, "userChats", res.user.uid), {
      [chatId]: {
        userInfo: {
          uid: hopeBuddyUid,
          displayName: "HopeBuddy",
          photoURL: "/avatars/ChatbotAdmin.jpg",
        },
        lastMessage: {
          text: "You're safe here.How can I help?",
        },
        date: serverTimestamp(),
      },
    });

    await updateDoc(doc(db, "userChats", hopeBuddyUid), {
      [chatId]: {
        userInfo: {
          uid: res.user.uid,
          displayName: userId,
          photoURL: avatar || "/avatars/Avatar1.jpg",
        },
        lastMessage: {
          text: "You're safe here.How can I help?",
        },
        date: serverTimestamp(),
      },
    });

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Hope Buddy</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          {/* Hidden Inputs for Auto-Assigned Values */}
          <input type="hidden" value={userId} readOnly />
          <input type="hidden" value={email} readOnly />
          <input type="hidden" value={password} readOnly />

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
                <img
                  key={index}
                  src={av}
                  alt={`Avatar ${index}`}
                  className="avatar-option"
                  onClick={() => handleSelectAvatar(av)}
                />
              ))}
            </div>
          )}

          <button type="submit">Enter Chat Anonymously</button>
          {err && <span>Something Went Wrong</span>}
        </form>
      </div>
    </div>
  );
};

export default Register;