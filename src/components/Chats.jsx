// import { doc, onSnapshot } from "firebase/firestore";
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import { db } from "../firebase";

// const Chats = () => {
//   const [chats, setChats] = useState([]);

//   const { currentUser } = useContext(AuthContext);
//   const { dispatch } = useContext(ChatContext);

//   useEffect(() => {
//     const getChats = () => {
//       const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
//         setChats(doc.data());
//       });

//       return () => {
//         unsub();
//       };
//     };

//     currentUser.uid && getChats();
//   }, [currentUser.uid]);

//   const handleSelect = (u) => {
//     dispatch({ type: "CHANGE_USER", payload: u });
//   };

//   return (
//     <div className="chats">
//       {chats &&
//         Object.entries(chats)
//           .sort((a, b) => b[1].date - a[1].date)
//           .map((chat) => (
//             <div
//               className="userChat"
//               key={chat[0]}
//               onClick={() => handleSelect(chat[1].userInfo)}
//             >
//               <img src={chat[1].userInfo.photoURL} alt="" />
//               <div className="userChatInfo">
//                 <span>{chat[1].userInfo.displayName}</span>
//                 <p>{chat[1].lastMessage?.text}</p>
//               </div>
//             </div>
//           ))}
//     </div>
//   );
// };

// export default Chats;

import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = ({ toggleSidebar , setShowExitButton}) => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  
  // Fetch chats for the current user
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        if (doc.exists()) {
          setChats(doc.data());
        }
      });

      return () => unsub(); // Cleanup listener when component unmounts
    };

    if (currentUser?.uid) {
      getChats();
    }
  }, [currentUser?.uid]);

  // Function to handle user selection
  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };
  const handleHopeBuddyClick = (userInfo) => {
    handleSelect(userInfo);           
    toggleSidebar();                 
    setShowExitButton(true);         
  };
  return (
    <div className="chats">
      {/* Render chats dynamically */}
      {chats &&
        Object.entries(chats)
          .sort((a, b) => b[1]?.date - a[1]?.date) // Sort by most recent date
          .map(([key, chat]) => (
            <div
              className="userChat"
              key={key}
              onClick={() => handleSelect(chat.userInfo)}
            >
              <img
                src={chat?.userInfo?.photoURL || "/avatars/Avatar1.jpg"}
                alt={chat?.userInfo?.displayName || "User Avatar"}
                
                onError={(e) => (e.target.src = "/avatars/Avatar1.jpg")} // Fallback image
              />
              <div className="userChatInfo">
                <span>{chat?.userInfo?.displayName || "Unknown User"}</span>
                <p>{chat?.lastMessage?.text || "No messages yet"}</p>
                {/* Conditional rendering of button for HopeBuddy */}
                {chat?.userInfo?.displayName === "HopeBuddy" && (
                  <button
                    className="hopeBuddyButton"
                    // onClick={toggleSidebar}
                    onClick={() => handleHopeBuddyClick(chat.userInfo)}
                  >
                    Click Here to Chat!
                  </button>
                )}
              </div>
            </div>
          ))}
    </div>
  );
};

export default Chats;


