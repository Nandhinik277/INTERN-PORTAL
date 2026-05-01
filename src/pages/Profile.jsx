import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function Profile() {

  const [profile, setProfile] = useState({
    name: "",
    skills: "",
    education: "",
  });

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile saved ✅");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-8">

        <h2 className="text-2xl font-bold mb-6">
          My Profile
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4 max-w-xl">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills (React, Java, etc)"
            value={profile.skills}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="education"
            placeholder="Education"
            value={profile.education}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Profile
          </button>

        </div>

      </div>
    </div>
  );
}

export default Profile;