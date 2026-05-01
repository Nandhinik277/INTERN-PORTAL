import "./../styles/Categories.css";

function CategoriesSection() {
  const categories = [
    "Work From Home",
    "Engineering",
    "Marketing",
    "Data Science",
    "Design",
    "Finance",
    "Content Writing",
    "Human Resources",
  ];

  return (
    <section className="categories-section">
      <div className="container">
        <h2 className="section-title">Top Categories</h2>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <div className="category-card" key={index}>
              {category}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;
