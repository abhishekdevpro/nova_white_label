"use client"

import { useState } from "react"
import JobCard from "./JobCard"

function JobListing({ jobs, loading, currentPage, totalPages, onPageChange }) {
  const [sortBy, setSortBy] = useState("recently_posted")

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
    // You can add sorting logic here or pass it to parent component
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // Previous button
    pages.push(
      <li key="prev" className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button 
          className="page-link" 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
      </li>
    )

    // First page
    if (startPage > 1) {
      pages.push(
        <li key={1} className="page-item">
          <button className="page-link" onClick={() => onPageChange(1)}>
            1
          </button>
        </li>
      )
      if (startPage > 2) {
        pages.push(
          <li key="ellipsis1" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )
      }
    }

    // Visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(i)}>
            {i}
          </button>
        </li>
      )
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <li key="ellipsis2" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )
      }
      pages.push(
        <li key={totalPages} className="page-item">
          <button className="page-link" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        </li>
      )
    }

    // Next button
    pages.push(
      <li key="next" className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button 
          className="page-link" 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </li>
    )

    return (
      <nav aria-label="Job listing pagination">
        <ul className="pagination justify-content-center">
          {pages}
        </ul>
      </nav>
    )
  }

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading jobs...</p>
      </div>
    )
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center p-4">
        <div className="alert alert-info">
          <h5>No jobs found</h5>
          <p>Try adjusting your search criteria or filters.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>
          All Jobs <span className="text-muted">({jobs.length} jobs for you)</span>
        </h5>
        <select 
          className="form-select" 
          style={{ width: "auto" }}
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="recently_posted">Recently Posted</option>
          <option value="most_relevant">Most Relevant</option>
          <option value="salary_high_low">Salary: High to Low</option>
          <option value="salary_low_high">Salary: Low to High</option>
        </select>
      </div>

      <div className="job-cards-container">
        {jobs.map((job) => (
          <JobCard 
            key={job.s_no} 
            job={job} 
            onSelect={() => {
              // Handle job selection if needed
              console.log('Job selected:', job)
            }} 
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4">
        {renderPagination()}
      </div>

      {/* Page info */}
      <div className="text-center mt-2">
        <small className="text-muted">
          Page {currentPage} of {totalPages}
        </small>
      </div>
    </div>
  )
}

export default JobListing