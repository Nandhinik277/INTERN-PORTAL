import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
      } else {

        localStorage.setItem("token", data.token);

        navigate("/dashboard");

      }

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <select
            value={role}
            onChange={(e)=>setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="company">Company</option>
          </select>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="register-btn">
            Register
          </button>

        </form>

        <p className="login-link">
          Already have an account? Login
        </p>

      </div>

    </div>
  );
}

export default Register;