import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Internships from "./pages/Internships";
import InternshipDetails from "./pages/InternshipDetails";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Applications from "./pages/Applications";
import Bookmarks from "./pages/Bookmarks";
import Settings from "./pages/Settings";
import AddInternship from "./pages/addInternship";
function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Sync from localStorage on app load
  useEffect(() => {
    const storedAdmin = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(storedAdmin);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/internships/:id" element={<InternshipDetails />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applications" element={<Applications />} />
<Route path="/bookmarks" element={<Bookmarks />} /> 
          <Route path="/settings" element={<Settings />} /> 
          <Route path="/add-internship" element={<AddInternship />} />
<Route path="/dashboard" element={<Dashboard />} /> 
          {/* Dashboard Route */} 
        
<Route path="/dashboard" element={<Dashboard />} />
          {/* Admin Route */}
          <Route
            path="/admin"
            element={
              isAdmin ? <Admin /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;