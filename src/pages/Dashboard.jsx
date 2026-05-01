import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";
function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        <h2>Welcome back 👋</h2>

        {/* Profile Card */}
        <div className="card">
          <h3>Complete your profile</h3>
          <p>Your profile is 60% complete</p>

          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>

          <button className="primary-btn">Complete Now</button>
        </div>

        {/* Recommended Section */}
        <div className="card">
          <h3>Recommended Internships</h3>
          <p>We found internships matching your profile.</p>
        </div>
        

        {/* Applications Section */}
        <div className="card">
          <h3>My Applications</h3>
          <p>You haven’t applied to any internships yet.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;