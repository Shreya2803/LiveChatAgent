import React, { useState, useContext } from "react";
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Chats from "../components/Chats";
import { AuthContext } from "../context/AuthContext";

export default function HomeLayout() {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [showExitButton, setShowExitButton] = useState(false);
  const { currentUser } = useContext(AuthContext);

  // Define HopeBuddy UID
  const hopeBuddyUid = "61cLLi3ci2PElVffvITtbsfRFc03";

  // Check if the logged-in user is HopeBuddy
  const isHopeBuddy = currentUser?.uid === hopeBuddyUid;

  // Function to toggle the sidebar visibility for non-HopeBuddy users
  const toggleSidebar = () => {
    if (!isHopeBuddy) {
      setIsSidebarHidden(true);
      setShowExitButton(true);
    }
  };

  return (
    <div className="home h-screen w-full">
      <div className="container flex h-full">

        {/* Sidebar */}
        <div
          className="sidebar"
          style={{
            display: isSidebarHidden && !isHopeBuddy ? "none" : "block", // Hide sidebar only for non-HopeBuddy users after toggle
            flex: isHopeBuddy ? 1 : isSidebarHidden ? 0 : 1, // Sidebar flex for HopeBuddy or other users
            width: isHopeBuddy ? "20%" : isSidebarHidden ? "0%" : "100%", // Adjust width dynamically
          }}
        >
          <Navbar />
          <Search />
          <Chats toggleSidebar={toggleSidebar} setShowExitButton={setShowExitButton} />
        </div>

        {/* Chat */}
        <div
          className="chat"
          style={{
            display: isHopeBuddy || isSidebarHidden ? "block" : "none", // Show chat for HopeBuddy or when sidebar is hidden
            flex: isHopeBuddy ? 4 : isSidebarHidden ? 1 : 0, // Chat flex for HopeBuddy or other users
            width: isHopeBuddy ? "80%" : isSidebarHidden ? "100%" : "0%", // Adjust width dynamically
          }}
        >
          <Chat showExitButton={showExitButton} />
        </div>
        
      </div>
    </div>
  );
}
