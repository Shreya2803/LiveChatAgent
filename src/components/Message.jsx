import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const formatTime = (timestamp) => {
    if (!timestamp?.seconds) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Default image if no photoURL
  const getAvatarSrc = () => {
    const photoURL =
      message.senderId === currentUser.uid
        ? currentUser.photoURL
        : data.user.photoURL;

    return photoURL || "/images/ChatbotAdmin.jpg"; // Adjust path if needed
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid ? "owner" : ""}`}
    >
      <div className="messageInfo">
        <img
          src={getAvatarSrc()}
          alt="avatar"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/avatars/ChatbotAdmin.jpg"; // fallback path
          }}
        />
        <span>{formatTime(message.date)}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="message attachment" />}
      </div>
    </div>
  );
};

export default Message;