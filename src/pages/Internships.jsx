import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Search, MapPin, Calendar, Bookmark } from "lucide-react";
import Sidebar from "../components/Sidebar";

const Internships = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [internships, setInternships] = useState([]);

  const [bookmarked, setBookmarked] = useState(() => {
    const saved = localStorage.getItem("bookmarkedInternships");
    return saved ? JSON.parse(saved) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {

    window.scrollTo(0, 0);

    API.get("/internships")
      .then((res) => {
        setInternships(res.data);
      })
      .catch((err) => {
        console.error("Error fetching internships:", err);
      });

  }, []);

  // BOOKMARK FUNCTION
  const toggleBookmark = (id) => {

    let updatedBookmarks;

    if (bookmarked.includes(id)) {
      updatedBookmarks = bookmarked.filter((item) => item !== id);
    } else {
      updatedBookmarks = [...bookmarked, id];
    }

    setBookmarked(updatedBookmarks);

    localStorage.setItem(
      "bookmarkedInternships",
      JSON.stringify(updatedBookmarks)
    );
  };

  // APPLY INTERNSHIP FUNCTION
  const applyInternship = (internship) => {

    const saved = localStorage.getItem("applications");
    let applications = saved ? JSON.parse(saved) : [];

    const alreadyApplied = applications.find(
      (item) => item._id === internship._id
    );

    if (alreadyApplied) {
      alert("You already applied for this internship!");
      return;
    }

    applications.push(internship);

    localStorage.setItem("applications", JSON.stringify(applications));

    alert("Application submitted successfully!");
  };

  // SEARCH FILTER
  const filteredInternships = internships.filter((internship) =>
    internship.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        {/* TOP BAR */}
        <div className="bg-white shadow-sm py-6 px-6">

          <div className="max-w-6xl mx-auto">

            <h1 className="text-2xl font-semibold mb-4">
              {internships.length}+ Internships
            </h1>

            <div className="flex items-center bg-gray-100 rounded-md px-4 py-2 max-w-lg">

              <Search className="text-gray-500 mr-2" size={18} />

              <input
                type="text"
                placeholder="Search internships"
                className="bg-transparent outline-none flex-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>

          </div>

        </div>


        {/* MAIN CONTENT */}
        <div className="max-w-6xl mx-auto flex gap-8 py-8 px-4">

          {/* FILTERS */}
          <div className="hidden md:block w-72 bg-white p-6 rounded-md shadow-sm h-fit">

            <h3 className="font-semibold mb-4 text-lg">Filters</h3>

            <div className="space-y-4 text-sm text-gray-700">

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Work from home
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Part-time
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Paid internship
              </label>

            </div>

          </div>


          {/* INTERNSHIP LIST */}
          <div className="flex-1 space-y-6">

            {filteredInternships.length === 0 ? (

              <p>No internships available</p>

            ) : (

              filteredInternships.map((item) => (

                <div
                  key={item._id}
                  className="bg-white rounded-md shadow-sm p-6 hover:shadow-md transition"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h2 className="text-lg font-semibold">
                        {item.title}
                      </h2>

                      <p className="text-gray-500 text-sm mt-1">
                        {item.company || "Company Name"}
                      </p>

                      <div className="flex items-center text-gray-500 text-sm mt-3">
                        <MapPin size={14} className="mr-1" />
                        {item.location}
                      </div>

                      <div className="flex items-center text-gray-500 text-sm mt-2">
                        <Calendar size={14} className="mr-1" />
                        {item.duration}
                      </div>

                      <p className="text-green-600 text-sm mt-2">
                        ₹ {item.stipend || "Unpaid"}
                      </p>

                    </div>


                    <Bookmark
                      onClick={() => toggleBookmark(item._id)}
                      className={`cursor-pointer ${
                        bookmarked.includes(item._id)
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                      size={20}
                    />

                  </div>


                  <div className="mt-4 flex justify-between items-center">

                    <button
                      onClick={() => navigate(`/internships/${item._id}`)}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      View details
                    </button>

                    <button
                      onClick={() => applyInternship(item)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      Apply now
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>

  );
};

export default Internships;