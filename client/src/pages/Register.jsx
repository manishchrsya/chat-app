/**
 * Register Component
 *
 * A form component that handles new user registration with name, email, and password.
 * It manages form state through Redux and displays loading/error states.
 *
 * @component
 */

import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { registerUser } from "../store/thunks/authThunks";
import { updateRegisterInfo } from "../store/slices/authSlice";

/**
 * Register Component
 *
 * Renders a registration form with name, email, and password fields.
 * Handles form submission and displays registration errors.
 *
 * @returns {JSX.Element} The rendered Register component
 */
const Register = () => {
  const dispatch = useDispatch();
  const { registerInfo, registerError, isRegisterLoading } = useSelector(
    (state) => state.auth
  );

  /**
   * Handles form submission
   * Validates required fields and dispatches registration action
   *
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!registerInfo.name || !registerInfo.email || !registerInfo.password) {
      return;
    }
    dispatch(registerUser(registerInfo));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row
        style={{ height: "100vh", justifyContent: "center", paddingTop: "10%" }}
      >
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Register</h2>
            {/* Name input field */}
            <Form.Control
              value={registerInfo.name}
              type="text"
              placeholder="Name"
              onChange={(e) =>
                dispatch(
                  updateRegisterInfo({ ...registerInfo, name: e.target.value })
                )
              }
              required
              minLength={2}
            />
            {/* Email input field */}
            <Form.Control
              value={registerInfo.email}
              type="email"
              placeholder="Email"
              onChange={(e) =>
                dispatch(
                  updateRegisterInfo({ ...registerInfo, email: e.target.value })
                )
              }
              required
            />
            {/* Password input field */}
            <Form.Control
              value={registerInfo.password}
              type="password"
              placeholder="Password"
              onChange={(e) =>
                dispatch(
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                )
              }
              required
              minLength={6}
            />
            {/* Submit button with loading state */}
            <Button
              variant="primary"
              type="submit"
              disabled={isRegisterLoading}
            >
              {isRegisterLoading ? "Creating your account..." : "Register"}
            </Button>
            {/* Error message display */}
            {registerError?.error && (
              <Alert variant="danger">
                <p>
                  {registerError.message ||
                    "Registration failed. Please try again."}
                </p>
              </Alert>
            )}
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Register;
