

"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { toast } from "react-toastify"

import { setJobApplicationData, setJobApplicationValues } from "../../../store/reducers/jobApplicationSlice"
import UserHeader from "../../Layout/Header"
import FixedHeader from "../../Layout/fixedHeader"
import TwoBoxWithLinesSkeleton from "../../skeleton/twoBoxLines"
import FiltersSidebar from "./FilterSidebar"
import SearchBar from "./SearchBar"
import JobListing from "./JobList"
import Footer from "../../Layout/Footer"

function JobPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const url = window.location.origin.includes("localhost") ? "https://novajobs.us" : window.location.origin

  const [showSkeleton, setShowSkeleton] = useState(true)
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [totalJobs, setTotalJobs] = useState(0)

  const jobApplicationData = useSelector((state) => state.jobApplicationSlice.jobApplicationData)
  const jobApplicationValues = useSelector((state) => state.jobApplicationSlice.jobApplicationValues)
  const token = localStorage.getItem("jobSeekerLoginToken")

  // Extract search params from the URL
  const queryParams = new URLSearchParams(location.search)

  const initialSearchParams = {
    category: queryParams.get("category") || "",
    state_id: queryParams.get("state_id") || "",
    city_id: queryParams.get("city_id") || "",
    workplace_type: queryParams.get("workplace_type") || "",
    job_type: queryParams.get("job_type") || "",
    experience_level: queryParams.get("experience_level") || "",
    title_keywords: queryParams.get("title_keywords") || "",
    company_id :queryParams.get("company_id")|| ""
  }

  const [searchParams, setSearchParams] = useState(initialSearchParams)

  // Move fetchJobApplicationData to component scope so it can be used as a prop
  const fetchJobApplicationData = async () => {
    try {
      setLoading(true)
      const BaseApi  = token? "https://apiwl.novajobs.us/api/jobseeker/pro/job-lists": "https://apiwl.novajobs.us/api/jobseeker/job-lists"
      // Construct URL with all active filters
      const params = new URLSearchParams()

      // Add pagination params
      params.append("page_no", page)
      params.append("page_size", perPage)
      params.append("is_publish", 1)
      params.append("domain", url)

      // Add filter params if they exist
      if (searchParams.category) params.append("category", searchParams.category)
      if (searchParams.state_id) params.append("state_id", searchParams.state_id)
      if (searchParams.city_id) params.append("city_id", searchParams.city_id)
      if (searchParams.workplace_type) params.append("workplace_type", searchParams.workplace_type)
      if (searchParams.job_type) params.append("job_type", searchParams.job_type)
      if (searchParams.experience_level) params.append("experience_level", searchParams.experience_level)
      if (searchParams.title_keywords) params.append("title_keywords", searchParams.title_keywords)
      if (searchParams.company_id) params.append("company_id", searchParams.company_id)

      const response = await axios.get(`${BaseApi}?${params.toString()}`, {
        headers: {
          Authorization: token,
        },
      })

      const responseData = response.data.data
      dispatch(setJobApplicationData(responseData))
      
      // Calculate total pages based on response
      // Assuming the API returns pagination info, adjust accordingly
      const totalJobsCount = response.data.total_records || responseData.length
      setTotalJobs(totalJobsCount)
      setTotalPages(Math.ceil(totalJobsCount / perPage))
      
      setShowSkeleton(false)
      setLoading(false)

    } catch (error) {
      console.error("Error fetching job data:", error)
      setShowSkeleton(false)
      setLoading(false)
      toast.error("Failed to fetch jobs. Please try again.")
    }
  }

  useEffect(() => {
    fetchJobApplicationData()
  }, [dispatch, token, page, perPage, searchParams, url])

  const handleSearch = () => {
    const { category, state_id, city_id, workplace_type, job_type, experience_level, title_keywords } =
      jobApplicationValues

    const newSearchParams = {
      category,
      state_id,
      city_id,
      workplace_type,
      job_type,
      experience_level,
      title_keywords,
      // company_id,
    }

    setSearchParams(newSearchParams)
    setPage(1) // Reset to first page when searching
  }
const handleClearFilters = () => {
  // 1. Clear Redux values
  dispatch(setJobApplicationValues({
    category: '',
    state_id: '',
    city_id: '',
    workplace_type: '',
    job_type: '',
    experience_level: '',
    title_keywords: '',
  }));

  // 2. Clear searchParams state
  setSearchParams({
    category: '',
    state_id: '',
    city_id: '',
    workplace_type: '',
    job_type: '',
    experience_level: '',
    title_keywords: '',
  });

  // 3. Reset pagination
  // setPage(1);

  // 4. Trigger search with cleared filters
    handleSearch(); // you could pass empty values explicitly too if needed
};




  const handleSearchBarChange = (e) => {
    const { name, value } = e.target
    dispatch(setJobApplicationValues({ ...jobApplicationValues, [name]: value }))
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    if (name === "country_id" || name === "city_id" || name === "state_id") {
      const selectedIndex = e.target.selectedIndex
      const text = e.target.options[selectedIndex].text
      dispatch(
        setJobApplicationValues({
          ...jobApplicationValues,
          [name === "country_id" ? "country" : name === "city_id" ? "city" : "state"]: text,
          [name]: value,
        }),
      )
    } else {
      dispatch(setJobApplicationValues({ ...jobApplicationValues, [name]: value }))
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Update URL with current search params (optional)
  useEffect(() => {
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`
    window.history.replaceState({}, '', newUrl)
  }, [searchParams])

  if (!jobApplicationData && !loading && !showSkeleton) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-warning text-center p-4 shadow-lg">
          <h4 className="mb-3">No Jobs Found</h4>
          <p>Sorry, we couldn't find any jobs matching your criteria.</p>
          <button onClick={() => navigate("/")} className="btn btn-primary mt-2">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* {token ? <FixedHeader /> : null} */}
      <div>
        {showSkeleton ? (
          <div className="bg-white w-100">
            <TwoBoxWithLinesSkeleton />
          </div>
        ) : (
          <div className="page-content bg-white">
            <div className="content-block">
              <div className="section-full bg-white p-t50 p-b20">
                
                {/* Search Bar Component */}
                <SearchBar
                  searchValue={jobApplicationValues.title_keywords}
                  onSearchChange={handleSearchBarChange}
                  onSearch={handleSearch}
                />

                <div className="container">
                  <div className="row">
                    
                    {/* Filters Sidebar */}
                    <div className="col-lg-3 col-md-4">
                      <FiltersSidebar
                        jobApplicationValues={jobApplicationValues}
                        handleChange={handleFilterChange}
                        handleSearch={handleSearch}
                        handleClear={handleClearFilters}
                      />
                    </div>

                    {/* Job Listings */}
                    <div className="col-lg-9 col-md-8">
                      <JobListing
                        jobs={jobApplicationData || []}
                        loading={loading}
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        // refreshJobs={fetchJobApplicationData}
                      />
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default JobPage