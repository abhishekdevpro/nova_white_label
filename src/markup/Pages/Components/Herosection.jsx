import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import JobseekerForm from "./JobseekerForm";
import PartnerForm from "./Partnersform";
import EmployeeForm from "./EmployeeForm";
import bgimg from "./bg-img.jpg";
import videoSrc from "./herovideo.mp4";
import { useEffect } from "react";
import axios from "axios";
import defaultImg from "../../../assests/hero.jpg";
import { useLogo } from "../../../Context/LogoContext";
import { Search } from "lucide-react";
// import parse from "react-html-parser"

// ... (keep all the existing styled components)
const Video = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: auto; /* Keep the aspect ratio */
  min-height: 100%;
  min-width: 100%;
  object-fit: cover; /* Cover the entire container */
  transform: translate(-50%, -50%);
  z-index: 0; /* Video is behind everything */
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden; /* Prevent overflow due to video */

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6); /* Dark overlay */
    z-index: 1; /* Overlay above video */
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Heading1 = styled.h1`
  font-size: 5rem;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 2; /* Ensure prompt is above the overlay */
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Heading2 = styled.h2`
  font-size: 2rem;
  color: #ff6b6b;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  z-index: 2; /* Ensure prompt is above the overlay */
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const Prompt = styled.p`
  font-size: 2rem;
  color: #ffffff;
  font-weight: 800;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  z-index: 2; /* Ensure prompt is above the overlay */
`;

const OptionWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 800px;
  z-index: 2; /* Ensure prompt is above the overlay */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const OptionLabel = styled.button`
  background-color: ${(props) => (props.selected ? "#ff6b6b" : "#4a4e69")};
  color: #ffffff;
  border: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    background-color: ${(props) => (props.selected ? "#ff8787" : "#5c6283")};
  }

  @media (max-width: 768px) {
    width: 80%;
    margin-bottom: 0.5rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 3rem 1rem 1.5rem;
  border-radius: 2rem;
  border: none;
  font-size: 1.1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 1.5rem;
  font-size: 1.25rem;
  color: #4a4e69;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ff6b6b;
  }
`;

const Modal = styled.div`
  // border: 2px solid red;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 0.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  max-width: 90%;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 90%;
    padding: 0.5rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #4a4e69;
  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ff6b6b;
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  color: #4a4e69;
  // margin-bottom: 1.5rem;
  text-align: center;
`;
const SearchForm2 = styled.form`
  width: 100%;
  max-width: 500px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  z-index: 2;
  position: relative;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction:column;
  align-items: center;
  gap: 0.5rem;
  }
`;

const InputWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #e0e0e0;
  overflow: hidden;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 0.75rem 1rem;
  border: none;
  outline: none;
  font-size: 1rem;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.5rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(0,0,0,0.05);
  }
`;
const SearchForm = styled.form`
  width: 100%;
  max-width: 1000px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  z-index: 2; /* Ensure the search form is above the overlay */
  position: relative; /* Position relative for layering */
