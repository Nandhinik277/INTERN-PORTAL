function InternshipCard({ title, company, location, stipend }) {
  return (
    <div className="internship-card">
      <h3>{title}</h3>
      <p className="company">{company}</p>

      <div className="details">
        <p>📍 {location}</p>
        <p>💰 {stipend}</p>
      </div>

      <button className="view-btn">View Details</button>
    </div>
  );
}

export default InternshipCard;