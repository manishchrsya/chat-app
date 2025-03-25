/**
 * Navigation Bar Component
 *
 * A responsive navigation bar that displays the app title and authentication links.
 * It shows different options based on the user's authentication status.
 *
 * @component
 */

import { useDispatch, useSelector } from "react-redux";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../store/slices/authSlice";

/**
 * NavBar Component
 *
 * Renders a navigation bar with:
 * - App title/logo
 * - User's name (if logged in)
 * - Authentication links (Login/Register or Logout)
 *
 * @returns {JSX.Element} The rendered NavBar component
 */
const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  /**
   * Handles user logout by:
   * - Removing user data from localStorage
   * - Dispatching logout action
   * - Redirecting to login page
   */
  const handleLogout = () => {
    localStorage.removeItem("User");
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        {/* App title/logo */}
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            ChatApp
          </Link>
        </h2>
        {/* User's name display */}
        <span className="text-warning">{`Logged in as ${
          user?.name ?? "User"
        }`}</span>
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {/* Logout link for authenticated users */}
            {user && (
              <Link
                onClick={handleLogout}
                to="/login"
                className="link-light text-decoration-none"
              >
                Logout
              </Link>
            )}
            {/* Login/Register links for unauthenticated users */}
            {!user && (
              <>
                <Link to="/login" className="link-light text-decoration-none">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="link-light text-decoration-none"
                >
                  Register
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
