import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../controllers/authController";
import Login from "../assets/Login.png";
import Google from "../assets/Google.png";
import { Link } from "react-router-dom";

function LoginBody() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const success = await handleLogin(credentials);

    if (success) {
      navigate("/Activities"); // Redirect to a dashboard or home page upon successful login
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };
  return (
    <div className="login-container">
      <div className="login-left">
        <h1 id="hh">Welcome To FitConnect!</h1>
        <p id="pp">Start your fitness journey today</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter your name"
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <div className="login-options">
            <label>
              <input type="checkbox" /> Keep me signed in
            </label>
            <Link to="/SignUp">Do not have an account?</Link>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="login-button">Login</button>
        </form>
        <div className="or-divider">
          <div className="line"></div>
          <span>or</span>
          <div className="line"></div>
        </div>
        <button className="google-login">
          <img src={Google} alt="Google logo" />
          Login with Google
        </button>
        <p className="terms">
          By signing up, you agree to the <a href="#">Terms & Conditions</a> and{" "}
          <a href="#">Privacy Policy</a>
        </p>
      </div>
      <div className="login-right">
        <img src={Login} alt="Fitness" className="login-image" />
      </div>
    </div>
  );
}

export default LoginBody;
