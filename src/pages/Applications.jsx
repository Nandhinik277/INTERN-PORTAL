import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Applications() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("applications");
    if (saved) {
      setApplications(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 p-8">

        <h2 className="text-2xl font-bold mb-6">
          My Applications
        </h2>

        {applications.length === 0 ? (
          <p className="text-gray-500">
            You haven't applied to any internships yet 😢
          </p>
        ) : (
          <div className="space-y-4">

            {applications.map((item) => (
              <div
                key={item._id}
                className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm">
                  {item.company}
                </p>

                <p className="text-gray-500 text-sm">
                  📍 {item.location}
                </p>

                <p className="text-green-600 text-sm mt-1">
                  ₹ {item.stipend || "Unpaid"}
                </p>

                <span className="inline-block mt-2 px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                  Applied
                </span>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default Applications;