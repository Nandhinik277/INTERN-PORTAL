function Jobs() {
  return (
    <div style={{ padding: "60px 80px", textAlign: "center" }}>
      <h2>Latest Jobs</h2>
      <p>Full-time job opportunities will be listed here.</p>

      <div style={{ marginTop: "30px" }}>
        <div style={{
          border: "1px solid #eee",
          padding: "20px",
          width: "300px",
          margin: "auto",
          borderRadius: "8px"
        }}>
          <h3>Software Engineer</h3>
          <p><strong>Company:</strong> Infosys</p>
          <p><strong>Location:</strong> Bangalore</p>
          <button style={{
            backgroundColor: "#00A5EC",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            Apply Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Jobs
