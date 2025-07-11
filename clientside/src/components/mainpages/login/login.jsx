import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./Login.css";
import { AuthContext } from "../../authcontext"; // Import Auth Context

const Login = () => {
  const { setUser } = useContext(AuthContext); // Get setUser from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await axios.post("https://hisabkitab-2.onrender.com/users/login", {
        email,
        password,
      } , { withCredentials: true } // This allows cookies and auth headers
      );
      // Extract the token and userId correctly
      const { token, user } = response.data;
      const userId = user._id;  // Accessing userId from the user object

      // Store token and userId in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      // Decode the token and update the global state
      setUser(jwtDecode(token));  // ✅ Now Header will update immediately
      // Redirect to home page
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>

        {error && <p className="error-message">{error}</p>}

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
