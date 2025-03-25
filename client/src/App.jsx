/**
 * Main Application Component
 *
 * This is the root component of the chat application that handles routing
 * and authentication state. It provides a consistent layout with a navigation
 * bar and container for the main content.
 *
 * @component
 */

import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";

/**
 * App Component
 *
 * Handles the main routing logic and authentication state of the application.
 * Provides protected routes based on user authentication status.
 *
 * @returns {JSX.Element} The rendered App component
 */
function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          {/* Protected Routes - Only accessible when user is authenticated */}
          <Route path="/" element={user ? <Chat /> : <Login />} />
          <Route path="/login" element={user ? <Chat /> : <Login />} />
          <Route path="/register" element={user ? <Chat /> : <Register />} />
          {/* Catch all route - redirects to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
