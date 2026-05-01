import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Hero.css";

function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/internships?search=${searchTerm}`);
    } else {
      navigate("/internships");
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/internships?category=${category}`);
  };

  return (
    <section className="hero">
      <div className="hero-container">

        <h1>
          Make your <span>dream career</span> a reality
        </h1>

        <p>
          Explore 10,000+ Internships & Jobs and kickstart your career today
        </p>

        {/* Search Bar */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search internships, jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Popular Categories */}
        <div className="popular-tags">
          <span>Popular:</span>
          <button onClick={() => handleCategoryClick("Work from Home")}>
            Work from Home
          </button>
          <button onClick={() => handleCategoryClick("Marketing")}>
            Marketing
          </button>
          <button onClick={() => handleCategoryClick("Engineering")}>
            Engineering
          </button>
          <button onClick={() => handleCategoryClick("Data Science")}>
            Data Science
          </button>
        </div>

      </div>
    </section>
  );
}

export default Hero;