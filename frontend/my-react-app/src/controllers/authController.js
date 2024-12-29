import { login, Register } from "../services/authService";

export const handleLogin = async (credentials) => {
  try {
    const credential = {
      email: credentials.username,
      password: credentials.password,
    };
    const response = await login(credential);
    if (response.status === 200) {
      // Store the token or user data in localStorage, sessionStorage, or state
      localStorage.setItem("token", response.data.token);
      return true;
    }
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};

export const handleRegister = async (credentials) => {
  try {
    const credential = {
      username: credentials.username,
      password: credentials.password,
      email: credentials.email,
      phone: credentials.phone,
      path: credentials.path,
    };

    const response = await Register(credential);
    if (response.status === 201) {
      // Store the token or user data in localStorage, sessionStorage, or state
      return true;
    }
  } catch (error) {
    console.error("Register error:", error);
    return false;
  }
};

export const handleLogout = () => {
  try {
    // Remove the token or user data from localStorage or sessionStorage
    localStorage.removeItem("token");

    // Optionally, you can also clear other session data or reset application state here
    // e.g., reset user-related state or redirect the user

    // If you're using a state management solution like Redux or Context, you might also want to clear that state:
    // dispatch(logoutAction());
    // or, if using context, reset context state to initial values
    window.location.href = "/login";

    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
};
