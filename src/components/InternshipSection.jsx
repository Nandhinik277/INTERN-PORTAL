import { useNavigate } from "react-router-dom";
import "../Internships.css";

function InternshipSection() {
  const navigate = useNavigate();

  const internships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp",
      location: "Chennai",
      stipend: "₹8,000/month",
      duration: "3 Months",
    },
    {
      id: 2,
      title: "Backend Developer Intern",
      company: "InnovateX",
      location: "Bangalore",
      stipend: "₹10,000/month",
      duration: "6 Months",
    },
    {
      id: 3,
      title: "UI/UX Designer Intern",
      company: "Designify",
      location: "Remote",
      stipend: "₹12,000/month",
      duration: "4 Months",
    },
   
  ];

  return (
    <section className="internship-section">
      <div className="container">
        <h2 className="section-title">Latest Internships</h2>

        <div className="internship-list">
          {internships.map((item) => (
            <div
              className="internship-card"
              key={item.id}
              onClick={() => navigate(`/internships/${item.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-left">
                <h4 className="company-name">{item.company}</h4>
                <h3 className="job-title">{item.title}</h3>

                <div className="details">
                  <span>{item.location}</span>
                  <span>{item.stipend}</span>
                  <span>{item.duration}</span>
                </div>
              </div>

              <div className="card-right">
                <button
                  className="primary-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/internships/${item.id}`);
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InternshipSection;