`;
// const FormRow = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 1rem;
//   justify-content: space-between;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

const FormGroup = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Input2 = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 1rem center;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #ff6b6b;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff8787;
  }

  img {
    width: 24px;
    vertical-align: middle;
    margin-right: 0.5rem;
  }
`;
const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
`;
const BackgroundMedia = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CareerAdvisorPage = () => {
  const [searchJob, setSearchJob] = useState("");
  const [sector, setSector] = useState("");
  const [location, setLocation] = useState("");
  const [states, setStates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("jobSeekerLoginToken");
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isPartner } = useLogo();
  // console.log(isPartner,"Partner form hero");

  const options = [
    "Jobseeker",
    "Employer",
    "A Partner", // Only add "A Partner" if isPartner is true
  ];

  // Helper function to check file type
  const getFileType = (url) => {
    if (!url) return null;
    const extension = url.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
      return "image";
    } else if (["mp4", "webm", "ogg"].includes(extension)) {
      return "video";
    }
    return null;
  };

  // Render background media based on file type
  const renderBackgroundMedia = (mediaUrl) => {
    const fileType = getFileType(mediaUrl);
    const defaultVideo = videoSrc;
    // const defaultImg = defaultImg;

    if (!mediaUrl) {
      return (
        <Video autoPlay loop muted src={defaultVideo} type="video/mp4">
          Your browser does not support the video tag.
        </Video>
      );
    }
    <img
      src={mediaUrl}
      alt="Background"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />;

    switch (fileType) {
      case "image":
        return <img src={mediaUrl || defaultImg} alt="Background" />;
      case "video":
        return (
          <Video
            autoPlay
            loop
            muted
            src={mediaUrl}
            type={`video/${mediaUrl.split(".").pop()}`}
          >
            Your browser does not support the video tag.
          </Video>
        );
      default:
        return (
          <Video autoPlay loop muted src={defaultVideo} type="video/mp4">
            Your browser does not support the video tag.
          </Video>
        );
    }
  };
  const url = window.location.origin.includes("localhost")
    ? "https://novajobs.us"
    : window.location.origin;

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await axios.get(
          `https://apiwl.novajobs.us/api/jobseeker/general-info?domain=${url}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setPageData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching page data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPageData();
  }, [token]);

  // Keep existing useEffects for states and categories...
  useEffect(() => {
    const getState = async () => {
      try {
        const response = await axios.get(
          `https://apiwl.novajobs.us/api/jobseeker/stats/231`,
          {
            headers: { Authorization: token },
          }
        );
        setStates(response.data.data);
      } catch (err) {
        console.log(err, "STATE fetch error");
      }
    };
    getState();
  }, [token]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get(
          "https://apiwl.novajobs.us/api/jobseeker/job-categories",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCategories(res.data.data);
      } catch (err) {
        console.log(err, "error fetching categories");
      }
    };
    getCategory();
  }, [token]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderForm = () => {
    switch (selectedOption) {
      case "Jobseeker":
        return <JobseekerForm />;
      case "Employer":
        return <EmployeeForm />;
      case "A Partner":
        return window.location.origin === "https://novajobs.us" ?<PartnerForm /> :window.location.href = "https://novajobs.us/white-label" ;
      default:
        return null;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchJob) params.append("title_keywords", searchJob);
    if (sector) params.append("sector", sector);
    if (location) params.append("state_id", location);

    const searchUrl = `/user/jobs?${params.toString()}`;
    console.log(searchUrl, "urrrrrlllll");
    navigate(searchUrl);
  };
    console.log(location,"loooo");

  if (loading) {
    return <Container>Loading...</Container>;
  }
  return (
    <Container>
      <BackgroundMedia>
        {url === "https://novajobs.us" 
          ? renderBackgroundMedia(videoSrc)
          : renderBackgroundMedia(pageData?.home_here_section?.BackgroundMedia)}
      </BackgroundMedia>

      <Heading1
  dangerouslySetInnerHTML={{
    __html: pageData?.home_here_section?.title || "Hello, I'm Aria,"
  }}
/>
<Heading2
  dangerouslySetInnerHTML={{
    __html: pageData?.home_here_section?.description || "Your Personal Career Advisor!"
  }}
/>

      <Prompt>Are You?</Prompt>

      <OptionWrapper>
        {options.map((option, index) => (
          <OptionLabel
            key={index}
            selected={selectedOption === option}
            onClick={() => handleOptionChange(option)}
          >
            {option}
          </OptionLabel>
        ))}
      </OptionWrapper>

      {url==="https://novajobs.us" ?
      <SearchForm onSubmit={handleSearch}>
        <FormRow>
          <FormGroup>
            <Input2
              type="text"
              placeholder="Job Title, Keywords, or Phrase"
              value={searchJob}
              onChange={(e) => setSearchJob(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Button type="submit" className="search-button">
              <img
                src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
                alt="Search"
                className="search-icon"
              />
              Search
            </Button>
          </FormGroup>
        </FormRow>
      </SearchForm>:
         <SearchForm2 onSubmit={handleSearch}>
         <FormRow>
           <InputWrapper>
             <Input
               type="text"
               placeholder="Job Title, Keywords, or Phrase"
               value={searchJob}
               onChange={(e) => setSearchJob(e.target.value)}
             />
             <SearchButton type="submit">
               <Search size={20} color="#666" />
             </SearchButton>
           </InputWrapper>
         </FormRow>
       </SearchForm2>
      }



      {isModalOpen && (
        <>
          <Overlay onClick={closeModal} />
          <Modal>
            <CloseButton onClick={closeModal}>
              <FaTimes />
            </CloseButton>
            <ModalTitle>{selectedOption} Form</ModalTitle>
            {renderForm()}
          </Modal>
        </>
      )}
    </Container>
  );
};

export default CareerAdvisorPage;

// export default CareerAdvisorPage;
