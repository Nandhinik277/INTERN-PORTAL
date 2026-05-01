import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Bookmarks() {

  const [bookmarks, setBookmarks] = useState([]);
  const [allInternships, setAllInternships] = useState([]);

  useEffect(() => {

    // get bookmarked ids
    const saved = localStorage.getItem("bookmarkedInternships");
    const ids = saved ? JSON.parse(saved) : [];

    setBookmarks(ids);

    // get all internships from backend
    fetch("http://localhost:5000/api/internships")
      .then((res) => res.json())
      .then((data) => {
        setAllInternships(data);
      });

  }, []);

  // filter bookmarked internships
  const savedInternships = allInternships.filter(item =>
    bookmarks.includes(item._id)
  );

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-2xl font-semibold mb-6">
          Bookmarked Internships
        </h1>

        {savedInternships.length === 0 ? (

          <p>No bookmarks yet.</p>

        ) : (

          <div className="space-y-4">

            {savedInternships.map((item) => (

              <div
                key={item._id}
                className="bg-white p-6 rounded-lg shadow-sm"
              >

                <h2 className="text-lg font-semibold">
                  {item.title}
                </h2>

                <p className="text-gray-500">
                  {item.company}
                </p>

                <p className="text-gray-600 mt-2">
                  {item.location}
                </p>

                <p className="text-green-600 mt-2">
                  ₹ {item.stipend}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Bookmarks;