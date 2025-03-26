import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat"; // Added import statement

const Home = () => {
  const { currentUser } = useContext(AuthContext); // Access current user from context
  //added
  if (!currentUser) {
    return <p>Loading...</p>; // Prevents crashes when user state is not set
  }

  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;

// import Sidebar from '../components/Sidebar';
// import Chat from '../components/Chat';

// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const Home = () => {
//   const { currentUser } = useContext(AuthContext);

//   return (

//         <div className="home">
//       <div className="container">
//       <h1>Welcome, {currentUser.displayName}</h1>
//       <p>Your role: {currentUser.role.toUpperCase()}</p>
//         <Sidebar />
//         <Chat />
//       </div>
//     </div>
//   );
// };

// export default Home;
