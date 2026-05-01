import "../styles/FeaturedCompanies.css";

function FeaturedCompanies() {
  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "TCS",
    "Infosys",
    "Wipro",
    "Flipkart",
    "Zoho",
    "WalMart",
  ];

  return (
    <section className="featured-section">
      <div className="container">
        <h2 className="section-title">Featured Companies</h2>

        <div className="companies-grid">
          {companies.map((company, index) => (
            <div className="company-card" key={index}>
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCompanies;
