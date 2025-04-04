// import React, { useContext } from "react";
// import Cam from "../images/cam.png";
// import Add from "../images/add.png";
// import More from "../images/more.png";
// import Messages from "./Messages";
// import Input from "./Input";
// import { ChatContext } from "../context/ChatContext";
// const Chat = () => {
//   const { data } = useContext(ChatContext);
//   return (
//     <div className="chat">
//       <div className="chatInfo">
//         <span>{data.user ? data.user.displayName : "Select a user"}</span>

//         <div className="chatIcons">
//           <img src={Cam} alt="" />
//           <img src={Add} alt="" />
//           <img src={More} alt="" />
//         </div>
//       </div>
//       <Messages />
//       <Input />
//     </div>
//   );
// };

// export default Chat;


// import Cam from "../images/cam.png";
// import Add from "../images/add.png";
// import More from "../images/more.png";

import React, { useContext } from "react";
import More from "../images/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext to get the logged-in user

const Chat = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext); // Get the current logged-in user

  // Ensure the chat page displays only for the logged-in user
  if (!currentUser) {
    return <div className="chat">Please log in to view your chats.</div>;
  }

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user ? data.user.displayName : "Select a user"}</span>

        <div className="chatIcons">
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;