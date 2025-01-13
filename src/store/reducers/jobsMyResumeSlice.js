import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  jobsMyResumeData: {
    skillsValue: {
      skills: "",
    },
    resumeHeadline: "Job board currently living in USA",
    skillsData: ["javascript", "css", "html", "bootstrap"],
    employmentValues: {
      jobTitle: "",
      company: "",
      jobStartDate: "",
      jobEndDate: "",
      jobDescription: "",
    },
    employmentData: [
      {
        jobTitle: "Junior Software Developer",
        company: "W3ITEXPERTS",
        jobStartDate: "09-10-2015",
        jobEndDate: "Present",
        jobDescription: "Junior Software Developer",
      },
      {
        jobTitle: "Senior Software Developer",
        company: "W3ITEXPERTS",
        jobStartDate: "09-10-2015",
        jobEndDate: "Present",
        jobDescription: "Senior Software Developer",
      },
    ],
    educationValues: {
      education: "",
      course: "",
      passOutDate: "",
      university: "",
    },
    educationData: [],
    itSkillsValue: {
      skills: "",
      version: "",
      lastUsed: "",
      experience: "",
    },
    itSkillsData: [],
    projectsValue: {
      projectTitle: "",
      clientName: "",
      projectStatus: "",
      workStarted: "",
      workedTill: "",
      projectDescription: "",
    },

    projectsData: [
      {
        projectTitle: "Project Title",
        clientName: "Enter Client Name",
        projectStatus: "IN PROGRESS",
        workStarted: "09-10-2015",
        workedTill: "09-10-2015",
        projectDescription: "Hey this is the project Description",
      },
    ],
    profileSummaryValue:
      "Your Profile Summary should mention the highlights of your career and education, what your professional interests are, and what kind of a career you are looking for. Write a meaningful summary of more than 50 characters.dsa",
    accomplishments: {
      onlineProfileValue: {
        label: "",
        link: "",
      },

      onlineProfileData: [
        {
          label: "facebook",
          link: "https://facebook.com",
        },
        {
          label: "insta",
          link: "https://instagram.com",
        },
      ],
      workSampleValue: {
        label: "",
        link: "",
      },
      workSampleData: [{ label: "project", link: "#" }],
      whitePaperValue: {
        label: "",
        link: "",
      },
      whitePaperData: [{ label: "online publications", link: "#" }],
      presentationValue: {
        label: "",
        link: "",
      },
      presentationData: [{ label: "online presentations", link: "#" }],
      patentValue: {
        label: "",
        link: "",
      },
      patentData: [{ label: "patents", link: "#" }],
      certificationValue: {
        label: "",
        link: "",
      },
      certificationData: [
        {
          label: "javascript",
          link: "https://javascript.com",
        },
      ],
    },
    desiredCareerProfile: {
      industry: "It xc services",
      role: "Web Designer",
      employmentType: "Full Time",
      availabilityToJoin: "12 July",
      desiredLocation: "Add Desired Location",
      functionalArea: "design / creative / userExperience",
      jobType: "permanent",
      desiredShift: "add Desired Shift",
      expectedSalary: "1 Lakhs",
      desiredIndustry: "add desired Industry",
    },

    personalDetailsValue: {
      dateOfBirth: "31 July 0998",
      gender: "male",
      maritalStatus: "single",
      passportNumber: "+1234567890",
      differentlyAbled: "None",
      languages: "Portuguese",
      addPermanentAddress: "Add Permanent Address",
      areaPinCode: "302010",
      homeTown: "Delhi",
      workPermitOfOtherCountry: "USA",
    },

    attachResumeValue: "",
  },
};

const jobsMyResumeSlice = createSlice({
  name: "jobsMyResumeSlice",
  initialState,
  reducers: {
    setResumeData: (state, action) => {
      state.jobsMyResumeData = action.payload;
    },
    setResumeHeadline: (state, action) => {
      state.jobsMyResumeData.resumeHeadline = action.payload;
    },
    setProfileSummaryValue: (state, action) => {
      state.jobsMyResumeData.profileSummaryValue = action.payload;
    },
    setSkillsData: (state, action) => {
      state.jobsMyResumeData.skillsData = action.payload;
    },
    setEmploymentData: (state, action) => {
      state.jobsMyResumeData.employmentData = action.payload;
    },
    setEducationData: (state, action) => {
      state.jobsMyResumeData.educationData = action.payload;
    },
    setItSkillsData: (state, action) => {
      state.jobsMyResumeData.itSkillsData = action.payload;
    },
    setProjectsData: (state, action) => {
      state.jobsMyResumeData.projectsData = action.payload;
    },

    setDesiredCareerProfile: (state, action) => {
      state.jobsMyResumeData.desiredCareerProfile = action.payload;
    },
    setPersonalDetailsValue: (state, action) => {
      state.jobsMyResumeData.personalDetailsValue = action.payload;
    },
    setAttachResumeValue: (state, action) => {
      state.jobsMyResumeData.attachResumeValue = action.payload;
    },
    setSkillsValue: (state, action) => {
      state.jobsMyResumeData.skillsValue = action.payload;
    },
    setEmploymentValues: (state, action) => {
      state.jobsMyResumeData.employmentValues = action.payload;
    },
    setEducationValues: (state, action) => {
      state.jobsMyResumeData.educationValues = action.payload;
    },
    setItSkillsValue: (state, action) => {
      state.jobsMyResumeData.itSkillsValue = action.payload;
    },
    setProjectsValue: (state, action) => {
      state.jobsMyResumeData.projectsValue = action.payload;
    },
    setOnlineProfileValue: (state, action) => {
      state.jobsMyResumeData.accomplishments.onlineProfileValue =
        action.payload;
    },
    setOnlineProfileData: (state, action) => {
      state.jobsMyResumeData.accomplishments.onlineProfileData = action.payload;
    },
    setWorkSampleValue: (state, action) => {
      state.jobsMyResumeData.accomplishments.workSampleValue = action.payload;
    },
    setWorkSampleData: (state, action) => {
      state.jobsMyResumeData.accomplishments.workSampleData = action.payload;
    },
    setWhitePaperData: (state, action) => {
      state.jobsMyResumeData.accomplishments.whitePaperData = action.payload;
    },
    setWhitePaperValue: (state, action) => {
      state.jobsMyResumeData.accomplishments.whitePaperValue = action.payload;
    },
    setPresentationValue: (state, action) => {
      state.jobsMyResumeData.accomplishments.presentationValue = action.payload;
    },
    setPresentationData: (state, action) => {
      state.jobsMyResumeData.accomplishments.presentationData = action.payload;
    },
    setPatentValue: (state, action) => {
      state.jobsMyResumeData.accomplishments.patentValue = action.payload;
    },
    setPatentData: (state, action) => {
      state.jobsMyResumeData.accomplishments.patentData = action.payload;
    },
    setCertificationValue: (state, action) => {
      state.jobsMyResumeData.accomplishments.certificationValue =
        action.payload;
    },
    setCertificationData: (state, action) => {
      state.jobsMyResumeData.accomplishments.certificationData = action.payload;
    },
  },
});

export const {
  setResumeHeadline,
  setSkillsData,
  setEmploymentData,
  setEducationData,
  setItSkillsData,
  setProjectsData,
  setSkillsValue,
  setProfileSummaryValue,
  setDesiredCareerProfile,
  setPersonalDetailsValue,
  setAttachResumeValue,
  setResumeData,
  setEmploymentValues,
  setEducationValues,
  setItSkillsValue,
  setProjectsValue,
  setOnlineProfileData,
  setOnlineProfileValue,
  setWorkSampleValue,
  setWorkSampleData,
  setWhitePaperValue,
  setWhitePaperData,
  setPresentationValue,
  setPresentationData,
  setPatentValue,
  setPatentData,
  setCertificationValue,
  setCertificationData,
} = jobsMyResumeSlice.actions;

export default jobsMyResumeSlice.reducer;
