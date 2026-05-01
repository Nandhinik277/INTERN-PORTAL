import { useState } from "react"

function Admin() {
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [location, setLocation] = useState("")
  const [stipend, setStipend] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:5000/api/internships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          company,
          location,
          stipend,
        }),
      })

      const data = await response.json()
      console.log(data)

      alert("Internship Added ✅")

      setTitle("")
      setCompany("")
      setLocation("")
      setStipend("")
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Add Internship</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br /><br />

        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        /><br /><br />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        /><br /><br />

        <input
          placeholder="Stipend"
          value={stipend}
          onChange={(e) => setStipend(e.target.value)}
        /><br /><br />

        <button type="submit">Add Internship</button>
      </form>
    </div>
  )
}

export default Admin
