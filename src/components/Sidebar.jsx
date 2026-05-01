import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";
   
function Sidebar() {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Dashboard</h3>

      <ul className="sidebar-list" >
        <li><NavLink to="/dashboard">Home</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><NavLink to="/applications">My Applications</NavLink></li>
        <li><NavLink to="/internships">Internships</NavLink></li>
        <li><NavLink to="/bookmarks">Bookmarks</NavLink></li>
        <li><NavLink to="/add-internship">Add Internship</NavLink></li>
        <li><NavLink to="/settings">Settings</NavLink></li>
      </ul>
    </div>
  );
}

export default Sidebar;
