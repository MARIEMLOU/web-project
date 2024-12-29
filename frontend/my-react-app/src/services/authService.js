import axios from "axios";

export const login = async (credentials) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      credentials
    );
    return response;
  } catch (error) {
    console.error("Error in login service:", error);
    throw error;
  }
};

export const Register = async (credentials) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      credentials
    );
    return response;
  } catch (error) {
    console.error("Error in Register service:", error);
    throw error;
  }
};
