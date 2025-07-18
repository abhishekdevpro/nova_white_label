import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SimpleLoadingSkeleton from "../skeleton/simpleLoadingSkeleton";
import { MutatingDots } from "react-loader-spinner";
import { setProfileImageValue } from "../../store/reducers/jobProfileSlice";
import { setFixedHeaderValues } from "../../store/reducers/fixedHeaderSlice";
import { showToastSuccess, showToastError } from "../../utils/toastify";
import processVid from "../../gif process.mp4";
import "../../css/fixedheader.css";
import { toast } from "react-toastify";
import ProfileStrengthBar from "../../components/ProfileStrengthBar";
import { Loader2 } from "lucide-react";

var bnr = require("./../../images/banner/bnr1.jpg");

const FixedHeader = () => {
  const fileInputRef = useRef(null);
  const [runAiButton, setRunAiButton] = useState("Run AI");
  const [file, setFile] = useState();
  const [AiBtn, setAiBtn] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [showPercentage, setShowPercentage] = useState(false);
  const [percentage, setPercentage] = useState(() => {
    const storedPercentage = localStorage.getItem("resumePercentage");
    return storedPercentage ? JSON.parse(storedPercentage) : null;
  });
  const navigate = useNavigate();
  const [resumeUrl, setResumeUrl] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [basicdetails, setBasicDetails] = useState(false);
  const [imgData, setImgData] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [resumeId, setResumeId] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [error, setError] = useState("");

  const profileImageValue = useSelector(
    (state) => state.jobProfileSlice.profileImageValue
  );
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    dispatch(setProfileImageValue(file));
    console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImgData(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const fixedHeaderValues = useSelector(
    (state) => state.fixedHeaderSlice.fixedHeaderValues
  );
  const jobProfileValues = useSelector(
    (state) => state.jobProfileSlice.jobProfileValues
  );
  const token = localStorage.getItem("jobSeekerLoginToken");

  useEffect(() => {
    if (percentage !== null) {
      localStorage.setItem("resumePercentage", JSON.stringify(percentage));
    }
  }, [percentage]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://apiwl.novajobs.us/api/jobseeker/user-profile",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        let data = response.data.data;
        dispatch(
          setFixedHeaderValues({
            first_name: data.first_name,
            last_name: data.last_name,
            professional_title: data.proffesional_title,
            email: data.email,
            country_id: data.country_id,
            state_id: data.state_id,
            phone: data.phone,
            photo: data.photo,
            n_profile_strength: data.n_profile_strength,
            file_path: data.job_seeker_resumes?.file_path,
          })
        );
        setResumeId(data.rb_job_seeker_resumes.id || 0);
        setResumeUrl(data.rb_job_seeker_resumes?.file_path || "");
        setUploadedFileName(data?.rb_job_seeker_resumes?.file_path.split("/").pop())
        setShowSkeleton(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 401) {
          // Navigate to the /pls route on 401 error
          navigate("/");
          localStorage.removeItem("jobSeekerLoginToken");
        } else {
          console.log(err.response?.data?.message);
          showToastError(err?.response?.data?.message);
        }
      });
  }, [jobProfileValues, token, navigate]);
  const fileName = resumeUrl ? resumeUrl.split("/").pop() : "";

  const [countries, setCountries] = useState([
    {
      id: 0,
      name: "",
    },
  ]);
  const [states, setStates] = useState([
    {
      id: 0,
      name: "",
    },
  ]);

  const getCountry = () => {
    axios({
      method: "GET",
      url: "https://apiwl.novajobs.us/api/jobseeker/countries",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        let country = response.data.data;
        setCountries(country);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  };

  const getState = () => {
    if (!fixedHeaderValues.country_id) {
      return;
    }
    axios({
      method: "GET",
      url: `https://apiwl.novajobs.us/api/jobseeker/stats/${fixedHeaderValues.country_id}`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setStates(response.data.data);
      })
      .catch((err) => {
        console.log(err, "STATE");
        setStates([]);
      });
  };
  useEffect(() => {
    getCountry();
  }, []);

  useEffect(() => {
    dispatch(
      setFixedHeaderValues({
        ...fixedHeaderValues,
        state_id: 0,
      })
    );
    getState();
  }, [fixedHeaderValues.country_id]);

  const getSingleCountry = (countryId) => {
    return countries.find((country) => country.id === countryId)?.name || "";
  };

  const getSingleState = (stateId) => {
    return states.find((state) => state.id === stateId)?.name || "";
  };

  const imagePath = fixedHeaderValues.photo;
  const fullImageUrl = imagePath;

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];

    // Reset previous error
    setError("");

    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Only PDF files are allowed.");
        setFile(null);
        return;
      }

      if (selectedFile.size > 2 * 1024 * 1024) {
        setError("File size must be less than or equal to 2MB.");
        setFile(null);
        return;
      }

      setFile(selectedFile);
    }
  };

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   if (!file) {
  //     toast.error("Please select a file to upload.");
  //     return;
  //   }
  //   setSpinner(true);

  //   const formData = new FormData();
  //   if (file) {
  //     formData.append("files", file);
  //   }

  //   axios
  //     .post(
  //       // "https://apiwl.novajobs.us/api/jobseeker/resume-upload",
  //       "https://apiwl.novajobs.us/api/user/resume-upload",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: token,
  //         },
  //       }
  //     )

  //     .then((res) => {
  //       setSpinner(false);
  //       setResumeUrl(res.data.data[0].file_path);
  //       setAiBtn(false);
  //       console.log(resumeUrl, res, res.data.data[0].file_path);

  //       // setFile(res.data.data.file_path.split("/").pop());
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data.message);
  //       showToastError(error?.response?.data?.message);
  //       setResumeUrl("");
  //     })
  //     .finally(() => {
  //       setSpinner(false);
  //     });
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }
    const max_size = 2 * 1024 * 1024;
        if (file.size > max_size) {
          toast.error("File size should be less than 2MB");
          return;
        }

    setSpinner(true);

    const formData = new FormData();
    formData.append("files", file);

    try {
      const res = await axios.post(
        "https://apiwl.novajobs.us/api/user/resume-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      const filePath = res.data.data[0]?.file_path;

      if(filePath){
        setResumeUrl(filePath);
      setAiBtn(false);
      toast.success(res.data.message  || "Resume uploaded successfully!");
      }
    } catch (error) {
      console.error("Upload error:", error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "Upload failed.");
      setResumeUrl("");
    } finally {
      setSpinner(false);
    }
  };

  const dispatch = useDispatch();

  return (
    <div
      className="overlay-black-dark profile-edit p-t50 p-b20"
      style={{ backgroundImage: "url(" + bnr + ")" }}
    >
      <div className="container">
        <div className="row d-flex align-items-start">
          {/* Candidate Info Section */}
          <div className="col-12 col-md-7 mb-4">
            {showSkeleton ? (
              <SimpleLoadingSkeleton />
            ) : (
              <div className="d-flex flex-column flex-md-row align-items-center text-white">
                {/* Profile Image */}
                <div className="canditate-des text-center mb-3 mb-md-0 me-md-4">
                  <Link to={"#"}>
                    {fixedHeaderValues.photo ? (
                      <img
                        src={fullImageUrl}
                        style={{
                          height: "100px",
                          width: "100px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                        alt="profile"
                      />
                    ) : (
                      <img
                        alt=""
                        src={require("./../../images/team/pic1.jpg")}
                        style={{
                          height: "100px",
                          width: "100px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </Link>
                </div>

                {/* Candidate Text Info */}
                <div className="text-left w-100">
                  {(fixedHeaderValues.first_name ||
                    fixedHeaderValues.last_name) && (
                    <h4 className="m-b0 text-white">
                      {fixedHeaderValues.first_name}{" "}
                      {fixedHeaderValues.last_name}
                      <Link
                        to={"#"}
                        onClick={() => setBasicDetails(true)}
                        className="m-l15 font-16 text-white"
                      ></Link>
                    </h4>
                  )}

                  {fixedHeaderValues.professional_title && (
                    <p className="m-b15 text-white">
                      {fixedHeaderValues.professional_title}
                    </p>
                  )}

                  <ul
                    className="d-flex gap-3 flex-wrap p-0 m-0"
                    style={{ listStyle: "none" }}
                  >
                    {fixedHeaderValues.email && (
                      <li>
                        <i className="ti-email me-1"></i>
                        {fixedHeaderValues.email}
                      </li>
                    )}
                    {fixedHeaderValues.phone && (
                      <li>
                        <i className="ti-mobile me-1"></i>
                        {fixedHeaderValues.phone}
                      </li>
                    )}
                    {fixedHeaderValues.country_id && (
                      <li>
                        <i className="ti-location-pin me-1"></i>
                        {getSingleCountry(fixedHeaderValues.country_id)}
                        {fixedHeaderValues.state_id
                          ? `, ${getSingleState(fixedHeaderValues.state_id)}`
                          : ""}
                      </li>
                    )}
                  </ul>
                  {console.log(
                    fixedHeaderValues.n_profile_strength,
                    "fixedHeaderValues.n_profile_strength"
                  )}
                  {/* Profile Strength */}
                  {/* <div className="progress-bx mt-3">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${fixedHeaderValues.n_profile_strength}%`,
                        }}
                        aria-valuenow={fixedHeaderValues.n_profile_strength}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p className="font-12 m-b0 text-white mt-1">
                      Profile Strength
                    </p>
                  </div> */}
                  <ProfileStrengthBar
                    strength={fixedHeaderValues.n_profile_strength}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Resume Upload Section */}
          <div className="col-12 col-md-5">
            <div className="text-white">
              {resumeUrl && (
                <div className="mb-3">
                  <div>Your Resume is uploaded</div>
                  <div>
                    <span className="ml-2 truncate max-w-xs">{fileName}</span>
                  </div>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="mb-2">
                    Please upload a new resume up to 2MB
                  </div>
                  <div className="form-group">
                    <input
                      type="file"
                      onChange={handleChange}
                      className="form-control"
                      accept=".pdf"
                      // value={uploadedFileName?uploadedFileName:""}
                    />
                  </div>
                  {error && <div className="text-danger mt-2">{error}</div>}
                  {resumeId > 0 && <p className="mt-2">{percentage}</p>}
                </div>

                {spinner ? (
                  <div className="d-flex justify-content-center mt-3">
                    <span
                      className="btn btn-primary d-flex align-items-center gap-2 px-3 py-2"
                      style={{ pointerEvents: "none", opacity: 0.8 }}
                    >
                      <Loader2
                        size={18}
                        className="spin-loader"
                        style={{
                          animation: "spin 1s linear infinite",
                        }}
                      />
                      Uploading...
                    </span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="site-button dz-xs-flex m-t15"
                  >
                    Upload Resume
                  </button>
                )}
              </form>
              {/* <form onSubmit={handleSubmit}>
            <div>
              <div className="mb-2">Please upload a new resume up to 2MB</div>
              <div className="form-group">
                <input
                  type="file"
                  onChange={handleChange}
                  className="form-control"
                  accept=".pdf"
                />
              </div>
              {resumeId > 0 && <p className="mt-2">{percentage}</p>}
            </div>

            {spinner ? (
              <div className="d-flex justify-content-center mt-3">
                <MutatingDots
                  visible={true}
                  height="100"
                  width="100"
                  color="#FFF"
                  secondaryColor="#FFF"
                  radius="12.5"
                  ariaLabel="mutating-dots-loading"
                />
              </div>
            ) : (
              <button
                type="submit"
                className="site-button dz-xs-flex m-t15"
              >
                Upload Resume
              </button>
            )}
          </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedHeader;
