import React, { useContext } from "react";
import More from "../images/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext to get the logged-in user

const Chat = ({ showExitButton }) => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext); // Get the current logged-in user

  // Ensure the chat page displays only for the logged-in user
  if (!currentUser) {
    return <div className="chat">Please log in to view your chats.</div>;
  }
  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  return (


    <div className="chat" >
      <div className="chatInfo">
        <span>{data.user ? data.user.displayName : "Select a user"}</span>
        <div className="chatIcons flex items-center gap-2">
           {/* Show Exit button only if condition is met */}
      {showExitButton && (
        <button
        onClick={handleExit}
        className="exitButton absolute top-2 right-4"
      >
        Exit
      </button>
      )}
          <img src={More} alt="" />
        </div>
      </div>

     

      <Messages />
      <Input />
    </div>
  );
};

export default Chat;