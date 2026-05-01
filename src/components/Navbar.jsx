import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ isAdmin, setIsAdmin }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          InternConnect
        </Link>

        <div className="menu">
  <Link to="/internships" className="menu-item">
    Internships ▾
  </Link>


          <div className="menu-item">
            Courses <span className="offer">OFFER</span>
          </div>

          <div className="menu-item">
            Jobs ▾
          </div>
        </div>

        <div className="right-section">
          {isAdmin ? (
            <>
              <Link to="/admin" className="login-link">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="register-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-link">
                Login
              </Link>
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}

export default Navbar;