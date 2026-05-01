import "../styles/SearchBar.css"

function SearchBar() {
  return (
    <div className="search-section">
      <input
        type="text"
        placeholder="Search internships..."
        className="search-input"
      />

      <select className="search-select">
        <option>All Locations</option>
        <option>Chennai</option>
        <option>Bangalore</option>
        <options>Canada</options>
        <options>Coimbatore</options>
        <options>Karnataka</options>
        <options>Delhi</options>
        <option>Remote</option>
      </select>

      <button className="search-btn">Search</button>
    </div>
  )
}

export default SearchBar
