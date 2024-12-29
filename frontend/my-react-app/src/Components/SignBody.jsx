import Login from "../assets/Login.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleRegister } from "../controllers/authController";

function SignBody() {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    path: `backend\\images\\Coach2.png`,
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

    const success = await handleRegister(credentials);
    console.log(success);

    if (success) {
      navigate("/login"); // Redirect to a dashboard or home page upon successful login
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
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={credentials.email}
            onChange={handleChange}
          />
          <input
            type="number"
            name="phone"
            placeholder="Enter your phone number"
            value={credentials.phone}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
          <div className="login-options">
            <label>
              <input type="checkbox" /> Keep me signed in
            </label>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="login-button">Create account</button>
        </form>

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

export default SignBody;
