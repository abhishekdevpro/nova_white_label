"use client"

import { FaSearch } from "react-icons/fa"

function SearchBar({ searchValue, onSearchChange, onSearch }) {
  return (
    <div className="container mb-4">
      <div className="search-bar-container p-3 bg-white rounded shadow-sm">
        <div className="row">
          <div className="col-lg-8 col-md-6 col-sm-12 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Job Title or Company"
              name="title_keywords"
              value={searchValue || ""}
              onChange={onSearchChange}
            />
          </div>
          
          <div className="col-lg-4 col-md-6 col-sm-12 ">
            <button onClick={onSearch} className="site-button w-100" style={{ height: "100%" }}>
              <FaSearch /> Search Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar