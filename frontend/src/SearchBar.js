import React, { useState } from 'react';
import './SearchBar.css'; // import custom CSS styles

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    props.onSearch(searchTerm);
  }

  return (
    <form className="search-form" onSubmit={handleSearch} style={{marginTop: "200px", marginLeft: "100px"}}>
      <input
        type="text"
        placeholder="What do you want to learn..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{width: "400px", height: "30px"}}
      />
      <button type="submit">
        <span className="search-icon"></span>
        <span className="search-label">Search</span>
      </button>

    </form>
  );
}

export default SearchBar;

