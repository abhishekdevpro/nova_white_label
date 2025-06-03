import { useState, useEffect } from "react"
import axios from "axios"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

function FiltersSidebar({ jobApplicationValues, handleChange, handleSearch }) {
  const token = localStorage.getItem("jobSeekerLoginToken")

  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [workplace_type, setWorkplace_type] = useState([])
  const [experience, setExperience] = useState([])
  const [job_type, setJobType] = useState([])
  const [category, setCategory] = useState([])

  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    industry: true,
    jobType: true,
    experienceLevel: true,
    workMode: true,
    benefits: true,
    salary: true,
  })

  useEffect(() => {
    getCountry()
    getExperience()
    getWorkplaceType()
    getJobTypes()
    getCategory()
    getState()
  }, [])

  useEffect(() => {
    if (jobApplicationValues.state_id) {
      getCities()
    }
  }, [jobApplicationValues.state_id])

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const getJobTypes = async () => {
    try {
      const res = await axios.get("https://apiwl.novajobs.us/api/jobseeker/job-types", {
        headers: { Authorization: token },
      })
      setJobType(res.data.data)
    } catch (err) {
      console.log(err, "job type error")
    }
  }

  const getCategory = async () => {
    try {
      const res = await axios.get("https://apiwl.novajobs.us/api/jobseeker/job-categories", {
        headers: {
          Authorization: token,
        },
      })
      setCategory(res.data.data)
    } catch (err) {
      console.log(err, "error")
    }
  }

  const getWorkplaceType = async () => {
    try {
      const response = await axios.get("https://apiwl.novajobs.us/api/jobseeker/workplace-types", {
        headers: { Authorization: token },
      })
      setWorkplace_type(response.data.data)
    } catch (error) {
      console.log("error", error)
    }
  }

  const getExperience = async () => {
    try {
      const response = await axios.get("https://apiwl.novajobs.us/api/jobseeker/experience-level", {
        headers: { Authorization: token },
      })
      setExperience(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getCountry = async () => {
    try {
      const response = await axios.get("https://apiwl.novajobs.us/api/jobseeker/countries", {
        headers: { Authorization: token },
      })
      setCountries(response.data.data)
    } catch (error) {
      console.log("error", error)
    }
  }

  const getState = async () => {
    try {
      const response = await axios.get(`https://apiwl.novajobs.us/api/jobseeker/stats/231`, {
        headers: { Authorization: token },
      })
      setStates(response.data.data)
    } catch (err) {
      console.log(err, "STATE")
      setStates([])
      setCities([])
    }
  }

  const getCities = async () => {
    try {
      const response = await axios.get(
        `https://apiwl.novajobs.us/api/jobseeker/cities/${jobApplicationValues.state_id}`,
      )
      setCities(response.data.data)
    } catch (error) {
      console.log("error", error)
    }
  }

  // Helper function to handle checkbox changes
  const handleCheckboxChange = (fieldName, value, isChecked) => {
    const currentValues = jobApplicationValues[fieldName] || []
    let newValues

    if (Array.isArray(currentValues)) {
      // If it's an array, add/remove the value
      if (isChecked) {
        newValues = [...currentValues, value]
      } else {
        newValues = currentValues.filter(v => v !== value)
      }
    } else {
      // If it's a single value, toggle between the value and empty
      newValues = isChecked ? value : ""
    }

    handleChange({
      target: {
        name: fieldName,
        value: newValues,
      },
    })
  }

  // Helper function to check if a value is selected
  const isValueSelected = (fieldName, value) => {
    const currentValues = jobApplicationValues[fieldName]
    
    if (Array.isArray(currentValues)) {
      return currentValues.includes(value) || currentValues.includes(value.toString())
    } else {
      return currentValues == value // Use == to handle string/number comparison
    }
  }

  console.log(category, experience, "experience", job_type, "job_type", workplace_type, "workplace_type")
  console.log("Current jobApplicationValues:", jobApplicationValues)

  return (
    <div className="filters-sidebar bg-white p-3 rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">All Filters</h5>
        <button className="btn btn-sm btn-outline-primary">Clear</button>
      </div>

      {/* Search by Location */}
      <div className="filter-section mb-3">
        <div
          className="d-flex justify-content-between align-items-center filter-header"
          onClick={() => toggleSection("location")}
          style={{ cursor: "pointer" }}
        >
          <h6 className="m-0">Search by Location</h6>
          {expandedSections.location ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {expandedSections.location && (
          <div className="filter-content mt-2">
            <div className="form-group mb-2">
              <select
                className="form-select form-select-sm"
                name="state_id"
                value={jobApplicationValues.state_id || ""}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <select
                className="form-select form-select-sm"
                name="city_id"
                value={jobApplicationValues.city_id || ""}
                onChange={handleChange}
                disabled={!jobApplicationValues.state_id}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Industry */}
      <div className="filter-section mb-3">
        <div
          className="d-flex justify-content-between align-items-center filter-header"
          onClick={() => toggleSection("industry")}
          style={{ cursor: "pointer" }}
        >
          <h6 className="m-0">Industry</h6>
          {expandedSections.industry ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {expandedSections.industry && (
          <div className="filter-content mt-2">
            {category.map((cat) => (
              <div className="form-check" key={cat.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`industry-${cat.id}`}
                  name="category"
                  value={cat.id}
                  checked={isValueSelected("category", cat.id)}
                  onChange={(e) => {
                    handleCheckboxChange("category", cat.id, e.target.checked)
                  }}
                />
                <label className="form-check-label" htmlFor={`industry-${cat.id}`}>
                  {cat.name} 
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Job Type */}
      <div className="filter-section mb-3">
        <div
          className="d-flex justify-content-between align-items-center filter-header"
          onClick={() => toggleSection("jobType")}
          style={{ cursor: "pointer" }}
        >
          <h6 className="m-0">Job Type</h6>
          {expandedSections.jobType ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {expandedSections.jobType && (
          <div className="filter-content mt-2">
            {job_type.map((type) => (
              <div className="form-check" key={type.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`jobtype-${type.id}`}
                  name="job_type"
                  value={type.id}
                  checked={isValueSelected("job_type", type.id)}
                  onChange={(e) => {
                    handleCheckboxChange("job_type", type.id, e.target.checked)
                  }}
                />
                <label className="form-check-label" htmlFor={`jobtype-${type.id}`}>
                  {type.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Experience Level */}
      <div className="filter-section mb-3">
        <div
          className="d-flex justify-content-between align-items-center filter-header"
          onClick={() => toggleSection("experienceLevel")}
          style={{ cursor: "pointer" }}
        >
          <h6 className="m-0">Experience Level</h6>
          {expandedSections.experienceLevel ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {expandedSections.experienceLevel && (
          <div className="filter-content mt-2">
            {experience.map((exp) => (
              <div className="form-check" key={exp.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`exp-${exp.id}`}
                  name="experience_level"
                  value={exp.id}
                  checked={isValueSelected("experience_level", exp.id)}
                  onChange={(e) => {
                    handleCheckboxChange("experience_level", exp.id, e.target.checked)
                  }}
                />
                <label className="form-check-label" htmlFor={`exp-${exp.id}`}>
                  {exp.name} 
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Work Mode */}
      <div className="filter-section mb-3">
        <div
          className="d-flex justify-content-between align-items-center filter-header"
          onClick={() => toggleSection("workMode")}
          style={{ cursor: "pointer" }}
        >
          <h6 className="m-0">Work Mode</h6>
          {expandedSections.workMode ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {expandedSections.workMode && (
          <div className="filter-content mt-2">
            {workplace_type.map((type) => (
              <div className="form-check" key={type.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`workmode-${type.id}`}
                  name="workplace_type"
                  value={type.id}
                  checked={isValueSelected("workplace_type", type.id)}
                  onChange={(e) => {
                    handleCheckboxChange("workplace_type", type.id, e.target.checked)
                  }}
                />
                <label className="form-check-label" htmlFor={`workmode-${type.id}`}>
                  {type.name} 
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="site-button btn-primary w-100 mt-3" onClick={handleSearch}>
        Apply Filters
      </button>
    </div>
  )
}

export default FiltersSidebar