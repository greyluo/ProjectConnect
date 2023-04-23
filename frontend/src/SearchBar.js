import React, { useState } from 'react';

function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        props.onSearch(searchTerm);
    }

    return (
        <form class="search-form" onSubmit={handleSearch}>
          <input type="text" placeholder="What do you want to learn..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar();