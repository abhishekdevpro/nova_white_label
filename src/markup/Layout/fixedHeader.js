import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SimpleLoadingSkeleton from "../skeleton/simpleLoadingSkeleton";
import { MutatingDots } from "react-loader-spinner";
import { setProfileImageValue } from "../../store/reducers/jobProfileSlice";
import { setFixedHeaderValues } from "../../store/reducers/fixedHeaderSlice";
import { showToastSuccess, showToastError } from "../../utils/toastify";
import processVid from "../../gif process.mp4";
import '../../css/fixedheader.css'

var bnr = require("./../../images/banner/bnr1.jpg");

const FixedHeader = () => {
  const fileInputRef = useRef(null);
  const [runAiButton, setRunAiButton] = useState("Run AI");
  const [file, setFile] = useState();
  const [AiBtn, setAiBtn] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [showPercentage, setShowPercentage] = useState(false);
  const [percentage, setPercentage] = useState(() => {
    const storedPercentage = localStorage.getItem('resumePercentage');
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
      url: "https://api.novajobs.us/api/jobseeker/user-profile",
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
            file_path: data.job_seeker_resumes.file_path,
          })
        );
        setResumeId(data.job_seeker_resumes?.id || 0);
        setResumeUrl(data.job_seeker_resumes?.file_path || "");

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

  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: "https://api.novajobs.us/api/jobseeker/user-profile",
  //     headers: {
  //       Authorization: token,
  //     },
  //   })
  //     .then((response) => {
  //       let data = response.data.data;
  //       dispatch(
  //         setFixedHeaderValues({
  //           first_name: data.first_name,
  //           last_name: data.last_name,
  //           professional_title: data.proffesional_title,
  //           email: data.email,
  //           country_id: data.country_id,
  //           state_id: data.state_id,
  //           phone: data.phone,
  //           photo: data.photo,
  //           n_profile_strength: data.n_profile_strength,
  //         })
  //       );
  //       setResumeId(data.job_seeker_resumes?.id || 0);
  //       setShowSkeleton(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       console.log(err.response.data.message);
  //       showToastError(err?.response?.data?.message);
  //     });
  // }, [jobProfileValues]);

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
      url: "https://api.novajobs.us/api/jobseeker/countries",
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
    axios({
      method: "GET",
      url: `https://api.novajobs.us/api/jobseeker/stats/${fixedHeaderValues.country_id}`,
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
  console.log(fullImageUrl);

  function handleChange(event) {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadedFileName(selectedFile.name);
    } else {
      // Optional: Handle cases where no file is selected
      setUploadedFileName("");
    }
  }

  function handleSubmit(event) {
    setSpinner(true);
    event.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("files", file);
    }

    axios
      .post(
        // "https://api.novajobs.us/api/jobseeker/resume-upload",
        "https://api.novajobs.us/api/user/resume-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      )

      .then((res) => {
        setSpinner(false);
        setResumeUrl(res.data.data[0].file_path);
        setAiBtn(false);
        console.log(resumeUrl, res, res.data.data[0].file_path);

        // setFile(res.data.data.file_path.split("/").pop());
      })
      .catch((error) => {
        console.log(error.response.data.message);
        showToastError(error?.response?.data?.message);
      });
  }

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jobSeekerLoginToken");
    if (resumeUrl) {
      axios({
        method: "post",
        url: "https://api.novajobs.us/api/user/file-based-ai",
        data: {
          keyword: "Rate this resume content in percentage ?",
          file_location: resumeUrl,
        },
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          console.log(res.data.data.content_acuracy_percentage);
          setShowPercentage(true);
          setPercentage(
            `Your AI Resume score is ${res.data.data.content_acuracy_percentage}`
          );
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.data.message);
          showToastError(err?.response?.data?.message);
        });
    }
  }, [resumeUrl]);

  return (
    <div
      className="overlay-black-dark profile-edit p-t50 p-b20"
      style={{ backgroundImage: "url(" + bnr + ")" }}
    >
      <ToastContainer />
      <div className="container">
        <div className="d-flex justify-content-around profile-edit">
          <div className="candidate-info">
            {showSkeleton === true ? (
              <SimpleLoadingSkeleton />
            ) : (
              <div className="d-flex candidate-detail">
                <div className="canditate-des text-center">
                  <Link to={"#"}>
                    {fixedHeaderValues.photo ? (
                      <img src={fullImageUrl} style={{ height: "100px" }} />
                    ) : (
                      <img
                        alt=""
                        src={require("./../../images/team/pic1.jpg")}
                      />
                    )}
                  </Link>
                </div>
                <div className="text-white browse-job text-left">
                  {fixedHeaderValues.first_name ||
                  fixedHeaderValues.last_name ? (
                    <h4 className="m-b0">
                      {fixedHeaderValues.first_name}{" "}
                      {fixedHeaderValues.last_name}
                      <Link
                        to={"#"}
                        onClick={() => setBasicDetails(true)}
                        className="m-l15 font-16 text-white"
                      ></Link>
                    </h4>
                  ) : null}
                  {fixedHeaderValues.professional_title ? (
                    <p className="m-b15">
                      {fixedHeaderValues.professional_title}
                    </p>
                  ) : null}
                  <ul className="clearfix">
                    {fixedHeaderValues.email ? (
                      <li>
                        <i className="ti-email"></i>
                        {fixedHeaderValues.email}
                      </li>
                    ) : null}
                    {fixedHeaderValues.phone ? (
                      <li>
                        <i className="ti-mobile"></i>
                        {fixedHeaderValues.phone}
                      </li>
                    ) : null}
                    {fixedHeaderValues.country_id ? (
                      <li>
                        <i className="ti-location-pin"></i>
                        {getSingleCountry(fixedHeaderValues.country_id)}{" "}
                        {fixedHeaderValues.state_id ? (
                          <>{`, ${getSingleState(
                            fixedHeaderValues.state_id
                          )}`}</>
                        ) : (
                          ""
                        )}
                      </li>
                    ) : null}
                  </ul>

                  <div className="progress-bx mb-5">
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
                    <p className="font-12 m-b0">Profile Strength</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="ms-5 float-end">
            <div>
              <div>
                {resumeUrl && (
                  <div>
                    <div className="text-white">Your Resume is uploaded</div>
                    <div>
                      <span className="ml-2 truncate max-w-xs text-white">
                        {fileName}
                      </span>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className="text-white">
                      Please upload a new resume up to 2MB
                    </div>
                    <div className="form-group">
                      <input
                        type="file"
                        onChange={handleChange}
                        className="form-control"
                        accept=".pdf"
                      />
                    </div>
                    {resumeId > 0 && <p className="text-white">{percentage}</p>}
                  </div>
                  {spinner ? (
                    <MutatingDots
                      visible={true}
                      height="100"
                      width="100"
                      color="#1c2957"
                      secondaryColor="#1c2957"
                      radius="12.5"
                      ariaLabel="mutating-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <button
                      type="submit"
                      className="site-button dz-xs-flex m-r5"
                    >
                      Upload Resume
                    </button>
                  )}
                </form>
              </div>
              <button
                className="site-button dz-xs-flex m-r5 mt-2"
                onClick={(e) => {
                  navigate("/");
                }}
              >
                Go To Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedHeader;
