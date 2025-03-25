/**
 * Login Component
 *
 * A form component that handles user authentication through email and password.
 * It manages form state through Redux and displays loading/error states.
 *
 * @component
 */

import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { loginUser } from "../store/thunks/authThunks";
import { updateLoginInfo } from "../store/slices/authSlice";

/**
 * Login Component
 *
 * Renders a login form with email and password fields.
 * Handles form submission and displays authentication errors.
 *
 * @returns {JSX.Element} The rendered Login component
 */
const Login = () => {
  const dispatch = useDispatch();
  const { loginInfo, loginError, isLoginLoading } = useSelector(
    (state) => state.auth
  );

  /**
   * Handles form submission
   * Validates required fields and dispatches login action
   *
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginInfo.email || !loginInfo.password) {
      return;
    }
    dispatch(loginUser(loginInfo));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row
        style={{ height: "100vh", justifyContent: "center", paddingTop: "10%" }}
      >
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Login</h2>
            {/* Email input field */}
            <Form.Control
              value={loginInfo.email}
              type="email"
              placeholder="Email"
              onChange={(e) =>
                dispatch(
                  updateLoginInfo({ ...loginInfo, email: e.target.value })
                )
              }
              required
            />
            {/* Password input field */}
            <Form.Control
              value={loginInfo.password}
              type="password"
              placeholder="Password"
              onChange={(e) =>
                dispatch(
                  updateLoginInfo({ ...loginInfo, password: e.target.value })
                )
              }
              required
              minLength={6}
            />
            {/* Submit button with loading state */}
            <Button variant="primary" type="submit" disabled={isLoginLoading}>
              {isLoginLoading ? "Logging in..." : "Login"}
            </Button>
            {/* Error message display */}
            {loginError?.error && (
              <Alert variant="danger">
                <p>{loginError.message || "Invalid email or password"}</p>
              </Alert>
            )}
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Login;
