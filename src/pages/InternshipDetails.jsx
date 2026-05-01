import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { MapPin, Calendar, Briefcase } from "lucide-react";

function InternshipDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {

    fetch(`http://localhost:5000/api/internships/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setInternship(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

  }, [id]);

  const handleApply = async () => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/login");
      return;
    }

    if (role !== "student") {
      setMessage("Only students can apply!");
      return;
    }

    try {

      const res = await fetch(
        `http://localhost:5000/api/applications/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
      } else {
        setMessage("Applied successfully ✅");
      }

    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }

  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading internship details...
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="flex justify-center items-center h-screen">
        Internship Not Found
      </div>
    );
  }

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-8">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 mb-6 hover:underline"
        >
          ← Back
        </button>


        {/* Internship Card */}
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl">

          <h1 className="text-2xl font-semibold">
            {internship.title}
          </h1>

          <p className="text-gray-500 mt-1 mb-6">
            {internship.company}
          </p>


          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-6 text-gray-700">

            <div className="flex items-center">
              <MapPin size={16} className="mr-2"/>
              {internship.location}
            </div>

            <div className="flex items-center">
              <Calendar size={16} className="mr-2"/>
              {internship.duration}
            </div>

            <div className="flex items-center">
              <Briefcase size={16} className="mr-2"/>
              Internship
            </div>

            <div>
              <strong>Stipend:</strong> ₹{internship.stipend}
            </div>

          </div>


          {/* Description */}
          <div className="mt-8">

            <h3 className="text-lg font-semibold mb-2">
              Internship Description
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {internship.description || 
              "You will work with our development team and contribute to building modern web applications. This internship provides hands-on experience in real-world projects."}
            </p>

          </div>


          {/* Skills */}
          <div className="mt-8">

            <h3 className="text-lg font-semibold mb-2">
              Skills Required
            </h3>

            <div className="flex gap-3 flex-wrap">

              {(internship.skills || ["HTML", "CSS", "JavaScript", "React"]).map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>


          {/* About Company */}
          <div className="mt-8">

            <h3 className="text-lg font-semibold mb-2">
              About the Company
            </h3>

            <p className="text-gray-600">
              {internship.company} is a growing organization focused on delivering innovative digital solutions. Interns will gain real industry exposure while working with experienced professionals.
            </p>

          </div>


          {/* Apply Button */}
          <div className="mt-8">

            <button
              onClick={handleApply}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Apply Now
            </button>

          </div>

          {/* Message */}
          {message && (
            <p className="mt-4 text-green-600">
              {message}
            </p>
          )}

        </div>

      </div>

    </div>

  );

}

export default InternshipDetails;