import { FaSearch } from 'react-icons/fa';

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search" />
      <button type="submit">
        <FaSearch />
      </button>
    </div>
  );
}

export default SearchBar;