import { useState } from "react";
import Sidebar from "../components/Sidebar";

function AddInternship() {

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    duration: "",
    stipend: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/internships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error: " + data.message);
      } else {
        alert("Internship Added Successfully 🎉");

        setFormData({
          title: "",
          company: "",
          location: "",
          duration: "",
          stipend: "",
          description: ""
        });
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (

    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-2xl font-semibold mb-6">
          Add Internship
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-xl"
        >

          <input
            type="text"
            name="title"
            placeholder="Internship Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g. 3 months)"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="stipend"
            placeholder="Stipend"
            value={formData.stipend}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Internship Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="4"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Internship
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddInternship;