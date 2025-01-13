// // src/Components/JobFilters.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setJobApplicationValues } from "../../../store/reducers/jobApplicationSlice";
// import styled from "styled-components";
// // import state from "sweetalert/typings/modules/state";

// const FiltersContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 10px;
//   margin-bottom: 20px;
// `;

// const Select = styled.select`
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   font-size: 16px;
//   &:focus {
//     border-color: #007bff;
//     outline: none;
//   }
// `;

// const SearchButton = styled.button`
//   padding: 10px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 16px;
//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const JobFilters = ({ onSearch }) => {
//   const dispatch = useDispatch();
//   const jobApplicationValues = useSelector((state) => state.jobApplicationSlice.jobApplicationValues);
//   const token = localStorage.getItem("jobSeekerLoginToken");

//   const [categories, setCategories] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [workplaceTypes, setWorkplaceTypes] = useState([]);
//   const [jobTypes, setJobTypes] = useState([]);
//   const [experienceLevels, setExperienceLevels] = useState([]);

//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const [categoriesRes, statesRes, citiesRes, workplaceTypesRes, jobTypesRes, experienceLevelsRes] = await Promise.all([
//           axios.get("https://api.novajobs.us/api/jobseeker/job-categories", { headers: { Authorization: token } }),
//           axios.get("https://api.novajobs.us/api/jobseeker/stats/231", ),
//           axios.get("https://api.novajobs.us/api/jobseeker/cities/3", ),
//           axios.get("https://api.novajobs.us/api/jobseeker/workplace-types", { headers: { Authorization: token } }),
//           axios.get("https://api.novajobs.us/api/jobseeker/job-types", { headers: { Authorization: token } }),
//           axios.get("https://api.novajobs.us/api/jobseeker/experience-level", { headers: { Authorization: token } }),
//         ]);

//         console.log(categoriesRes, statesRes, citiesRes, workplaceTypesRes, jobTypesRes, experienceLevelsRes);
//         setCategories(categoriesRes.data.data);
//         setStates(statesRes.data.data);
//         setCities(citiesRes.data.data);
//         setWorkplaceTypes(workplaceTypesRes.data.data);
//         setJobTypes(jobTypesRes.data.data);
//         setExperienceLevels(experienceLevelsRes.data.data);
//       } catch (error) {
//         console.error("Error fetching filter data:", error);
//       }
//     };

//     fetchFilters();
//   }, [token]);

//   console.log(categories,states,cities,experienceLevels,jobTypes,workplaceTypes,"state huu ");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     dispatch(setJobApplicationValues({ ...jobApplicationValues, [name]: value }));
//     onSearch(); // Trigger search when filters change
//   };
// //   console.log(categories,"categoriesRes");

//   return (
//     <FiltersContainer>
//       <Select name="category" onChange={handleChange} value={jobApplicationValues.category}>
//         <option value="">Select a Category</option>
//         {categories.map((category) => (
//           <option key={category.id} value={category.id}>{category.name}</option>
//         ))}
//       </Select>

//       <Select name="state_id" onChange={handleChange} value={jobApplicationValues.state_id}>
//         <option value="">Select a State</option>
//         {states.map((state) => (
//           <option key={state.id} value={state.id}>{state.name}</option>
//         ))}
//       </Select>

//       <Select name="city_id" onChange={handleChange} value={jobApplicationValues.city_id}>
//         <option value="">Select a City</option>
//         {cities.map((city) => (
//           <option key={city.id} value={city.id}>{city.name}</option>
//         ))}
//       </Select>

//       <Select name="workplace_type" onChange={handleChange} value={jobApplicationValues.workplace_type}>
//         <option value="">Select WorkPlace Type</option>
//         {workplaceTypes.map((type) => (
//           <option key={type.id} value={type.id}>{type.name}</option>
//         ))}
//       </Select>

//       <Select name="job_type" onChange={handleChange} value={jobApplicationValues.job_type}>
//         <option value="">Select Job Type</option>
//         {jobTypes.map((type) => (
//           <option key={type.id} value={type.id}>{type.name}</option>
//         ))}
//       </Select>

//       <Select name="experience_level" onChange={handleChange} value={jobApplicationValues.experience_level}>
//         <option value="">Select Experience Level</option>
//         {experienceLevels.map((level) => (
//           <option key={level.id} value={level.id}>{level.name}</option>
//         ))}
//       </Select>

//       <SearchButton onClick={onSearch}>Search</SearchButton>
//     </FiltersContainer>
    
//   );
// };

// export default JobFilters;

// src/Components/JobFilters.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setJobApplicationValues } from "../../../store/reducers/jobApplicationSlice";
import styled from "styled-components";

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SearchButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
`;

const JobFilters = ({ onSearch }) => {
  const dispatch = useDispatch();
  const jobApplicationValues = useSelector((state) => state.jobApplicationSlice.jobApplicationValues);
  const token = localStorage.getItem("jobSeekerLoginToken");

  const [categories, setCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [workplaceTypes, setWorkplaceTypes] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [experienceLevels, setExperienceLevels] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoriesRes, statesRes, workplaceTypesRes, jobTypesRes, experienceLevelsRes] = await Promise.all([
          axios.get("https://api.novajobs.us/api/jobseeker/job-categories", ),
          axios.get("https://api.novajobs.us/api/jobseeker/stats/231"),
          axios.get("https://api.novajobs.us/api/jobseeker/workplace-types", ),
          axios.get("https://api.novajobs.us/api/jobseeker/job-types", ),
          axios.get("https://api.novajobs.us/api/jobseeker/experience-level", ),
        ]);

        setCategories(categoriesRes.data.data);
        setStates(statesRes.data.data);
        setWorkplaceTypes(workplaceTypesRes.data.data);
        setJobTypes(jobTypesRes.data.data);
        setExperienceLevels(experienceLevelsRes.data.data);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchFilters();
  }, [token]);

  const fetchCities = async (stateId) => {
    try {
      const citiesRes = await axios.get(`https://api.novajobs.us/api/jobseeker/cities/${stateId}`);
      setCities(citiesRes.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the store
    dispatch(setJobApplicationValues({ ...jobApplicationValues, [name]: value }));

    // If state_id changes, fetch cities for the selected state
    if (name === "state_id") {
      if (value) {
        fetchCities(value);
      } else {
        setCities([]); // Reset cities if no state is selected
      }
    }

    // Trigger search when filters change
    onSearch();
  };

  return (
    <FiltersContainer>
      <Select name="category" onChange={handleChange} value={jobApplicationValues.category}>
        <option value="">Select a Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>

      <Select name="state_id" onChange={handleChange} value={jobApplicationValues.state_id}>
        <option value="">Select a State</option>
        {states.map((state) => (
          <option key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </Select>

      <Select name="city_id" onChange={handleChange} value={jobApplicationValues.city_id} disabled={!cities.length}>
        <option value="">Select a City</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </Select>

      <Select name="workplace_type" onChange={handleChange} value={jobApplicationValues.workplace_type}>
        <option value="">Select WorkPlace Type</option>
        {workplaceTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </Select>

      <Select name="job_type" onChange={handleChange} value={jobApplicationValues.job_type}>
        <option value="">Select Job Type</option>
        {jobTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </Select>

      <Select name="experience_level" onChange={handleChange} value={jobApplicationValues.experience_level}>
        <option value="">Select Experience Level</option>
        {experienceLevels.map((level) => (
          <option key={level.id} value={level.id}>
            {level.name}
          </option>
        ))}
      </Select>

      <SearchButton onClick={onSearch}>Search</SearchButton>
    </FiltersContainer>
  );
};

export default JobFilters;
