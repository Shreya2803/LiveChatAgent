// import React, { useContext, useState } from "react";
// import Attach from "../images/attach.png";
// import Img from "../images/img.png";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import {
//   arrayUnion,
//   doc,
//   serverTimestamp,
//   Timestamp,
//   updateDoc,
// } from "firebase/firestore";
// import { db } from "../firebase";
// import { v4 as uuid } from "uuid";
// const Input = () => {
//   const [text, setText] = useState("");

//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);

//   const handleSend = async () => {
//     if (text.trim() === "") return; // Prevent sending empty messages

//     // Sending only text messages
//     await updateDoc(doc(db, "chats", data.chatId), {
//       messages: arrayUnion({
//         id: uuid(),
//         text,
//         senderId: currentUser.uid,
//         date: Timestamp.now(),
//       }),
//     });

//     // Update last message for both users
//     await updateDoc(doc(db, "userChats", currentUser.uid), {
//       [data.chatId + ".lastMessage"]: { text },
//       [data.chatId + ".date"]: serverTimestamp(),
//     });

//     await updateDoc(doc(db, "userChats", data.user.uid), {
//       [data.chatId + ".lastMessage"]: { text },
//       [data.chatId + ".date"]: serverTimestamp(),
//     });

//     setText(""); // Clear input field after sending
//   };

//   return (
//     <div className="input">
//       <input
//         type="text"
//         placeholder="Type something..."
//         onChange={(e) => setText(e.target.value)}
//         value={text}
//       />
//       <div className="send">
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Input;


import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";

const Input = () => {
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (text.trim() === "") return; // Prevent sending empty messages

    try {
      // Send message to Firestore under the correct chatId
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(), // Unique message ID
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      // Update last message for both users in 'userChats'
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: { text },
        [data.chatId + ".date"]: Timestamp.now(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: { text },
        [data.chatId + ".date"]: Timestamp.now(),
      });

      setText(""); // Clear input field after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Input;

