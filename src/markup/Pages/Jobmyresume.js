import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Listingsidebar from "./../Element/Listingsidebar";
import Profilesidebar from "../Element/Profilesidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import { showToastError } from "../../utils/toastify";
import { useDispatch } from "react-redux";
import {
  Page,
  View,
  Document,
  Text,
  PDFDownloadLink,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import {
  setCertificationData,
  setCertificationValue,
  setDesiredCareerProfile,
  setEducationData,
  setEmploymentData,
  setItSkillsData,
  setOnlineProfileData,
  setOnlineProfileValue,
  setPatentData,
  setPatentValue,
  setPersonalDetailsValue,
  setPresentationData,
  setPresentationValue,
  setProfileSummaryValue,
  setProjectsData,
  setResumeData,
  setResumeHeadline,
  setSkillsData,
  setSkillsValue,
  setWhitePaperData,
  setWhitePaperValue,
  setWorkSampleData,
  setWorkSampleValue,
} from "../../store/reducers/jobsMyResumeSlice";
import { useEffect } from "react";
import JobPageSkeleton from "../skeleton/jobPage";
import FixedHeader from "../Layout/fixedHeader";
import { FaEdit } from "react-icons/fa";
import SkillsComponent from "../jobMyResumeComponents/skills";
import EmploymentComponent from "../jobMyResumeComponents/employment";
import EducationComponent from "../jobMyResumeComponents/education";
import ITSkillsComponent from "../jobMyResumeComponents/itSkills";
import ProjectsComponent from "../jobMyResumeComponents/projects";
import DesiredCareerComponent from "../jobMyResumeComponents/desiredCareer";
import PersonalDetailsComponent from "../jobMyResumeComponents/personalDetails";
import PoppinsRegular from "../../fonts/Poppins/Poppins-Regular.ttf";
import PoppinsSemibold from "../../fonts/Poppins/Poppins-SemiBold.ttf";
import PoppinsBold from "../../fonts/Poppins/Poppins-Bold.ttf";
import PoppinsItalic from "../../fonts/Poppins/Poppins-Italic.ttf";
import PoppinsBoldItalic from "../../fonts/Poppins/Poppins-BoldItalic.ttf";

var bnr = require("./../../images/banner/bnr1.jpg");
//var bnr2 = require('./../../images/background/bg3.jpg');

function Jobmyresume() {
  const [showSkeleton, setShowSkeleton] = useState(true);
  // redux imports
  const resumeHeadline = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.resumeHeadline
  );
  const skillsData = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.skillsData
  );
  const employmentData = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.employmentData
  );

  const educationData = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.educationData
  );
  const itSkillsData = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.itSkillsData
  );
  const projectsData = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.projectsData
  );
  const profileSummaryValue = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.profileSummaryValue
  );

  const desiredCareerProfile = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.desiredCareerProfile
  );
  const personalDetailsValue = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.personalDetailsValue
  );
  const attachResumeValue = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.attachResumeValue
  );
  // accomplishments import
  const onlineProfileValue = useSelector(
    (state) =>
      state.jobsMyResumeSlice.jobsMyResumeData.accomplishments
        .onlineProfileValue
  );

  const onlineProfileData = useSelector(
    (state) =>
      state.jobsMyResumeSlice.jobsMyResumeData.accomplishments.onlineProfileData
  );
  const workSampleValue = useSelector(
    (state) =>
      state.jobsMyResumeSlice.jobsMyResumeData.accomplishments.workSampleValue
  );
  const workSampleData = useSelector(
    (state) =>
      state.jobsMyResumeSlice.jobsMyResumeData.accomplishments.workSampleData
  );
  const whitePaperValue = useSelector(
    (state) =>
      state.jobsMyResumeSlice.jobsMyResumeData.accomplishments.whitePaperValue
  );
  const whitePaperData = useSelector(
    (state) =>
      state.jobsMyResumeSlice.jobsMyResumeData.accomplishments.whitePaperData
  );
  const presentationValue = useSelector(
    (state) =>
      state.jobsMyResumeSlice.jobsMyResumeData.accomplishments.presentationValue
  );
  const presentationData = useSelector(
    (state) =>
      state.jobsMyResumeSlice.jobsMyResumeData.accomplishments.presentationData
  );
  const patentValue = useSelector(
    (state) =>
      state.jobsMyResumeSlice.jobsMyResumeData.accomplishments.patentValue
  );
  const patentData = useSelector(
    (state) =>
      state.jobsMyResumeSlice.jobsMyResumeData.accomplishments.patentData
  );
  const certificationValue = useSelector(
    (state) =>
      state.jobsMyResumeSlice.jobsMyResumeData.accomplishments
        .certificationValue
  );
  const certificationData = useSelector(
    (state) =>
      state.jobsMyResumeSlice.jobsMyResumeData.accomplishments.certificationData
  );
  const skillsValue = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData.skillsValue
  );
  const token = localStorage.getItem("jobSeekerLoginToken");
  const dispatch = useDispatch();

  const jobsMyResumeData = useSelector(
    (state) => state.jobsMyResumeSlice.jobsMyResumeData
  );

  const handlePdfLink = () => {
    console.log("Clicked Successfully");
  };

  // axios req

  const getResumeData = async () => {
    axios({
      url: "https://apiwl.novajobs.us/api/jobseeker/user-profile",
      method: "Get",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      let data = res?.data?.data?.ai_resume_parse_data;
      dispatch(setResumeHeadline(data?.jobsMyResumeData?.resumeHeadline));
      dispatch(setSkillsData(data?.jobsMyResumeData?.skillsData || []));
      dispatch(setEmploymentData(data?.jobsMyResumeData?.employmentData || []));
      dispatch(setEducationData(data?.jobsMyResumeData?.educationData || []));
      dispatch(setItSkillsData(data?.jobsMyResumeData?.itSkillsData || []));
      dispatch(setProjectsData(data?.jobsMyResumeData?.projectsData || []));
      dispatch(
        setProfileSummaryValue(data?.jobsMyResumeData?.profileSummaryValue)
      );
      dispatch(
        setOnlineProfileData(
          data.jobsMyResumeData?.accomplishments?.onlineProfileData || []
        )
      );
      dispatch(
        setWorkSampleData(
          data?.jobsMyResumeData?.accomplishments?.workSampleData || []
        )
      );
      dispatch(
        setWhitePaperData(
          data?.jobsMyResumeData?.accomplishments?.whitePaperData || []
        )
      );
      dispatch(
        setPatentData(data?.jobsMyResumeData?.accomplishments?.patentData || [])
      );
      dispatch(
        setPresentationData(
          data?.jobsMyResumeData?.accomplishments?.presentationData || []
        )
      );
      dispatch(
        setCertificationData(
          data?.jobsMyResumeData?.accomplishments?.certificationData || []
        )
      );
      dispatch(
        setDesiredCareerProfile(data?.jobsMyResumeData?.desiredCareerProfile)
      );
      dispatch(
        setPersonalDetailsValue(data?.jobsMyResumeData?.personalDetails)
      );
      setShowSkeleton(false);
    });
  };
  useEffect(() => {
    getResumeData();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setResumeData({ ...jobsMyResumeData, [name]: value }));
  };
  const [basicdetails, setBasicDetails] = useState(false);
  const [resume, setResume] = useState(false);
  const [keyskill, setKeyskill] = useState(false);
  const [employment, setEmployment] = useState(false);
  const [education, setEducation] = useState(false);
  const [itskills, setItSkills] = useState(false);
  const [projects, setProjects] = useState(false);
  const [profilesummary, setProfileSummary] = useState(false);
  const [onlineprofile, setOnlineProfile] = useState(false);
  const [worksample, setWorkSample] = useState(false);
  const [whitepaper, setWhitePaper] = useState(false);
  const [presentation, setPresentation] = useState(false);
  const [patent, setPatent] = useState(false);
  const [certification, setCertification] = useState(false);
  const [careerprofile, setCareerProfile] = useState(false);
  const [personaldetails, setPersonalDetails] = useState(false);

  // handleChanges for accomplishments
  const handleOnlineProfileChange = (e) => {
    const { name, value } = e.target;
    dispatch(setOnlineProfileValue({ ...onlineProfileValue, [name]: value }));
  };
  const handleWorkSampleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setWorkSampleValue({ ...workSampleValue, [name]: value }));
  };
  const handleWhitePaperChange = (e) => {
    const { name, value } = e.target;
    dispatch(setWhitePaperValue({ ...whitePaperValue, [name]: value }));
  };
  const handlePresentationChange = (e) => {
    const { name, value } = e.target;
    dispatch(setPresentationValue({ ...presentationValue, [name]: value }));
  };
  const handlePatentChange = (e) => {
    const { name, value } = e.target;
    dispatch(setPatentValue({ ...patentValue, [name]: value }));
  };
  const handleCertificationChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCertificationValue({ ...certificationValue, [name]: value }));
  };

  // online profile

  const [editOnlineIndex, setEditOnlineIndex] = useState(-1);

  const updateOnlineItem = () => {
    if (editOnlineIndex === -1) return;

    const updatedFormData = [...onlineProfileData];
    updatedFormData[editOnlineIndex] = {
      ...updatedFormData[editOnlineIndex],
      ...onlineProfileValue,
    };
    dispatch(setOnlineProfileData(updatedFormData));
    setOnlineProfile(false);
    setOnlineProfileValue({
      label: "",
      link: "",
    });
    setEditOnlineIndex(-1);
  };

  const editOnlineItem = (index) => {
    const item = onlineProfileData[index];
    const editData = {
      label: item.label,
      link: item.link,
    };
    dispatch(setOnlineProfileValue(editData));
    setEditOnlineIndex(index);
    setOnlineProfile(true);
  };

  const handleAddOnlineProfile = () => {
    if (editOnlineIndex !== -1) {
      return;
    }
    const trimmedLabel = onlineProfileValue.label.trim();
    const trimmedLink = onlineProfileValue.link.trim();
    if (trimmedLabel && trimmedLink) {
      const newItem = {
        label: trimmedLabel,
        link: trimmedLink,
      };
      const newData = [...onlineProfileData, newItem];
      dispatch(setOnlineProfileData(newData));
      dispatch(
        setOnlineProfileValue({
          label: "",
          link: "",
        })
      );
      setOnlineProfile(false);
    }
  };
  // online profile update and edit logic ends here

  // workSample logic

  const [editWorkIndex, setEditWorkIndex] = useState(-1);

  const updateWorkItem = () => {
    if (editWorkIndex === -1) return;

    const updatedFormData = [...workSampleData];
    updatedFormData[editWorkIndex] = {
      ...updatedFormData[editWorkIndex],
      ...workSampleValue,
    };
    dispatch(setWorkSampleData(updatedFormData));
    setWorkSample(false);
    setEditWorkIndex(-1);
  };

  const editWorkItem = (index) => {
    const item = workSampleData[index];
    const editData = {
      label: item.label,
      link: item.link,
    };
    dispatch(setWorkSampleValue(editData));
    setEditWorkIndex(index);
    setWorkSample(true);
  };

  const handleAddWorkItem = () => {
    if (editWorkIndex !== -1) {
      return;
    }
    const trimmedLabel = workSampleValue.label.trim();
    const trimmedLink = workSampleValue.link.trim();
    if (trimmedLabel && trimmedLink) {
      const newItem = {
        label: trimmedLabel,
        link: trimmedLink,
      };
      const newData = [...workSampleData, newItem];
      dispatch(setWorkSampleData(newData));
      dispatch(
        setWorkSampleValue({
          label: "",
          link: "",
        })
      );
      setWorkSample(false);
    }
  };
  // workSample Logic Ends here

  // whitePaper edit update Logic Starts

  const [editWhitePaperIndex, setEditWhitePaperIndex] = useState(-1);

  const updateWhitePaperItem = () => {
    if (editWhitePaperIndex === -1) return;

    const updatedFormData = [...whitePaperData];
    updatedFormData[editWhitePaperIndex] = {
      ...updatedFormData[editWhitePaperIndex],
      ...whitePaperValue,
    };
    dispatch(setWhitePaperData(updatedFormData));
    setWhitePaper(false);
    setEditWhitePaperIndex(-1);
  };

  const editWhitePaperItem = (index) => {
    const item = whitePaperData[index];
    const editData = {
      label: item.label,
      link: item.link,
    };
    dispatch(setWhitePaperValue(editData));
    setEditWhitePaperIndex(index);
    setWhitePaper(true);
  };

  const handleAddWhitePaperItem = () => {
    if (editWhitePaperIndex !== -1) {
      return;
    }
    const trimmedLabel = whitePaperValue.label.trim();
    const trimmedLink = whitePaperValue.link.trim();
    if (trimmedLabel && trimmedLink) {
      const newItem = {
        label: trimmedLabel,
        link: trimmedLink,
      };
      const newData = [...whitePaperData, newItem];
      dispatch(setWhitePaperData(newData));
      dispatch(
        setWhitePaperValue({
          label: "",
          link: "",
        })
      );
      setWhitePaper(false);
    }
  };

  // whitePaper edit update Logic ends

  // presentation edit update logic starts

  const [editPresentationIndex, setEditPresentationIndex] = useState(-1);

  const updatePresentationItem = () => {
    if (editPresentationIndex === -1) return;

    const updatedFormData = [...presentationData];
    updatedFormData[editPresentationIndex] = {
      ...updatedFormData[editPresentationIndex],
      ...presentationValue,
    };
    dispatch(setPresentationData(updatedFormData));
    setPresentation(false);
    setEditPresentationIndex(-1);
  };

  const editPresentationItem = (index) => {
    const item = presentationData[index];
    const editData = {
      label: item.label,
      link: item.link,
    };
    dispatch(setPresentationValue(editData));
    setEditPresentationIndex(index);
    setPresentation(true);
  };

  const handleAddPresentationItem = () => {
    if (editPresentationIndex !== -1) {
      return;
    }
    const trimmedLabel = presentationValue.label.trim();
    const trimmedLink = presentationValue.link.trim();
    if (trimmedLabel && trimmedLink) {
      const newItem = {
        label: trimmedLabel,
        link: trimmedLink,
      };
      const newData = [...presentationData, newItem];
      dispatch(setPresentationData(newData));
      dispatch(
        setPresentationValue({
          label: "",
          link: "",
        })
      );
      setPresentation(false);
    }
  };

  // presentation edit update logic ends

  // patent Edit update logic starts

  const [editPatentIndex, setEditPatentIndex] = useState(-1);

  const updatePatentItem = () => {
    if (editPatentIndex === -1) return;

    const updatedFormData = [...patentData];
    updatedFormData[editPatentIndex] = {
      ...updatedFormData[editPatentIndex],
      ...patentValue,
    };
    dispatch(setPatentData(updatedFormData));
    setPatent(false);
    setEditPatentIndex(-1);
  };

  const editPatentItem = (index) => {
    const item = patentData[index];
    const editData = {
      label: item.label,
      link: item.link,
    };
    dispatch(setPatentValue(editData));
    setEditPatentIndex(index);
    setPatent(true);
  };

  const handleAddPatentItem = () => {
    if (editPatentIndex !== -1) {
      return;
    }
    const trimmedLabel = patentValue.label.trim();
    const trimmedLink = patentValue.link.trim();
    if (trimmedLabel && trimmedLink) {
      const newItem = {
        label: trimmedLabel,
        link: trimmedLink,
      };
      const newData = [...patentData, newItem];
      dispatch(setPatentData(newData));
      dispatch(
        setPatentValue({
          label: "",
          link: "",
        })
      );
      setPatent(false);
    }
  };
  // patent edit update logic ends

  // certification edit update logic starts
  const [editCertificationIndex, setEditCertificationIndex] = useState(-1);

  const updateCertificationItem = () => {
    if (editCertificationIndex === -1) return;

    const updatedFormData = [...certificationData];
    updatedFormData[editCertificationIndex] = {
      ...updatedFormData[editCertificationIndex],
      ...certificationValue,
    };
    dispatch(setCertificationData(updatedFormData));
    setCertification(false);
    setEditCertificationIndex(-1);
  };

  const editCertificationItem = (index) => {
    const item = certificationData[index];
    const editData = {
      label: item.label,
      link: item.link,
    };
    dispatch(setCertificationValue(editData));
    setEditCertificationIndex(index);
    setCertification(true);
  };

  const handleAddCertificationItem = () => {
    if (editCertificationIndex !== -1) {
      return;
    }
    const trimmedLabel = certificationValue.label.trim();
    const trimmedLink = certificationValue.link.trim();
    if (trimmedLabel && trimmedLink) {
      const newItem = {
        label: trimmedLabel,
        link: trimmedLink,
      };
      const newData = [...certificationData, newItem];
      dispatch(setCertificationData(newData));
      dispatch(
        setCertificationValue({
          label: "",
          link: "",
        })
      );
      setCertification(false);
    }
  };

  // certification edit update logic ends

  const reqBody = {
    jobsMyResumeData: {
      accomplishments: jobsMyResumeData.accomplishments,
      educationData: jobsMyResumeData.educationData,
      employmentData: jobsMyResumeData.employmentData,
      skillsData: jobsMyResumeData.skillsData,
      resumeHeadline: jobsMyResumeData.resumeHeadline,
      projectsData: jobsMyResumeData.projectsData,
      desiredCareerProfile: jobsMyResumeData.desiredCareerProfile,
      itSkillsData: jobsMyResumeData.itSkillsData,
      personalDetails: jobsMyResumeData.personalDetailsValue,
      profileSummaryValue: jobsMyResumeData.profileSummaryValue,
    },
  };

  const handleUpdateResume = () => {
    axios({
      method: "PUT",
      url: "https://apiwl.novajobs.us/api/jobseeker/resume-update",
      headers: {
        Authorization: token,
      },
      data: reqBody,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  };

  const Resume6Download = () => {
    Font.register({
      family: "Poppins-regular",
      src: PoppinsRegular,
    });
    Font.register({
      family: "Poppins-semi",
      src: PoppinsSemibold,
    });

    Font.register({
      family: "Poppins-bold",
      src: PoppinsBold,
    });
    Font.register({
      family: "Poppins-italic",
      src: PoppinsItalic,
    });
    Font.register({
      family: "Poppins-boldItalic",
      src: PoppinsBoldItalic,
    });

    const styles = StyleSheet.create({
      mainContainer: {
        width: "100%",
        height: "100%",
        padding: "50px",
        display: "flex",
        flexDirection: "column",
        gap: "7px",
        fontSize: "9px",
        lineHeight: 1.5,
        backgroundColor: "#f0f0f0",
      },
      imageValueContainer: {
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        justifyContent: "space-between",
      },
      imageValueBox: {
        width: "150px",
        height: "150px",
        borderRadius: "150px",
        border: "4px",
        borderColor: "#3a415c",
      },
      imageValue: {
        width: "100%",
        height: "100%",
        objectFit: "fill",
        borderRadius: "150px",
      },
      imageValueContent: {
        width: "55%",
        display: "flex",
        flexDirection: "column",
        gap: "7px",
      },
      withoutImageValueContent: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "7px",
      },
      flexColContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "2px",
      },
      name: {
        fontSize: "22px",
        fontFamily: "Poppins-bold",
        color: "#3a415c",
      },
      nameJobTitle: {
        fontSize: "14px",
        color: "#3a415c",
        fontFamily: "Poppins-semi",
      },
      personalDetailsContainer: {
        paddingTop: "12px",
        marginTop: "7px",
        borderTop: "1px",
        borderColor: "#3a415c",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      },
      flexRowContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "4px",
        flexWrap: "wrap",
      },

      flexRowContainerGap7: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "15px",
        flexWrap: "wrap",
      },

      flexColumnContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "7px",
        marginBottom: "0px",
      },
      mediumText: {
        fontFamily: "Poppins-semi",
      },

      flexColumnGap4: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        width: "100%",
      },
      headingContainer: {
        display: "flex",
        flexDirection: "row",
        color: "#3a415c",
        alignItems: "center",
        gap: "4px",
        width: "100%",
      },
      heading: {
        fontFamily: "Poppins-semi",
        width: "50%",
        fontSize: "12px",
      },
      headingLine: {
        borderTop: "1px",
        borderColor: "#3a415c",
        height: "2px",
        width: "100%",
      },
      justifyBetweenContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      linkItem: {
        textDecoration: "underline",
        color: "black",
      },
      normalText: {
        lineHeight: 1.5,
        fontSize: "9px",
      },
      bold: {
        fontFamily: "Poppins-bold",
        marginBottom: "0px",
      },
      italic: {
        fontFamily: "Poppins-italic",
        marginBottom: "0px",
      },
      underline: {
        textDecoration: "underline",
        marginBottom: "0px",
      },
      boldItalic: {
        fontFamily: "Poppins-boldItalic",
        marginBottom: "0px",
      },
      listItem: {
        display: "flex",
        flexDirection: "row",
        gap: "7px",
      },
      listItemContent: {
        flex: 1,
        textAlign: "left",
        paddingLeft: 5,
        fontSize: "9px",
      },
      list: {
        fontSize: "9px",
      },
      listStyle: {
        display: "flex",
        flexDirection: "row",
        gap: "4px",
        alignItems: "center",
        width: "30%",
        justifyContent: "center",
      },
      bulletPoint: {
        alignSelf: "flex-start",
      },
    });

    // const parseInline = (text) => {
    //   text = text.replace(/<span class="ql-cursor">.*?<\/span>/g, "");

    //   const parts = text.split(/(<\/?(?:em|strong|u|br ?\/?)>)/g);

    //   let combinedStyles = [];

    //   for (let i = 0; i < parts.length; i++) {
    //     let part = parts[i];
    //     if (part === "<strong>" || part === "<em>" || part === "<u>") {
    //       let nextPart = parts[i + 2];
    //       if (
    //         (part === "<strong>" && nextPart === "<em>") ||
    //         (part === "<em>" && nextPart === "<strong>")
    //       ) {
    //         combinedStyles.push(
    //           <Text key={`bold-italic-${i}`} style={styles.boldItalic}>
    //             {parts[i + 3]}
    //           </Text>
    //         );
    //         i += 4;
    //       } else if (part === "<strong>") {
    //         combinedStyles.push(
    //           <Text key={`bold-${i}`} style={styles.bold}>
    //             {parts[i + 1]}
    //           </Text>
    //         );
    //         i += 2;
    //       } else if (part === "<em>") {
    //         combinedStyles.push(
    //           <Text key={`italic-${i}`} style={styles.italic}>
    //             {parts[i + 1]}
    //           </Text>
    //         );
    //         i += 2;
    //       } else if (part === "<u>") {
    //         combinedStyles.push(
    //           <Text key={`underline-${i}`} style={styles.underline}>
    //             {parts[i + 1]}
    //           </Text>
    //         );
    //         i += 2;
    //       }
    //     } else if (!part.match(/^<\/?(?:em|strong|u|br ?\/?)>$/)) {
    //       // It's just text or ignored tags
    //       combinedStyles.push(<Text key={`text-${i}`}>{part}</Text>);
    //     }
    //   }

    //   return combinedStyles.filter((component) => component != null);
    // };

    // const parseHtml = (html) => {
    //   const regex =
    //     /<p>(.*?)<\/p>|<li>(.*?)<\/li>|<ul>(.*?)<\/ul>|<ol>(.*?)<\/ol>/g;
    //   let match;
    //   const output = [];

    //   while ((match = regex.exec(html))) {
    //     if (match[1]) {
    //       output.push(
    //         <Text key={match.index} style={styles.paragraph}>
    //           {parseInline(match[1])}
    //         </Text>
    //       );
    //     } else if (match[2]) {
    //       output.push(
    //         <View key={match.index} style={styles.listItem}>
    //           <Text>{"\u2022 "}</Text>
    //           {parseInline(match[2])}
    //         </View>
    //       );
    //     } else if (match[3]) {
    //       const listItems = match[3];
    //       const listItemRegex = /<li>(.*?)<\/li>/g;
    //       let listItemMatch;
    //       const listContent = [];
    //       while ((listItemMatch = listItemRegex.exec(listItems))) {
    //         listContent.push(
    //           <View key={listItemMatch.index} style={styles.listItem}>
    //             <Text>{"\u2022 "}</Text>
    //             {parseInline(listItemMatch[1])}
    //           </View>
    //         );
    //       }
    //       output.push(
    //         <View key={match.index} style={styles.list}>
    //           {listContent}
    //         </View>
    //       );
    //     } else if (match[4]) {
    //     }
    //   }
    //   return output;
    // };
    const ListItem = ({ children }) => (
      <View style={styles.listItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.text}>{children}</Text>
      </View>
    );
    return (
      <Document>
        <Page size="A4" style={styles.mainContainer}>
          <View style={styles.withoutImageValueContent}>
            {/* {personalInfoValues.firstName ||
            personalInfoValues.lastName ||
            personalInfoValues.jobTitle ? (
              <View style={styles.flexColContainer}>
                {personalInfoValues.firstName ||
                personalInfoValues.lastName ? (
                  <Text style={styles.name}>
                    {personalInfoValues.firstName}{" "}
                    {personalInfoValues.lastName}
                  </Text>
                ) : null}
                {personalInfoValues.jobTitle ? (
                  <Text style={styles.nameJobTitle}>
                    {personalInfoValues.jobTitle}
                  </Text>
                ) : null}
              </View>
            ) : null} */}

            {resumeHeadline ? (
              <View style={styles.flexColumnGap4}>
                <Text style={styles.heading}>Resume Headline</Text>
                <Text>{resumeHeadline}</Text>
              </View>
            ) : null}

            {personalDetailsValue.dateOfBirth ||
            personalDetailsValue.gender ||
            personalDetailsValue.maritalStatus ||
            personalDetailsValue.passportNumber ||
            personalDetailsValue.differentlyAbled ||
            personalDetailsValue.languages ||
            personalDetailsValue.addPermanentAddress ||
            personalDetailsValue.areaPinCode ||
            personalDetailsValue.homeTown ||
            personalDetailsValue.workPermitOfOtherCountry ? (
              <View style={styles.flexRowContainerGap7}>
                {personalDetailsValue.dateOfBirth ? (
                  <View style={styles.flexColumnContainer}>
                    <Text style={styles.mediumText}>Date Of Birth :</Text>
                    <Text>{personalDetailsValue.dateOfBirth}</Text>
                  </View>
                ) : null}
                {personalDetailsValue.gender ? (
                  <View style={styles.flexColumnContainer}>
                    <Text style={styles.mediumText}>Gender :</Text>
                    <Text>{personalDetailsValue.gender}</Text>
                  </View>
                ) : null}

                {personalDetailsValue.maritalStatus ? (
                  <View style={styles.flexColumnContainer}>
                    <Text style={styles.mediumText}>Marital Status :</Text>
                    <Text>{personalDetailsValue.maritalStatus}</Text>
                  </View>
                ) : null}
                {personalDetailsValue.passportNumber ? (
                  <View style={styles.flexColumnContainer}>
                    <Text style={styles.mediumText}>Passport Number</Text>
                    <Text>{personalDetailsValue.passportNumber}</Text>
                  </View>
                ) : null}

                {personalDetailsValue.workPermitOfOtherCountry ? (
                  <View style={styles.flexColumnContainer}>
                    <Text style={styles.mediumText}>Work Permit</Text>
                    <Text>{personalDetailsValue.workPermitOfOtherCountry}</Text>
                  </View>
                ) : null}
              </View>
            ) : null}
            {personalDetailsValue.differentlyAbled ||
            personalDetailsValue.languages ||
            personalDetailsValue.addPermanentAddress ||
            personalDetailsValue.areaPinCode ||
            personalDetailsValue.homeTown ? (
              <View style={styles.flexColumnContainer}>
                <Text style={styles.mediumText}>Details :</Text>
                <View style={styles.flexRowContainerGap7}>
                  {personalDetailsValue.languages ? (
                    <View style={styles.flexColumnContainer}>
                      <Text style={styles.mediumText}>Languages</Text>
                      <Text>{personalDetailsValue.languages}</Text>
                    </View>
                  ) : null}
                  {personalDetailsValue.differentlyAbled ? (
                    <View style={styles.flexColumnContainer}>
                      <Text style={styles.mediumText}>Differently Abled</Text>
                      <Text>{personalDetailsValue.differentlyAbled}</Text>
                    </View>
                  ) : null}
                  {personalDetailsValue.addPermanentAddress ? (
                    <View style={styles.flexColumnContainer}>
                      <Text style={styles.mediumText}>
                        Add Permanent Address
                      </Text>
                      <Text>{personalDetailsValue.addPermanentAddress}</Text>
                    </View>
                  ) : null}
                  {personalDetailsValue.areaPinCode ? (
                    <View style={styles.flexColumnContainer}>
                      <Text style={styles.mediumText}>Area Pincode</Text>
                      <Text>{personalDetailsValue.areaPinCode}</Text>
                    </View>
                  ) : null}

                  {personalDetailsValue.homeTown ? (
                    <View style={styles.flexColumnContainer}>
                      <Text style={styles.mediumText}>HomeTown</Text>
                      <Text>{personalDetailsValue.homeTown}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
            ) : null}

            {desiredCareerProfile ? (
              <View style={styles.flexColumnContainer}>
                <Text style={styles.mediumText}>Desired Career Profile:</Text>
                <View style={styles.flexRowContainerGap7}>
                  {desiredCareerProfile.industry ? (
                    <View style={styles.flexColumnContainer}>
                      <Text style={styles.mediumText}>Industry</Text>
                      <Text>{desiredCareerProfile.industry}</Text>
                    </View>
                  ) : null}

                  {desiredCareerProfile.role ? (
                    <View style={styles.flexColumnContainer}>
                      <Text style={styles.mediumText}>Role</Text>
                      <Text>{desiredCareerProfile.role}</Text>
                    </View>
                  ) : null}

                  {desiredCareerProfile.employmentType ? (
                    <View style={styles.flexColumnContainer}>
                      <Text style={styles.mediumText}>Employment Type</Text>
                      <Text>{desiredCareerProfile.employmentType}</Text>
                    </View>
                  ) : null}

                  {desiredCareerProfile.availabilityToJoin ? (
                    <View style={styles.flexColumnContainer}>
                      <Text style={styles.mediumText}>
                        Availability To Join
                      </Text>
                      <Text>{desiredCareerProfile.availabilityToJoin}</Text>
                    </View>
                  ) : null}
                </View>
                <View style={styles.flexRowContainerGap7}>
                  {desiredCareerProfile.desiredLocation ? (
                    <View style={styles.flexColumnContainer}>
                      <Text style={styles.mediumText}>Desired Location</Text>
                      <Text>{desiredCareerProfile.desiredLocation}</Text>
                    </View>
                  ) : null}

                  {desiredCareerProfile.functionalArea ? (
                    <View style={styles.flexColumnContainer}>
                      <Text style={styles.mediumText}>Functional Area</Text>
                      <Text>{desiredCareerProfile.functionalArea}</Text>
                    </View>
                  ) : null}

                  {desiredCareerProfile.jobType ? (
                    <View style={styles.flexColumnContainer}>
                      <Text style={styles.mediumText}>Job Type</Text>
                      <Text>{desiredCareerProfile.jobType}</Text>
                    </View>
                  ) : null}

                  {desiredCareerProfile.desiredShift ? (
                    <View style={styles.flexColumnContainer}>
                      <Text style={styles.mediumText}>Desired Shift</Text>
                      <Text>{desiredCareerProfile.desiredShift}</Text>
                    </View>
                  ) : null}

                  {desiredCareerProfile.expectedSalary ? (
                    <View style={styles.flexColumnContainer}>
                      <Text style={styles.mediumText}>Expected Salary</Text>
                      <Text>{desiredCareerProfile.expectedSalary}</Text>
                    </View>
                  ) : null}

                  {desiredCareerProfile.desiredIndustry ? (
                    <View style={styles.flexColumnContainer}>
                      <Text style={styles.mediumText}>Desired Industry</Text>
                      <Text>{desiredCareerProfile.desiredIndustry}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
            ) : null}
          </View>

          {profileSummaryValue ? (
            <View style={styles.flexColumnGap4}>
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>CAREER OBJECTIVE</Text>
                <View style={styles.headingLine}></View>
              </View>
              <Text style={styles.normalText}>{profileSummaryValue}</Text>
            </View>
          ) : null}

          {educationData ? (
            <View style={styles.withoutImageValueContent}>
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>EDUCATION</Text>
                <View style={styles.headingLine}></View>
              </View>
              {educationData.map((item, index) => {
                return (
                  <View key={index} style={styles.flexColumnGap4}>
                    <View style={styles.justifyBetweenContainer}>
                      <Text style={styles.mediumText}>
                        {item.education}, {item.course}
                      </Text>
                      <Text>{item.passOutDate}</Text>
                    </View>
                    <ListItem>{item.university}</ListItem>
                  </View>
                );
              })}
            </View>
          ) : null}

          {employmentData ? (
            <View style={styles.withoutImageValueContent}>
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>WORK EXPERIENCE</Text>
                <View style={styles.headingLine}></View>
              </View>
              {employmentData.map((item, index) => {
                return (
                  <View key={index} style={styles.flexColumnGap4}>
                    <Text style={styles.mediumText}>{item.jobTitle}</Text>

                    <View style={styles.justifyBetweenContainer}>
                      <Text>{item.copmpany}</Text>
                      <Text>
                        {item.jobstartDate} - {item.jobendDate}
                      </Text>
                    </View>
                    <Text style={styles.normalText}>{item.jobDescription}</Text>
                  </View>
                );
              })}
            </View>
          ) : null}

          {itSkillsData ? (
            <View style={styles.withoutImageValueContent}>
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>IT SKILLS</Text>
                <View style={styles.headingLine}></View>
              </View>
              {itSkillsData.map((item, index) => {
                return (
                  <View key={index} style={styles.flexColumnGap4}>
                    <Text style={styles.mediumText}>{item.skills}</Text>

                    <View style={styles.justifyBetweenContainer}>
                      <Text>{item.version}</Text>
                      <Text>{item.lastUsed}</Text>
                    </View>
                    <Text style={styles.normalText}>{item.experience}</Text>
                  </View>
                );
              })}
            </View>
          ) : null}

          {/* {itSkillsData[0] ? (
          <View style={styles.withoutImageValueContent}>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>SOCIAL LINKS</Text>
              <View style={styles.headingLine}></View>
            </View>
            {websiteData.map((item, index) => {
              return (
                <Link key={index} style={styles.linkItem} src={item.link}>
                  {item.label}
                </Link>
              );
            })}
          </View>
        ) : null} */}

          {skillsData ? (
            <View style={styles.withoutImageValueContent}>
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>SKILLS</Text>
                <View style={styles.headingLine}></View>
              </View>
              <View style={styles.flexColumnGap4}>
                {skillsData.map((item, index) => {
                  return <ListItem key={index}>{item}</ListItem>;
                })}
              </View>
            </View>
          ) : null}

          {projectsData ? (
            <View style={styles.withoutImageValueContent}>
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>PROJECTS</Text>
                <View style={styles.headingLine}></View>
              </View>
              {projectsData.map((item, index) => {
                return (
                  <View key={index} style={styles.flexColumnGap4}>
                    <Text style={styles.mediumText}>{item.projectTitle}</Text>

                    <View style={styles.flexRowContainer}>
                      <Text>{item.clientName}</Text>
                      <Text>{item.projectStatus}</Text>
                      <Text>
                        {item.workStarted} - {item.workedTill}
                      </Text>
                    </View>
                    <Text style={styles.normalText}>
                      {item.projectDescription}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : null}

          {onlineProfileData ? (
            <View style={styles.flexColumnGap4}>
              <Text style={styles.mediumText}>Online Profile Data</Text>
              <View style={styles.flexRowContainer}>
                {onlineProfileData.map((item, index) => {
                  return (
                    <Text style={styles.linkItem} key={index}>
                      {item.label}
                    </Text>
                  );
                })}
              </View>
            </View>
          ) : null}

          {workSampleData ? (
            <View style={styles.flexColumnGap4}>
              <Text style={styles.mediumText}>Work Sample Data</Text>
              <View style={styles.flexRowContainer}>
                {workSampleData.map((item, index) => {
                  return (
                    <Text style={styles.linkItem} key={index}>
                      {item.label}
                    </Text>
                  );
                })}
              </View>
            </View>
          ) : null}

          {whitePaperData ? (
            <View style={styles.flexColumnGap4}>
              <Text style={styles.mediumText}>White Paper Data</Text>
              <View style={styles.flexRowContainer}>
                {whitePaperData.map((item, index) => {
                  return (
                    <Text style={styles.linkItem} key={index}>
                      {item.label}
                    </Text>
                  );
                })}
              </View>
            </View>
          ) : null}

          {presentationData ? (
            <View style={styles.flexColumnGap4}>
              <Text style={styles.mediumText}>Presentation Data</Text>
              <View style={styles.flexRowContainer}>
                {presentationData.map((item, index) => {
                  return (
                    <Text style={styles.linkItem} key={index}>
                      {item.label}
                    </Text>
                  );
                })}
              </View>
            </View>
          ) : null}

          {patentData ? (
            <View style={styles.flexColumnGap4}>
              <Text style={styles.mediumText}>Patent Data</Text>
              <View style={styles.flexRowContainer}>
                {patentData.map((item, index) => {
                  return (
                    <Text style={styles.linkItem} key={index}>
                      {item.label}
                    </Text>
                  );
                })}
              </View>
            </View>
          ) : null}

          {certificationData ? (
            <View style={styles.flexColumnGap4}>
              <Text style={styles.mediumText}>Certification Data</Text>
              <View style={styles.flexRowContainer}>
                {certificationData.map((item, index) => {
                  return (
                    <Text style={styles.linkItem} key={index}>
                      {item.label}
                    </Text>
                  );
                })}
              </View>
            </View>
          ) : null}
        </Page>
      </Document>
    );
  };
  return (
    <>
      <Header />
      <div className="page-content">
        <FixedHeader />
        <div className="content-block">
          <div className="section-full browse-job content-inner-2">
            <div className="container">
              <Link
                to={"/user/jobs-profile/"}
                className="site-button right-arrow button-sm float-left mt-3"
              >
                Back
              </Link>
              <div className="row flex-nowrap">
                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 m-b30">
                  <Listingsidebar />
                </div>
                {showSkeleton === true ? (
                  <JobPageSkeleton />
                ) : (
                  <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12">
                    <div className="w-100 d-flex justify-content-center mb-2 ">
                      <PDFDownloadLink
                        onClick={handlePdfLink}
                        document={<Resume6Download />}
                        style={{
                          textDecoration: "none",
                          padding: "5px 8px",
                          color: "black",
                          fontWeight: 500,
                          backgroundColor: "white",
                          border: "1px solid #4A90E2",
                          borderRadius: "4px",
                          margin: "10px 0",
                        }}
                      >
                        Download PDF
                      </PDFDownloadLink>
                    </div>
                    {resumeHeadline ? (
                      <div
                        id="resume_headline_bx"
                        className=" job-bx bg-white m-b30"
                      >
                        <div className="d-flex">
                          <h5 className="m-b15">Resume Headline</h5>
                          <Link
                            to={"#"}
                            className="site-button add-btn button-sm"
                            onClick={() => setResume(true)}
                          >
                            <i className="fa fa-pencil m-r5"></i> Edit
                          </Link>
                        </div>
                        <p className="m-b0">{resumeHeadline}</p>

                        <Modal
                          show={resume}
                          onHide={setResume}
                          className="modal fade modal-bx-info editor"
                        >
                          <div className="modal-dialog my-0" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="ResumeheadlineModalLongTitle"
                                >
                                  Resume Headline
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  onClick={() => setResume(false)}
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <p>
                                  It is the first thing recruiters notice in
                                  your profile. Write concisely what makes you
                                  unique and right person for the job you are
                                  looking for.
                                </p>
                                <form>
                                  <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                      <div className="form-group">
                                        <label htmlFor="resumeHeadline">
                                          Resume Headline
                                        </label>
                                        <textarea
                                          className="form-control"
                                          placeholder="Type Description"
                                          name="resumeHeadline"
                                          id="resumeHeadline"
                                          value={resumeHeadline}
                                          onChange={handleChange}
                                        ></textarea>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="site-button"
                                  onClick={() => setResume(false)}
                                >
                                  Cancel
                                </button>
                                <button type="button" className="site-button">
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    ) : null}

                    <div id="key_skills_bx" className="job-bx bg-white m-b30">
                      <SkillsComponent />
                    </div>

                    <div id="employment_bx" className="job-bx bg-white m-b30 ">
                      <EmploymentComponent />
                    </div>

                    <div id="education_bx" className="job-bx bg-white m-b30">
                      <EducationComponent />
                      {/* <Link to={"#"} className="clearfix">
                          Add Doctorate/PhD
                        </Link>
                        <Link to={"#"} className="clearfix">
                          Add Masters/Post-Graduation
                        </Link>
                        <Link to={"#"} className="clearfix">
                          Add Graduation/Diploma
                        </Link> */}
                    </div>

                    <div
                      id="it_skills_bx"
                      className="job-bx table-job-bx bg-white m-b30"
                    >
                      <ITSkillsComponent />
                    </div>

                    <div id="projects_bx" className="job-bx bg-white m-b30">
                      <ProjectsComponent />
                    </div>

                    {profileSummaryValue ? (
                      <div
                        id="profile_summary_bx"
                        className="job-bx bg-white m-b30"
                      >
                        <div className="d-flex">
                          <h5 className="m-b15">Profile Summary</h5>
                          <Link
                            to={"#"}
                            onClick={() => setProfileSummary(true)}
                            className="site-button add-btn button-sm"
                          >
                            <i className="fa fa-pencil m-r5"></i> Edit
                          </Link>
                        </div>
                        <p className="m-b0">{profileSummaryValue}</p>

                        <Modal
                          className="modal fade modal-bx-info editor"
                          show={profilesummary}
                          onHide={setProfileSummary}
                        >
                          <div className="modal-dialog my-0" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">Profile Summary</h5>
                                <button
                                  type="button"
                                  className="close"
                                  onClick={() => setProfileSummary(false)}
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <p>
                                  Your Profile Summary should mention the
                                  highlights of your career and education, what
                                  your professional interests are, and what kind
                                  of a career you are looking for. Write a
                                  meaningful summary of more than 50 characters.
                                </p>
                                <form>
                                  <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                      <div className="form-group">
                                        <label htmlFor="profileSummaryValue">
                                          Details of Project
                                        </label>
                                        <textarea
                                          className="form-control"
                                          placeholder="Type Description"
                                          id="profileSummaryValue"
                                          name="profileSummaryValue"
                                          onChange={handleChange}
                                          value={
                                            jobsMyResumeData.profileSummaryValue
                                          }
                                        ></textarea>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="site-button"
                                  onClick={() => setProfileSummary(false)}
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => setProfileSummary(false)}
                                  type="button"
                                  className="site-button"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    ) : null}

                    <div
                      id="accomplishments_bx"
                      className="job-bx bg-white m-b30"
                    >
                      <h5 className="m-b10 text-break">Accomplishments</h5>
                      <div className="list-row">
                        <div className="list-line">
                          <div className="list-line">
                            <div className="d-flex">
                              <h6 className="font-14 m-b5">Online Profile</h6>
                              <Link
                                to={"#"}
                                className="site-button add-btn button-sm"
                                onClick={() => setOnlineProfile(true)}
                              >
                                <i className="fa fa-plus m-r5"></i> Add
                              </Link>
                            </div>
                            {onlineProfileData ? (
                              <div
                                className="m-b0 d-flex flex-wrap align-items-center  "
                                style={{ gap: "7px" }}
                              >
                                {onlineProfileData.map((item, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="d-flex flex-wrap  align-items-center "
                                      style={{ gap: "20px" }}
                                    >
                                      <Link to={item.link}>{item.label}</Link>
                                      <button
                                        style={{ cursor: "pointer" }}
                                        className="border-0"
                                        onClick={() => {
                                          editOnlineItem(index);
                                        }}
                                      >
                                        <FaEdit />
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}

                            <Modal
                              className="modal fade modal-bx-info editor"
                              show={onlineprofile}
                              onHide={setOnlineProfile}
                            >
                              <div
                                className="modal-dialog my-0"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title">
                                      Online Profiles
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      onClick={() => {
                                        setOnlineProfile(false);
                                        dispatch(
                                          setOnlineProfileValue({
                                            label: "",
                                            link: "",
                                          })
                                        );
                                        setEditOnlineIndex(-1);
                                      }}
                                    >
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <form>
                                      <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                          <div className="form-group">
                                            <label htmlFor="label">
                                              Social Profile
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Social Profile Name"
                                              name="label"
                                              id="label"
                                              onChange={
                                                handleOnlineProfileChange
                                              }
                                              value={onlineProfileValue.label}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                          <div className="form-group">
                                            <label htmlFor="link">URL</label>
                                            <input
                                              type="email"
                                              className="form-control"
                                              placeholder="www.google.com"
                                              id="link"
                                              name="link"
                                              onChange={
                                                handleOnlineProfileChange
                                              }
                                              value={onlineProfileValue.link}
                                            />
                                          </div>
                                        </div>
                                        {/* <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                              <label>Description</label>
                                              <textarea
                                                className="form-control"
                                                placeholder="Type Description"
                                              ></textarea>
                                            </div>
                                          </div> */}
                                      </div>
                                    </form>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="site-button"
                                      onClick={() => {
                                        setOnlineProfile(false);
                                        dispatch(
                                          setOnlineProfileValue({
                                            label: "",
                                            link: "",
                                          })
                                        );
                                        setEditOnlineIndex(-1);
                                      }}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={handleAddOnlineProfile}
                                      type="button"
                                      className="site-button"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={updateOnlineItem}
                                      type="button"
                                      className="site-button"
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Modal>
                          </div>

                          <div className="list-line">
                            <div className="d-flex">
                              <h6 className="font-14 m-b5">Work Sample</h6>
                              <Link
                                to={"#"}
                                className="site-button add-btn button-sm"
                                onClick={() => setWorkSample(true)}
                              >
                                <i className="fa fa-plus m-r5"></i> Add
                              </Link>
                            </div>
                            {workSampleData ? (
                              <div
                                className="m-b0 d-flex align-items-center flex-wrap"
                                style={{ gap: "7px" }}
                              >
                                {workSampleData.map((item, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="d-flex flex-wrap  align-items-center "
                                      style={{ gap: "20px" }}
                                    >
                                      <Link to={item.link}>{item.label}</Link>
                                      <button
                                        style={{ cursor: "pointer" }}
                                        className="border-0"
                                        onClick={() => {
                                          editWorkItem(index);
                                        }}
                                      >
                                        <FaEdit />
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}

                            <Modal
                              className="modal fade modal-bx-info editor"
                              show={worksample}
                              onHide={setWorkSample}
                            >
                              <div
                                className="modal-dialog my-0"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title">Work Sample</h5>
                                    <button
                                      type="button"
                                      className="close"
                                      onClick={() => {
                                        setWorkSample(false);
                                        dispatch(
                                          setWorkSampleValue({
                                            label: "",
                                            link: "",
                                          })
                                        );
                                        setEditWorkIndex(-1);
                                      }}
                                    >
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <form>
                                      <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                          <div className="form-group">
                                            <label htmlFor="label">
                                              Work Title
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="label"
                                              name="label"
                                              onChange={handleWorkSampleChange}
                                              value={workSampleValue.label}
                                              placeholder="Enter Title"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                          <div className="form-group">
                                            <label htmlFor="link">URL</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="link"
                                              id="link"
                                              onChange={handleWorkSampleChange}
                                              value={workSampleValue.link}
                                              placeholder="www.google.com"
                                            />
                                          </div>
                                        </div>
                                        {/* <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                              <label>Duration From</label>
                                              <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                  <Form.Control as="select">
                                                    <option>2018</option>
                                                    <option>2017</option>
                                                    <option>2016</option>
                                                    <option>2015</option>
                                                    <option>2014</option>
                                                    <option>2013</option>
                                                    <option>2012</option>
                                                    <option>2011</option>
                                                    <option>2010</option>
                                                    <option>2009</option>
                                                    <option>2008</option>
                                                    <option>2007</option>
                                                    <option>2006</option>
                                                    <option>2005</option>
                                                    <option>2004</option>
                                                    <option>2003</option>
                                                    <option>2002</option>
                                                    <option>2001</option>
                                                  </Form.Control>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                  <Form.Control as="select">
                                                    <option>january</option>
                                                    <option>february</option>
                                                    <option>March</option>
                                                    <option>April</option>
                                                    <option>May</option>
                                                    <option>Jun</option>
                                                    <option>July</option>
                                                    <option>August</option>
                                                    <option>September</option>
                                                    <option>October</option>
                                                    <option>November</option>
                                                    <option>December</option>
                                                  </Form.Control>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                              <label>Duration To</label>
                                              <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                  <Form.Control as="select">
                                                    <option>2018</option>
                                                    <option>2017</option>
                                                    <option>2016</option>
                                                    <option>2015</option>
                                                    <option>2014</option>
                                                    <option>2013</option>
                                                    <option>2012</option>
                                                    <option>2011</option>
                                                    <option>2010</option>
                                                    <option>2009</option>
                                                    <option>2008</option>
                                                    <option>2007</option>
                                                    <option>2006</option>
                                                    <option>2005</option>
                                                    <option>2004</option>
                                                    <option>2003</option>
                                                    <option>2002</option>
                                                    <option>2001</option>
                                                  </Form.Control>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                  <Form.Control as="select">
                                                    <option>january</option>
                                                    <option>february</option>
                                                    <option>March</option>
                                                    <option>April</option>
                                                    <option>May</option>
                                                    <option>Jun</option>
                                                    <option>July</option>
                                                    <option>August</option>
                                                    <option>September</option>
                                                    <option>October</option>
                                                    <option>November</option>
                                                    <option>December</option>
                                                  </Form.Control>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                              <div className="custom-control custom-checkbox">
                                                <input
                                                  type="checkbox"
                                                  className="custom-control-input"
                                                  id="check1"
                                                  name="example1"
                                                />
                                                <label
                                                  className="custom-control-label"
                                                  htmlFor="check1"
                                                >
                                                  I am currently working on this
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                              <label>Description</label>
                                              <textarea
                                                className="form-control"
                                                placeholder="Type Description"
                                              ></textarea>
                                            </div>
                                          </div> */}
                                      </div>
                                    </form>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="site-button"
                                      onClick={() => {
                                        setWorkSample(false);
                                        dispatch(
                                          setWorkSampleValue({
                                            label: "",
                                            link: "",
                                          })
                                        );
                                        setEditWorkIndex(-1);
                                      }}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={handleAddWorkItem}
                                      type="button"
                                      className="site-button"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={updateWorkItem}
                                      type="button"
                                      className="site-button"
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Modal>
                          </div>

                          <div className="list-line">
                            <div className="d-flex">
                              <h6 className="font-14 m-b5">
                                White Paper / Research Publication / Journal
                                Entry
                              </h6>
                              <Link
                                to={"#"}
                                className="site-button add-btn button-sm"
                                onClick={() => setWhitePaper(true)}
                              >
                                <i className="fa fa-plus m-r5"></i> Add
                              </Link>
                            </div>
                            {whitePaperData ? (
                              <div
                                className="m-b0 d-flex flex-wrap align-items-center "
                                style={{ gap: "7px" }}
                              >
                                {whitePaperData.map((item, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="d-flex flex-wrap  align-items-center "
                                      style={{ gap: "20px" }}
                                    >
                                      <Link to={item.link}>{item.label}</Link>
                                      <button
                                        style={{ cursor: "pointer" }}
                                        className="border-0"
                                        onClick={() => {
                                          editWhitePaperItem(index);
                                        }}
                                      >
                                        <FaEdit />
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}
                            <Modal
                              className="modal fade modal-bx-info editor"
                              show={whitepaper}
                              onHide={setWhitePaper}
                            >
                              <div
                                className="modal-dialog my-0"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="JournalentryModalLongTitle"
                                    >
                                      White Paper / Research Publication /
                                      Journal Entry
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      onClick={() => {
                                        setWhitePaper(false);
                                        dispatch(
                                          setWhitePaperValue({
                                            label: "",
                                            link: "",
                                          })
                                        );
                                        setEditWhitePaperIndex(-1);
                                      }}
                                    >
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <form>
                                      <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                          <div className="form-group">
                                            <label htmlFor="label">Title</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="label"
                                              name="label"
                                              onChange={handleWhitePaperChange}
                                              value={whitePaperValue.label}
                                              placeholder="Enter Title"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                          <div className="form-group">
                                            <label htmlFor="link">URL</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="link"
                                              name="link"
                                              onChange={handleWhitePaperChange}
                                              value={whitePaperValue.link}
                                              placeholder="www.google.com"
                                            />
                                          </div>
                                        </div>
                                        {/* <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                              <label>Published On</label>
                                              <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                  <Form.Control as="select">
                                                    <option>2018</option>
                                                    <option>2017</option>
                                                    <option>2016</option>
                                                    <option>2015</option>
                                                    <option>2014</option>
                                                    <option>2013</option>
                                                    <option>2012</option>
                                                    <option>2011</option>
                                                    <option>2010</option>
                                                    <option>2009</option>
                                                    <option>2008</option>
                                                    <option>2007</option>
                                                    <option>2006</option>
                                                    <option>2005</option>
                                                    <option>2004</option>
                                                    <option>2003</option>
                                                    <option>2002</option>
                                                    <option>2001</option>
                                                  </Form.Control>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                  <Form.Control as="select">
                                                    <option>january</option>
                                                    <option>february</option>
                                                    <option>March</option>
                                                    <option>April</option>
                                                    <option>May</option>
                                                    <option>Jun</option>
                                                    <option>July</option>
                                                    <option>August</option>
                                                    <option>September</option>
                                                    <option>October</option>
                                                    <option>November</option>
                                                    <option>December</option>
                                                  </Form.Control>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                              <label>Description</label>
                                              <textarea
                                                className="form-control"
                                                placeholder="Type Description"
                                              ></textarea>
                                            </div>
                                          </div> */}
                                      </div>
                                    </form>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="site-button"
                                      onClick={() => {
                                        setWhitePaper(false);
                                        dispatch(
                                          setWhitePaperValue({
                                            label: "",
                                            link: "",
                                          })
                                        );
                                        setEditWhitePaperIndex(-1);
                                      }}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={handleAddWhitePaperItem}
                                      type="button"
                                      className="site-button"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={updateWhitePaperItem}
                                      type="button"
                                      className="site-button"
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Modal>
                          </div>

                          <div className="list-line">
                            <div className="d-flex">
                              <h6 className="font-14 m-b5">Presentation</h6>
                              <Link
                                to={"#"}
                                className="site-button add-btn button-sm"
                                onClick={() => setPresentation(true)}
                              >
                                <i className="fa fa-plus m-r5"></i> Add
                              </Link>
                            </div>
                            {presentationData ? (
                              <div
                                className="m-b0 d-flex align-items-center flex-wrap"
                                style={{ gap: "7px" }}
                              >
                                {presentationData.map((item, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="d-flex flex-wrap  align-items-center "
                                      style={{ gap: "20px" }}
                                    >
                                      <Link to={item.link}>{item.label}</Link>
                                      <button
                                        style={{ cursor: "pointer" }}
                                        className="border-0"
                                        onClick={() => {
                                          editPresentationItem(index);
                                        }}
                                      >
                                        <FaEdit />
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}

                            <Modal
                              className="modal fade modal-bx-info editor"
                              id="presentation"
                              show={presentation}
                              onHide={setPresentation}
                            >
                              <div
                                className="modal-dialog my-0"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="PresentationModalLongTitle"
                                    >
                                      Presentation
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      onClick={() => {
                                        setPresentation(false);
                                        dispatch(
                                          setPresentationValue({
                                            label: "",
                                            link: "",
                                          })
                                        );
                                        setEditPresentationIndex(-1);
                                      }}
                                    >
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <form>
                                      <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                          <div className="form-group">
                                            <label htmlFor="label">Title</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="label"
                                              name="label"
                                              onChange={
                                                handlePresentationChange
                                              }
                                              value={presentationValue.label}
                                              placeholder="Enter Title"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                          <div className="form-group">
                                            <label htmlFor="link">URL</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="link"
                                              name="link"
                                              onChange={
                                                handlePresentationChange
                                              }
                                              value={presentationValue.link}
                                              placeholder="www.google.com"
                                            />
                                          </div>
                                        </div>
                                        {/* <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                              <label>Description</label>
                                              <textarea
                                                className="form-control"
                                                placeholder="Type Description"
                                              ></textarea>
                                            </div>
                                          </div> */}
                                      </div>
                                    </form>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="site-button"
                                      data-dismiss="modal"
                                      onClick={() => {
                                        setPresentation(false);
                                        dispatch(
                                          setPresentationValue({
                                            label: "",
                                            link: "",
                                          })
                                        );
                                        setEditPresentationIndex(-1);
                                      }}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={handleAddPresentationItem}
                                      type="button"
                                      className="site-button"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={updatePresentationItem}
                                      type="button"
                                      className="site-button"
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Modal>
                          </div>

                          <div className="list-line">
                            <div className="d-flex">
                              <h6 className="font-14 m-b5">Patent</h6>
                              <Link
                                to={"#"}
                                className="site-button add-btn button-sm"
                                onClick={() => setPatent(true)}
                              >
                                <i className="fa fa-plus m-r5"></i> Add
                              </Link>
                            </div>
                            {patentData ? (
                              <div
                                className="m-b0 d-flex flex-wrap align-items-center "
                                style={{ gap: "7px" }}
                              >
                                {patentData.map((item, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="d-flex flex-wrap  align-items-center "
                                      style={{ gap: "20px" }}
                                    >
                                      <Link to={item.link}>{item.label}</Link>
                                      <button
                                        style={{ cursor: "pointer" }}
                                        className="border-0"
                                        onClick={() => {
                                          editPatentItem(index);
                                        }}
                                      >
                                        <FaEdit />
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}
                            <Modal
                              className="modal fade modal-bx-info editor"
                              show={patent}
                              onHide={setPatent}
                            >
                              <div
                                className="modal-dialog my-0"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="PatentModalLongTitle"
                                    >
                                      Patent
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      onClick={() => {
                                        setPatent(false);
                                        dispatch(
                                          setPatentValue({
                                            label: "",
                                            link: "",
                                          })
                                        );
                                        setEditPatentIndex(-1);
                                      }}
                                    >
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <form>
                                      <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                          <div className="form-group">
                                            <label htmlFor="label">Title</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="label"
                                              name="label"
                                              onChange={handlePatentChange}
                                              value={patentValue.label}
                                              placeholder="Enter Title"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                          <div className="form-group">
                                            <label htmlFor="link">URL</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="link"
                                              name="link"
                                              placeholder="www.google.com"
                                              onChange={handlePatentChange}
                                              value={patentValue.link}
                                            />
                                          </div>
                                        </div>
                                        {/* <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                              <label>Patent Office</label>
                                              <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter Patent Office"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                              <label>Status</label>
                                              <div className="row">
                                                <div className="col-lg-6 col-md-6">
                                                  <div className="custom-control custom-radio">
                                                    <input
                                                      type="radio"
                                                      className="custom-control-input"
                                                      id="check2"
                                                      name="example1"
                                                    />
                                                    <label
                                                      className="custom-control-label"
                                                      htmlFor="check2"
                                                    >
                                                      Patent Issued
                                                    </label>
                                                  </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                  <div className="custom-control custom-radio">
                                                    <input
                                                      type="radio"
                                                      className="custom-control-input"
                                                      id="check3"
                                                      name="example1"
                                                    />
                                                    <label
                                                      className="custom-control-label"
                                                      htmlFor="check3"
                                                    >
                                                      Patent pending
                                                    </label>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                              <label>Application Number</label>
                                              <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter Application Number"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                              <label>Published On</label>
                                              <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                  <Form.Control as="select">
                                                    <option>2018</option>
                                                    <option>2017</option>
                                                    <option>2016</option>
                                                    <option>2015</option>
                                                    <option>2014</option>
                                                    <option>2013</option>
                                                    <option>2012</option>
                                                    <option>2011</option>
                                                    <option>2010</option>
                                                    <option>2009</option>
                                                    <option>2008</option>
                                                    <option>2007</option>
                                                    <option>2006</option>
                                                    <option>2005</option>
                                                    <option>2004</option>
                                                    <option>2003</option>
                                                    <option>2002</option>
                                                    <option>2001</option>
                                                  </Form.Control>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                  <Form.Control as="select">
                                                    <option>january</option>
                                                    <option>february</option>
                                                    <option>March</option>
                                                    <option>April</option>
                                                    <option>May</option>
                                                    <option>Jun</option>
                                                    <option>July</option>
                                                    <option>August</option>
                                                    <option>September</option>
                                                    <option>October</option>
                                                    <option>November</option>
                                                    <option>December</option>
                                                  </Form.Control>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                              <label>Description</label>
                                              <textarea
                                                className="form-control"
                                                placeholder="Type Description"
                                              ></textarea>
                                            </div>
                                          </div> */}
                                      </div>
                                    </form>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="site-button"
                                      onClick={() => {
                                        setPatent(false);
                                        dispatch(
                                          setPatentValue({
                                            label: "",
                                            link: "",
                                          })
                                        );
                                        setEditPatentIndex(-1);
                                      }}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={handleAddPatentItem}
                                      type="button"
                                      className="site-button"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={updatePatentItem}
                                      type="button"
                                      className="site-button"
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Modal>
                          </div>

                          <div className="list-line">
                            <div className="d-flex">
                              <h6 className="font-14 m-b5">Certification</h6>
                              <Link
                                to={"#"}
                                className="site-button add-btn button-sm"
                                onClick={() => setCertification(true)}
                              >
                                <i className="fa fa-plus m-r5"></i> Add
                              </Link>
                            </div>
                            {certificationData ? (
                              <div
                                className="m-b0 d-flex  flex-wrap align-items-center "
                                style={{ gap: "7px" }}
                              >
                                {certificationData.map((item, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="d-flex flex-wrap  align-items-center "
                                      style={{ gap: "20px" }}
                                    >
                                      <Link to={item.link}>{item.label}</Link>
                                      <button
                                        style={{ cursor: "pointer" }}
                                        className="border-0"
                                        onClick={() => {
                                          editCertificationItem(index);
                                        }}
                                      >
                                        <FaEdit />
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}

                            <Modal
                              className="modal fade modal-bx-info editor"
                              show={certification}
                              onHide={setCertification}
                            >
                              <div
                                className="modal-dialog my-0"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="CertificationModalLongTitle"
                                    >
                                      Certification
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      onClick={() => {
                                        setCertification(false);
                                        dispatch(
                                          setCertificationValue({
                                            label: "",
                                            link: "",
                                          })
                                        );
                                        setEditCertificationIndex(-1);
                                      }}
                                    >
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <form>
                                      <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                          <div className="form-group">
                                            <label htmlFor="label">
                                              Certification Name
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="label"
                                              id="label"
                                              onChange={
                                                handleCertificationChange
                                              }
                                              value={certificationValue.label}
                                              placeholder="Enter Certification Name"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                          <div className="form-group">
                                            <label htmlFor="link">
                                              Certification Body
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="link"
                                              name="link"
                                              onChange={
                                                handleCertificationChange
                                              }
                                              value={certificationValue.link}
                                              placeholder="Enter Certification Body"
                                            />
                                          </div>
                                        </div>
                                        {/* <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                              <label>Year Onlabel</label>
                                              <Form.Control as="select">
                                                <option>2018</option>
                                                <option>2017</option>
                                                <option>2016</option>
                                                <option>2015</option>
                                                <option>2014</option>
                                                <option>2013</option>
                                                <option>2012</option>
                                                <option>2011</option>
                                                <option>2010</option>
                                                <option>2009</option>
                                                <option>2008</option>
                                                <option>2007</option>
                                                <option>2006</option>
                                                <option>2005</option>
                                                <option>2004</option>
                                                <option>2003</option>
                                                <option>2002</option>
                                                <option>2001</option>
                                              </Form.Control>
                                            </div>
                                          </div> */}
                                      </div>
                                    </form>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="site-button"
                                      onClick={() => {
                                        setCertification(false);
                                        dispatch(
                                          setCertificationValue({
                                            label: "",
                                            link: "",
                                          })
                                        );
                                        setEditCertificationIndex(-1);
                                      }}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={handleAddCertificationItem}
                                      type="button"
                                      className="site-button"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={updateCertificationItem}
                                      type="button"
                                      className="site-button"
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="desired_career_profile_bx"
                      className="job-bx bg-white m-b30"
                    >
                      <DesiredCareerComponent />
                    </div>
                    <div
                      id="personal_details_bx"
                      className="job-bx bg-white m-b30"
                    >
                      <PersonalDetailsComponent />
                    </div>
                    <button
                      className="site-button"
                      onClick={handleUpdateResume}
                    >
                      Update
                    </button>
                    {/* <div
                      id="attach_resume_bx"
                      className="job-bx bg-white m-b30"
                    >
                      <h5 className="m-b10">Attach Resume</h5>
                      <p>
                        Resume is the most important document recruiters look
                        for. Recruiters generally do not look at profiles
                        without resumes.
                      </p>
                      <form className="attach-resume">
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <div className="form-group">
                              <div className="custom-file">
                                <p className="m-auto align-self-center">
                                  <i className="fa fa-upload"></i>
                                  Upload Resume File size is 3 MB
                                </p>
                                <input
                                  type="file"
                                  className="site-button form-control"
                                  id="customFile"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                      <p className="text-center">
                        If you do not have a resume document, you may write your
                        brief professional profile{" "}
                        <Link to={"#"} className="site-button-link">
                          here
                        </Link>
                        .
                      </p>
                    </div> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Jobmyresume;
