import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from "./pages/Home";
import Login from "./pages/Login"; 
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import "./style.scss"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider} from "./context/ChatContext";
function App() {
  const { currentUser, loading } = useContext(AuthContext); // Added loading state


  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>; // Show loading indicator while checking auth state
    } else if (!currentUser) {
      return <Navigate to="/register" />;

    }

    return children;
  };

  return (
    <BrowserRouter>
      <ChatContextProvider>
        <Routes>

        <Route path="/" element={<ProtectedRoute>
                <Home />
              </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </ChatContextProvider>
    </BrowserRouter>
  );
}

export default App;
